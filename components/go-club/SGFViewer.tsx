'use client';

import { useState, useEffect, useCallback } from 'react';
import { GoBoard, BoardState } from './GoBoard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from 'lucide-react';
import { ViewerMove } from '@/lib/sgf-types';

interface SGFViewerProps {
  title: string;
  description: string;
  moves: ViewerMove[];
  boardSize: number;
  initialCommentary: string;
  
}

export function SGFViewer({
  title,
  description,
  moves,
  boardSize: initialBoardSize = 19,
  initialCommentary = "Position before any moves are played.",
}: SGFViewerProps) {
  const boardSize = initialBoardSize > 0 ? initialBoardSize : 19;
  if (initialBoardSize <= 0) {
    console.error("Invalid boardSize received by SGFViewer, defaulting to 19:", initialBoardSize);
  }
  console.log("SGFViewer received boardSize:", boardSize);
  const [currentMoveNumber, setCurrentMoveNumber] = useState(0);
  const [board, setBoard] = useState<BoardState>(() => Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)));

  // --- CAPTURE LOGIC START ---

  // Helper function to get adjacent coordinates
  const getNeighbors = useCallback((x: number, y: number) => {
    const neighbors = [];
    if (x > 0) neighbors.push({ x: x - 1, y });
    if (x < boardSize - 1) neighbors.push({ x: x + 1, y });
    if (y > 0) neighbors.push({ x, y: y - 1 });
    if (y < boardSize - 1) neighbors.push({ x, y: y + 1 });
    return neighbors;
  }, [boardSize]); 

  // Helper function to find all stones in a connected group and its liberties
  const findGroup = useCallback((x: number, y: number, boardState: BoardState) => {
    const stoneAtXY = boardState[y][x];
    const color = stoneAtXY ? stoneAtXY.color : null;
    if (!color) return { stones: [], liberties: 0 };

    const visited = new Set<string>();
    const stack = [{ x, y }];
    const groupStones = new Set<string>();
    const liberties = new Set<string>();

    while (stack.length > 0) {
      const stone = stack.pop()!;
      const key = `${stone.x},${stone.y}`;

      if (visited.has(key)) continue;
      visited.add(key);
      
      const currentStone = boardState[stone.y][stone.x];
      if (currentStone && currentStone.color === color) {
        groupStones.add(key);
        const neighbors = getNeighbors(stone.x, stone.y);
        for (const neighbor of neighbors) {
          const neighborKey = `${neighbor.x},${neighbor.y}`;
          const neighborStone = boardState[neighbor.y][neighbor.x];
          if (neighborStone === null) {
            liberties.add(neighborKey);
          } else if (neighborStone.color === color) {
            stack.push(neighbor);
          }
        }
      }
    }

    return {
      stones: Array.from(groupStones).map(s => ({ x: parseInt(s.split(',')[0]), y: parseInt(s.split(',')[1]) })),
      liberties: liberties.size
    };
  }, [getNeighbors]);
  
  // This effect now calculates the board state, including captures
  useEffect(() => {
    const newBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));

    for (let i = 0; i < currentMoveNumber; i++) {
      const move = moves[i];
      if (move) {
        const { x, y, color } = move.stone;
        if(newBoard[y][x] === null) {
            newBoard[y][x] = { color, moveNumber: i + 1 };
        }

        // Check for captures
        const opponentColor = color === 'black' ? 'white' : 'black';
        const neighbors = getNeighbors(x, y);

        for (const neighbor of neighbors) {
          const neighborStone = newBoard[neighbor.y][neighbor.x];
          if (neighborStone && neighborStone.color === opponentColor) {
            const { stones, liberties } = findGroup(neighbor.x, neighbor.y, newBoard);
            if (liberties === 0) {
              // This group is captured, remove it from the board
              for (const stone of stones) {
                newBoard[stone.y][stone.x] = null;
              }
            }
          }
        }

        // Check for suicide (not strictly necessary for viewing but good practice)
        const { stones: suicideStones, liberties: suicideLiberties } = findGroup(x, y, newBoard);
        if (suicideLiberties === 0) {
            for (const stone of suicideStones) {
                newBoard[stone.y][stone.x] = null;
            }
        }
      }
    }
    setBoard(newBoard);
  }, [currentMoveNumber, moves, boardSize, findGroup, getNeighbors]);
  
  // --- CAPTURE LOGIC END ---

  const currentMoveData = currentMoveNumber > 0 ? moves[currentMoveNumber - 1] : null;

  const commentary = currentMoveData?.commentary || initialCommentary;
  const moveTitle = currentMoveNumber === 0
    ? "Starting Position"
    : currentMoveData?.title || `Move ${currentMoveNumber}`;

  const goToFirstMove = () => setCurrentMoveNumber(0);
  const goToPreviousMove = () => setCurrentMoveNumber(Math.max(0, currentMoveNumber - 1));
  const goToNextMove = () => setCurrentMoveNumber(Math.min(moves.length, currentMoveNumber + 1));
  const goToLastMove = () => setCurrentMoveNumber(moves.length);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-4 flex-shrink-0 max-w-full">
        {/* The GoBoard now receives the dynamically calculated board state */}
        <GoBoard
          size={boardSize}
          stones={
            // We pass the stones based on the calculated board state, not the raw move list
            board.flatMap((row, y) => 
              row.map((cell, x) => cell ? { x, y, color: cell.color, moveNumber: cell.moveNumber } : null)
                 .filter(stone => stone !== null)
            ) as { x: number; y: number; color: 'black' | 'white'; moveNumber?: number }[]
          }
          showCoordinates={true}
          lastMove={currentMoveData ? { x: currentMoveData.stone.x, y: currentMoveData.stone.y, color: currentMoveData.stone.color, moveNumber: currentMoveNumber } : undefined}
        />

        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="icon" onClick={goToFirstMove} disabled={currentMoveNumber === 0}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToPreviousMove} disabled={currentMoveNumber === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 bg-muted rounded text-sm">
            Move {currentMoveNumber} of {moves.length}
          </span>
          <Button variant="outline" size="icon" onClick={goToNextMove} disabled={currentMoveNumber === moves.length}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToLastMove} disabled={currentMoveNumber === moves.length}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">{moveTitle}</CardTitle></CardHeader>
          <CardContent><p className="leading-relaxed">{commentary}</p></CardContent>
        </Card>
      </div>
    </div>
  );
}