'use client';

import { useState, useEffect } from 'react';
import { GoBoard } from './GoBoard';
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
  boardSize = 19,
  initialCommentary = "Position before any moves are played."
}: SGFViewerProps) {
  const [currentMoveNumber, setCurrentMoveNumber] = useState(0);

  useEffect(() => {
    setCurrentMoveNumber(0);
  }, [moves]);

  const stonesToDisplay = moves.slice(0, currentMoveNumber).map(move => move.stone);
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
      <div className="space-y-4">
        {/* FIX: Removed the unnecessary 'currentMove' prop */}
        <GoBoard
          size={boardSize}
          stones={stonesToDisplay}
          showCoordinates={true}
        />

        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToFirstMove}
            disabled={currentMoveNumber === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousMove}
            disabled={currentMoveNumber === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 bg-muted rounded text-sm">
            Move {currentMoveNumber} of {moves.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextMove}
            disabled={currentMoveNumber === moves.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToLastMove}
            disabled={currentMoveNumber === moves.length}
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