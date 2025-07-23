import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, X } from 'lucide-react';
import { SGFParser } from '@/lib/sgf-parser';

// Define a precise type for the game info
interface GameInfo {
  playerBlack?: string;
  playerWhite?: string;
  blackRank?: string;
  whiteRank?: string;
  komi?: string;
  handicap?: string;
  result?: string;
  date?: string;
  event?: string;
}

// Define a precise type for the parsed SGF data
interface ParsedSGF {
  size: number;
  moves: Array<{
    x: number;
    y: number;
    color: 'black' | 'white';
    moveNumber: number;
    comment?: string;
  }>;
  gameInfo: GameInfo;
}

// Define the structure for a file uploaded by the user
interface SGFFile {
  name: string;
  content: string;
  gameInfo: ParsedSGF['gameInfo'];
}

// FIX 1: Update the props interface to include the fileName in the callback
interface SGFUploaderProps {
  onSGFSelect: (sgfData: ParsedSGF | null, fileName: string) => void;
  selectedFile?: string;
}

export function SGFUploader({ onSGFSelect, selectedFile }: SGFUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<SGFFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    const newFiles: SGFFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name.endsWith('.sgf')) {
        try {
          const content = await file.text();
          const parsed = SGFParser.parse(content);
          newFiles.push({
            name: file.name,
            content,
            gameInfo: parsed.gameInfo,
          });
        } catch (error) {
          console.error(`Error parsing ${file.name}:`, error);
        }
      }
    }
    setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const selectSGF = (file: SGFFile) => {
    try {
      const parsed = SGFParser.parse(file.content);
      console.log('Parser Output:', {
      fileName: file.name,
      moveCount: parsed.moves.length,
      gameInfo: parsed.gameInfo,
    });
      onSGFSelect(parsed, file.name);
    } catch (error) {
      console.error(`Error selecting ${file.name}:`, error);
      onSGFSelect(null, file.name);
    }
  };
  
  const removeFile = (index: number, fileName: string) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    // Also clear the viewer if the removed file was the selected one
    if (selectedFile === fileName) {
      onSGFSelect(null, '');
    }
  };

  return (
    <div className="space-y-4">
      <Card 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed transition-colors ${dragActive ? 'border-primary' : ''}`}
      >
        <CardHeader className="text-center">
          <CardTitle>Drop SGF Files Here</CardTitle>
          <CardDescription>or click to select files</CardDescription>
        </CardHeader>
        <CardContent>
          <input 
            ref={fileInputRef} 
            type="file" 
            className="hidden" 
            multiple 
            accept=".sgf"
            onChange={handleChange}
          />
          <Button onClick={onButtonClick} variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Select Files
          </Button>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Games</CardTitle>
            <CardDescription>Select a game to view it on the board.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedFile === file.name 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => selectSGF(file)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {file.gameInfo.playerBlack || 'Black'} vs {file.gameInfo.playerWhite || 'White'}
                        {file.gameInfo.date && ` • ${file.gameInfo.date}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index, file.name);
                    }}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}