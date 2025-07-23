'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, FileText, X } from 'lucide-react';
import { SGFParser } from '@/lib/sgf-parser';

// Define a precise type for the game's metadata
interface GameInfo {
  playerBlack?: string;
  blackRank?: string;
  playerWhite?: string;
  whiteRank?: string;
  date?: string;
  result?: string;
  komi?: string;
  event?: string;
}

// Define the main type for the SGF data structure
interface SGFData {
  title: string;
  description: string;
  moves: {
    stone: { x: number; y: number; color: 'black' | 'white' };
    title: string;
    commentary: string;
  }[];
  boardSize: number;
  gameInfo: GameInfo;
  initialCommentary: string;
}

// Define the component's props with the new interface
interface SGFUploaderProps {
  onSGFSelect: (sgfData: SGFData | null) => void; // Replaced 'any' with a specific type
  selectedFile: string;
}

export function SGFUploader({ onSGFSelect, selectedFile }: SGFUploaderProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.sgf')) {
        setErrorMessage('');
        const text = await file.text();
        try {
          const parsed = SGFParser.parse(text);
          // Create the data object that matches the SGFData interface
          const sgfData: SGFData = {
            title: file.name,
            description: `Game record from ${file.name}`,
            moves: parsed.moves.map(move => ({
              stone: { x: move.x, y: move.y, color: move.color },
              title: `${move.color === 'black' ? 'Black' : 'White'} ${move.moveNumber}`,
              commentary: move.comment || `${move.color === 'black' ? 'Black' : 'White'} plays at ${String.fromCharCode(97 + move.x)}${20 - move.y}.`,
            })),
            boardSize: parsed.size,
            gameInfo: parsed.gameInfo,
            initialCommentary: 'Game loaded from SGF file.',
          };
          onSGFSelect(sgfData);
        } catch (error) {
          console.error('SGF Parsing Error:', error);
          setErrorMessage('Failed to parse SGF file. Please check the file format.');
        }
      } else {
        setErrorMessage('Invalid file type. Please upload an SGF file.');
      }
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleClearFile = () => {
    // Pass null to clear the selection in the parent component
    onSGFSelect(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Your SGF File</CardTitle>
        <CardDescription>
          Select an SGF file from your computer to view it on the board.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".sgf"
          onChange={handleFileChange}
        />
        <Button onClick={handleUploadClick} variant="outline" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          {selectedFile || 'Click to select a file'}
        </Button>
        {selectedFile && (
          <div className="flex items-center justify-between text-sm text-muted-foreground p-2 bg-muted rounded-md">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{selectedFile}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearFile} // Use the new handler
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </CardContent>
    </Card>
  );
}