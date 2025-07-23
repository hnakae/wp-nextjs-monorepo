'use client';

import { useState } from 'react';
import { GoBoard } from './GoBoard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from 'lucide-react';
import { ViewerMove } from '@/lib/sgf-types'; // Import the shared type

// The old local 'Stone' and 'MoveData' interfaces are no longer needed.

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
  boardSize = 19,
  initialCommentary = "Position before any moves are played."
}: SGFViewerProps) {
  // The state now tracks the number of moves to show. 0 is the initial empty board.
  const [currentMove, setCurrentMove] = useState(0);

  // Prepare the props that GoBoard expects.
  const stonesToDisplay = moves.slice(0, currentMove).map(move => move.stone);
  const currentMoveData = currentMove > 0 ? moves[currentMove - 1] : null;

  const commentary = currentMoveData?.commentary || initialCommentary;
  const moveTitle = currentMove === 0
    ? "Starting Position"
    : currentMoveData?.title || `Move ${currentMove}`;

  // Navigation logic to update the move count.
  const goToFirstMove = () => setCurrentMove(0);
  const goToPreviousMove = () => setCurrentMove(Math.max(0, currentMove - 1));
  const goToNextMove = () => setCurrentMove(Math.min(moves.length, currentMove + 1));
  const goToLastMove = () => setCurrentMove(moves.length);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        {/* Pass the correct props to your existing GoBoard component */}
        <GoBoard
          size={boardSize}
          stones={stonesToDisplay}
          currentMove={currentMove}
          showCoordinates={true}
        />

        {/* Navigation controls */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToFirstMove}
            disabled={currentMove === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousMove}
            disabled={currentMove === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 bg-muted rounded text-sm">
            Move {currentMove} of {moves.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextMove}
            disabled={currentMove === moves.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToLastMove}
            disabled={currentMove === moves.length}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{moveTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">{commentary}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}