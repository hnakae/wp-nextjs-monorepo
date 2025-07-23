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

  private static walkSgfTree(sgf: string, index: number): [SGFNode[], number] {
    const nodes: SGFNode[] = [];
    let i = index;
    let branchProcessed = false; // Flag to ensure only the first branch is processed

    while (i < sgf.length) {
      const char = sgf[i];

      if (char === ';') {
        i++; // Consume ';'
        const node: SGFNode = {};
        while (i < sgf.length && sgf[i] !== ';' && sgf[i] !== '(' && sgf[i] !== ')') {
          if (sgf[i].match(/\s/)) { // Skip whitespace
            i++;
            continue;
          }

          let prop = '';
          while (i < sgf.length && sgf[i]?.match(/[A-Z]/)) {
            prop += sgf[i];
            i++;
          }

          const values: string[] = [];
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
          if (prop) {
            node[prop] = values;
          } else {
            i++;
          }
        }
        if (Object.keys(node).length > 0) {
            nodes.push(node);
        }

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

    const [allNodes] = this.walkSgfTree(cleanSGF, 1);
    
    if (allNodes.length === 0) throw new Error('No nodes found in SGF');

    const rootNode = allNodes.shift()!;
    const size = rootNode.SZ ? parseInt(rootNode.SZ[0], 10) : 19;
    
    const gameInfo: ParsedSGF['gameInfo'] = Object.entries(rootNode).reduce((acc, [key, value]) => {
        acc[key] = value[0];
        return acc;
    }, {} as ParsedSGF['gameInfo']);

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
    
    return { size, moves, gameInfo, totalMoves: moves.length };
  }
}