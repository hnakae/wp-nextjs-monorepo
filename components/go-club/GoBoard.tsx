'use client';

import React from 'react';

// This interface defines the shape of a single stone.
export interface Stone {
  x: number;
  y: number;
  color: 'black' | 'white';
  moveNumber?: number; // Add optional moveNumber
}

// Define the BoardState type
export type BoardState = ({ color: 'black' | 'white'; moveNumber: number } | null)[][];

interface GoBoardProps {
  size?: number;
  stones?: Stone[];
  showCoordinates?: boolean;
  lastMove?: { x: number; y: number; color: 'black' | 'white'; moveNumber?: number };
}

export function GoBoard({
  size = 19,
  stones = [], // Default to an empty array
  showCoordinates = true,
  lastMove
}: GoBoardProps) {
  const cellSize = 20;
  const margin = 30;
  const boardSize = (size - 1) * cellSize;
  const svgSize = boardSize + 2 * margin;

  // The component now directly uses the 'stones' prop it receives.
  const visibleStones = stones;

  const letters = 'ABCDEFGHJKLMNOPQRST'.split('').slice(0, size);
  const numbers = Array.from({ length: size }, (_, i) => size - i);

  const getStarPoints = (boardSize: number) => {
    if (boardSize === 19) return [{ x: 3, y: 3 }, { x: 9, y: 3 }, { x: 15, y: 3 }, { x: 3, y: 9 }, { x: 9, y: 9 }, { x: 15, y: 9 }, { x: 3, y: 15 }, { x: 9, y: 15 }, { x: 15, y: 15 }];
    if (boardSize === 13) return [{ x: 3, y: 3 }, { x: 6, y: 6 }, { x: 9, y: 3 }, { x: 3, y: 9 }, { x: 9, y: 9 }];
    if (boardSize === 9) return [{ x: 2, y: 2 }, { x: 4, y: 4 }, { x: 6, y: 2 }, { x: 2, y: 6 }, { x: 6, y: 6 }];
    return [];
  };

  const starPoints = getStarPoints(size);

  return (
    <div className="flex flex-col items-center">
      <svg
        width={svgSize}
        height={svgSize}
        className="border border-border rounded-lg bg-amber-200 w-full h-auto"
        viewBox={`0 0 ${svgSize} ${svgSize}`}
      >
        {/* Grid lines */}
        {Array.from({ length: size }).map((_, i) => (
          <g key={`lines-${i}`}>
            <line x1={margin + i * cellSize} y1={margin} x2={margin + i * cellSize} y2={margin + boardSize} stroke="#8B4513" strokeWidth="1" />
            <line x1={margin} y1={margin + i * cellSize} x2={margin + boardSize} y2={margin + i * cellSize} stroke="#8B4513" strokeWidth="1" />
          </g>
        ))}

        {/* Star points */}
        {starPoints.map((point, index) => (
          <circle key={`star-${index}`} cx={margin + point.x * cellSize} cy={margin + point.y * cellSize} r="3" fill="#8B4513" />
        ))}

        {/* Stones */}
        {visibleStones.map((stone, index) => (
          <g key={`stone-${index}`}>
            <circle
              cx={margin + stone.x * cellSize}
              cy={margin + stone.y * cellSize}
              r="9"
              fill={stone.color === 'black' ? '#1a1a1a' : '#f8f8f8'}
              stroke={stone.color === 'black' ? '#000' : '#ccc'}
              strokeWidth="1"
            />
            {lastMove && lastMove.x === stone.x && lastMove.y === stone.y && (
              <circle
                cx={margin + stone.x * cellSize}
                cy={margin + stone.y * cellSize}
                r="8" // Radius for the inner ring, so outer edge aligns with stone
                fill="none"
                stroke={lastMove.color === 'black' ? 'white' : 'black'} // Dynamic color based on stone color
                strokeWidth="1.5" // Adjust stroke width as needed
              />
            )}
            {/* Display move number on each stone */}
            <text
              x={margin + stone.x * cellSize}
              y={margin + stone.y * cellSize}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill={stone.color === 'black' ? 'white' : 'black'}
              fontWeight="bold"
            >
              {stone.moveNumber || index + 1}
            </text>
          </g>
        ))}

        {/* Coordinates */}
        {showCoordinates && (
          <>
            {letters.map((letter, i) => (
              <text key={`letter-${i}`} x={margin + i * cellSize} y={svgSize - 10} textAnchor="middle" fontSize="12" fill="#666">{letter}</text>
            ))}
            {numbers.map((number, i) => (
              <text key={`number-${i}`} x={svgSize - 10} y={margin + i * cellSize} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#666">{number}</text>
            ))}
          </>
        )}
      </svg>
    </div>
  );
}