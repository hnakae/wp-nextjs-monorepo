import { ParsedSGF } from '@/lib/sgf-types';

interface SGFNode {
  [key: string]: string[];
}

export class SGFParser {
  private static coordinateToPosition(coord: string): { x: number; y: number } {
    if (!coord || coord.length !== 2 || coord.toLowerCase() === 'tt') {
      return { x: -1, y: -1 };
    }
    const x = coord.charCodeAt(0) - 97;
    const y = coord.charCodeAt(1) - 97;
    return { x, y };
  }

  private static parseNodeProperties(sgf: string, index: number): [SGFNode, number] {
    const node: SGFNode = {};
    let i = index;

    while (i < sgf.length) {
      // Skip all whitespace characters (including newlines)
      while (i < sgf.length && /\s/.test(sgf[i])) {
        i++;
      }

      // Check for end of node properties (semicolon, opening/closing parenthesis)
      if (sgf[i] === ';' || sgf[i] === '(' || sgf[i] === ')') {
        break;
      }

      let prop = '';
      // Read property name (uppercase letters)
      while (i < sgf.length && /[A-Z]/.test(sgf[i])) {
        prop += sgf[i];
        i++;
      }

      if (!prop) {
        // If no property name found, it's an unexpected character, skip it
        i++;
        continue;
      }

      const values: string[] = [];
      // Read property values (enclosed in brackets)
      while (i < sgf.length && sgf[i] === '[') {
        i++; // Consume '['
        let value = '';
        while (i < sgf.length && (sgf[i] !== ']' || sgf[i-1] === '\\')) {
          value += sgf[i];
          i++;
        }
        i++; // Consume ']'
        values.push(value.replace(/\\(.)/g, '$1'));
      }

      node[prop] = values;
    }
    return [node, i];
  }

  private static walkSgfTree(sgf: string, index: number): [SGFNode[], number] {
    const nodes: SGFNode[] = [];
    let i = index;
    let branchProcessed = false; // Flag to ensure only the first branch is processed

    while (i < sgf.length) {
      const char = sgf[i];

      if (char === ';') {
        i++; // Consume ';'
        const [node, nextIndex] = this.parseNodeProperties(sgf, i);
        nodes.push(node);
        i = nextIndex;

      } else if (char === '(') {
        i++; // Consume '('
        if (!branchProcessed) { // Only process the first branch
          const [subNodes, length] = this.walkSgfTree(sgf, i);
          nodes.push(...subNodes);
          i = length;
          branchProcessed = true; // Mark that a branch has been processed
        } else {
          // Skip this branch by finding its closing ')'
          let openParens = 1;
          while (i < sgf.length && openParens > 0) {
            if (sgf[i] === '(') openParens++;
            if (sgf[i] === ')') openParens--;
            i++;
          }
        }
      } else if (char === ')') {
        i++; // Consume ')'
        return [nodes, i];
      } else {
        i++;
      }
    }
    return [nodes, i];
  }

  static parse(sgfContent: string): ParsedSGF {
    const cleanSGF = sgfContent.trim();
    if (!cleanSGF.startsWith('(;')) throw new Error('Invalid SGF: Does not start with "(;"');

    let i = 2; // Start after "(;"
    const [rootNode, nextIndex] = this.parseNodeProperties(cleanSGF, i);
    i = nextIndex;
    console.log("SGFParser: Root Node:", rootNode);

    const [allNodes] = this.walkSgfTree(cleanSGF, i);
    console.log("SGFParser: All Nodes (after root):", allNodes);
    
    if (Object.keys(rootNode).length === 0 && allNodes.length === 0) throw new Error('No nodes found in SGF');

    const size = 19;
    console.log("SGFParser: Board Size:", size);
    
    const gameInfo: ParsedSGF['gameInfo'] = Object.entries(rootNode).reduce((acc, [key, value]) => {
        acc[key] = value[0];
        return acc;
    }, {} as ParsedSGF['gameInfo']);
    console.log("SGFParser: Game Info:", gameInfo);

    const moves: ParsedSGF['moves'] = [];
    let moveNumber = 0;

    for (const node of allNodes) {
      const moveProp = node.B ? 'B' : node.W ? 'W' : null;
      if (moveProp) {
        const coord = node[moveProp]![0];
        const pos = this.coordinateToPosition(coord);
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
    console.log("SGFParser: Parsed Moves:", moves);

    // Sanity check: First move must be black, and colors must alternate
    if (moves.length > 0) {
      if (moves[0].color !== 'black') {
        console.error("SGF Parsing Error: First move is not black.");
      }
      for (let k = 1; k < moves.length; k++) {
        if (moves[k].color === moves[k - 1].color) {
          console.error(`SGF Parsing Error: Consecutive moves of the same color at move ${moves[k].moveNumber}.`);
          break; // Stop checking after the first error
        }
      }
    }
    
    return { size, moves, gameInfo, totalMoves: moves.length };
  }
}