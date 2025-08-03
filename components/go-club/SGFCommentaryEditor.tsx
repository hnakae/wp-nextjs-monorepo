import { useState } from 'react';
import { GoBoard } from './GoBoard';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward, Save, Edit } from 'lucide-react';

interface Stone {
  x: number;
  y: number;
  color: 'black' | 'white';
}



import { GameInfo } from '../../lib/sgf-types';

interface SGFCommentaryEditorProps {
  title: string;
  description: string;
  moves: ViewerMove[];
  boardSize?: number;
  initialCommentary?: string;
  gameInfo: GameInfo;
  totalMoves: number;
  onUpdateSGF: (updatedSGF: { 
    title: string; 
    description: string; 
    moves: ViewerMove[]; 
    boardSize: number;
    initialCommentary: string;
    gameInfo: GameInfo;
    totalMoves: number;
  }) => void;
}

export function SGFCommentaryEditor({
  title, 
  description, 
  moves, 
  boardSize = 19, 
  initialCommentary = "Position before any moves are played.",
  gameInfo,
  totalMoves,
  onUpdateSGF
}: SGFCommentaryEditorProps) {
  const [currentMove, setCurrentMove] = useState(0);
  const [editingMove, setEditingMove] = useState<number | null>(null);
  const [localMoves, setLocalMoves] = useState<ViewerMove[]>(moves);
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [localInitialCommentary, setLocalInitialCommentary] = useState(initialCommentary);
  const [tempCommentary, setTempCommentary] = useState('');
  const [tempMoveTitle, setTempMoveTitle] = useState('');

  const stones = localMoves.slice(0, currentMove).map(move => move.stone);
  const currentMoveData = currentMove > 0 ? localMoves[currentMove - 1] : null;
  const commentary = currentMoveData?.commentary || localInitialCommentary;
  const moveTitle = currentMove === 0 
    ? "Starting Position" 
    : currentMoveData?.title || `Move ${currentMove}`;

  const goToFirstMove = () => setCurrentMove(0);
  const goToPreviousMove = () => setCurrentMove(Math.max(0, currentMove - 1));
  const goToNextMove = () => setCurrentMove(Math.min(localMoves.length, currentMove + 1));
  const goToLastMove = () => setCurrentMove(localMoves.length);

  const startEditing = (moveIndex: number) => {
    if (moveIndex === 0) {
      // Editing initial position
      setTempCommentary(localInitialCommentary);
      setTempMoveTitle('Starting Position');
    } else {
      const move = localMoves[moveIndex - 1];
      setTempCommentary(move.commentary || '');
      setTempMoveTitle(move.title || `Move ${moveIndex}`);
    }
    setEditingMove(moveIndex);
  };

  const saveEdit = () => {
    if (editingMove === null) return;

    if (editingMove === 0) {
      // Save initial commentary
      setLocalInitialCommentary(tempCommentary);
    } else {
      // Save move commentary
      const newMoves = [...localMoves];
      const moveIndex = editingMove - 1;
      newMoves[moveIndex] = {
        ...newMoves[moveIndex],
        commentary: tempCommentary,
        title: tempMoveTitle !== `Move ${editingMove}` ? tempMoveTitle : ''
      };
      setLocalMoves(newMoves);
    }

    setEditingMove(null);
    
    // Update parent component
    onUpdateSGF({
      title: localTitle,
      description: localDescription,
      moves: localMoves,
      boardSize,
      initialCommentary: localInitialCommentary,
      gameInfo,
      totalMoves
    });
  };

  const cancelEdit = () => {
    setEditingMove(null);
    setTempCommentary('');
    setTempMoveTitle('');
  };

  const saveMetadata = () => {
    onUpdateSGF({
      title: localTitle,
      description: localDescription,
      moves: localMoves,
      boardSize,
      initialCommentary: localInitialCommentary,
      gameInfo,
      totalMoves
    });
  };

  return (
    <div className="space-y-8">
      {/* Game Metadata Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Game Information</CardTitle>
          <CardDescription>Edit the title and description for this game record</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="game-title">Game Title</Label>
            <Input
              id="game-title"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={saveMetadata}
              placeholder="Enter game title..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="game-description">Game Description</Label>
            <Textarea
              id="game-description"
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              onBlur={saveMetadata}
              placeholder="Enter game description..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Editor Layout */}
      <div className="space-y-8">
        {/* Board Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-lg">
            <GoBoard 
              size={boardSize} 
              stones={stones} 
              currentMove={currentMove}
              showCoordinates={true}
            />
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToFirstMove}
              disabled={currentMove === 0}
              className="h-10 w-10"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToPreviousMove}
              disabled={currentMove === 0}
              className="h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-4 py-2 bg-muted rounded-md text-sm font-medium min-w-[140px] text-center">
              {currentMove === 0 ? "Start" : `Move ${currentMove}`} of {localMoves.length}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToNextMove}
              disabled={currentMove === localMoves.length}
              className="h-10 w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToLastMove}
              disabled={currentMove === localMoves.length}
              className="h-10 w-10"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Section - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Commentary Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{moveTitle}</CardTitle>
                  <CardDescription>
                    {currentMove === 0 ? 'Initial position commentary' : 'Commentary for this move'}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditing(currentMove)}
                  disabled={editingMove !== null}
                  className="flex items-center gap-2 shrink-0"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                {editingMove === currentMove ? (
                  <div className="space-y-4">
                    {currentMove > 0 && (
                      <div className="space-y-2">
                        <Label htmlFor="move-title">Move Title (optional)</Label>
                        <Input
                          id="move-title"
                          value={tempMoveTitle}
                          onChange={(e) => setTempMoveTitle(e.target.value)}
                          placeholder={`Move ${currentMove}`}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="commentary">Commentary</Label>
                      <Textarea
                        id="commentary"
                        value={tempCommentary}
                        onChange={(e) => setTempCommentary(e.target.value)}
                        placeholder="Enter commentary for this position..."
                        rows={8}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" onClick={saveEdit} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[200px]">
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {commentary || (currentMove === 0 ? 'No initial commentary added.' : 'No commentary for this move.')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Move List Navigation */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Move Navigation</CardTitle>
                <CardDescription>Click on any move to jump to that position and edit its commentary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  <button
                    onClick={() => setCurrentMove(0)}
                    className={`w-full text-left p-3 rounded-md transition-colors border ${
                      currentMove === 0
                        ? 'bg-accent text-accent-foreground border-border'
                        : 'hover:bg-muted/50 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Starting Position</span>
                      <span className="text-xs text-muted-foreground">
                        {localInitialCommentary ? '✓' : '○'}
                      </span>
                    </div>
                  </button>

                  {localMoves.map((move, index) => {
                    const moveNumber = index + 1;
                    const hasCommentary = move.commentary && move.commentary.trim();
                    const displayTitle = move.title || `Move ${moveNumber}`;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentMove(moveNumber)}
                        className={`w-full text-left p-3 rounded-md transition-colors border ${
                          currentMove === moveNumber
                            ? 'bg-accent text-accent-foreground border-border'
                            : 'hover:bg-muted/50 border-transparent'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{displayTitle}</span>
                            <span className="text-xs text-muted-foreground">
                              {move.stone.color === 'black' ? '●' : '○'} 
                              {String.fromCharCode(65 + move.stone.x)}{19 - move.stone.y}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {hasCommentary ? '✓' : '○'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}