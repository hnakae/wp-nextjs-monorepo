interface SGFNode {
  [key: string]: string[];
}

interface ParsedSGF {
  size: number;
  moves: Array<{
    x: number;
    y: number;
    color: 'black' | 'white';
    moveNumber: number;
    comment?: string;
  }>;
  gameInfo: {
    playerBlack?: string;
    playerWhite?: string;
    blackRank?: string;
    whiteRank?: string;
    komi?: string;
    handicap?: string;
    result?: string;
    date?: string;
    event?: string;
  };
}

export class SGFParser {
  private static coordinateToPosition(coord: string): { x: number; y: number } {
    // SGF uses 'tt' for pass moves, which we can ignore for board positions.
    if (!coord || coord.length !== 2 || coord === 'tt') {
      return { x: -1, y: -1 };
    }
    // 'a' corresponds to 0, 'b' to 1, and so on.
    const x = coord.charCodeAt(0) - 97;
    const y = coord.charCodeAt(1) - 97;
    return { x, y };
  }

  /**
   * Recursively walks the SGF game tree.
   * It parses nodes on the current level and skips over variations.
   */
  private static walkSgfTree(sgf: string, startIndex: number): [SGFNode[], number] {
    const nodes: SGFNode[] = [];
    let i = startIndex;

    while (i < sgf.length) {
      const char = sgf[i];

      if (char === ';') {
        i++; // Move past ';'
        const node: SGFNode = {};
        while (i < sgf.length && sgf[i] !== ';' && sgf[i] !== '(' && sgf[i] !== ')') {
          let prop = '';
          while(i < sgf.length && sgf[i]?.match(/[A-Z]/)) {
            prop += sgf[i];
            i++;
          }

          const values: string[] = [];
          while (i < sgf.length && sgf[i] === '[') {
            i++; // Move past '['
            let value = '';
            let depth = 1;
            while (i < sgf.length && depth > 0) {
              const valChar = sgf[i];
              if (valChar === ']' && sgf[i-1] !== '\\') depth--;
              else if (valChar === '[' && sgf[i-1] !=='\\') depth++;

              if (depth > 0) value += valChar;
              i++;
            }
            values.push(value);
          }
          if (prop) {
            node[prop] = values;
          }
        }
        nodes.push(node);
      } else if (char === '(') {
        // This is the start of a variation. We recursively call the function
        // to find its end, but we discard the nodes to ignore the variation.
        const [, length] = this.walkSgfTree(sgf, i + 1);
        i += length + 1; // Skip the entire variation block
      } else if (char === ')') {
        // This is the end of the current branch.
        return [nodes, i];
      } else {
        i++;
      }
    }
    return [nodes, i];
  }

  static parse(sgfContent: string): ParsedSGF {
    const cleanSGF = sgfContent.trim();
    if (!cleanSGF.startsWith('(;')) {
      throw new Error('Invalid SGF format');
    }

    // Start parsing after the initial '(;'
    const [nodes] = this.walkSgfTree(cleanSGF, 2);

    if (nodes.length === 0) {
      throw new Error('No nodes found in SGF');
    }

    const rootNode = nodes[0];
    const size = rootNode.SZ ? parseInt(rootNode.SZ[0], 10) : 19;

    const gameInfo = {
      playerBlack: rootNode.PB?.[0],
      playerWhite: rootNode.PW?.[0],
      blackRank: rootNode.BR?.[0],
      whiteRank: rootNode.WR?.[0],
      komi: rootNode.KM?.[0],
      handicap: rootNode.HA?.[0],
      result: rootNode.RE?.[0],
      date: rootNode.DT?.[0],
      event: rootNode.EV?.[0],
    };

    const moves: ParsedSGF['moves'] = [];
    let moveNumber = 0;

    // Iterate through the flat list of main-line nodes from our parsed tree
    for (const node of nodes) {
      const moveProp = node.B ? 'B' : node.W ? 'W' : null;
      if (moveProp) {
        const coord = node[moveProp]![0];
        const pos = this.coordinateToPosition(coord);
        // Only add actual moves to the list, not passes
        if (pos.x !== -1) {
          moves.push({
            x: pos.x,
            y: pos.y,
            color: moveProp === 'B' ? 'black' : 'white',
            moveNumber: ++moveNumber,
            comment: node.C?.[0],
          });
        }
      }
    }

    return {
      size,
      moves,
      gameInfo,
    };
  }
}