'use client';

import { useState } from 'react';
import { SGFViewer } from './SGFViewer';
import { SGFUploader } from './SGFUploader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SGFParser } from '@/lib/sgf-parser';
import { sampleSGFs, sampleGameDescriptions } from '@/data/sample-sgfs';
import { ParsedSGF, SGFData, ViewerMove } from '@/lib/sgf-types';

export function Blog() {
  const [selectedSGF, setSelectedSGF] = useState<SGFData | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [activeTab, setActiveTab] = useState('samples');

  const handleSGFSelect = (parsedData: ParsedSGF | null, fileName: string) => {
    if (parsedData) {
      const viewerMoves: ViewerMove[] = parsedData.moves.map(move => ({
        stone: { x: move.x, y: move.y, color: move.color },
        title: `${move.color === 'black' ? 'Black' : 'White'} ${move.moveNumber}`,
        commentary: move.comment || `Move ${move.moveNumber}`,
      }));

      const gameData: SGFData = {
        title: fileName,
        description: `Game record for ${fileName}`,
        moves: viewerMoves,
        boardSize: parsedData.size, // Map size to boardSize
        gameInfo: parsedData.gameInfo,
        initialCommentary: 'Game loaded from SGF file.',
      };
      setSelectedSGF(gameData);
      setSelectedFileName(fileName);
      setActiveTab('viewer');
    } else {
      setSelectedSGF(null);
      setSelectedFileName('');
    }
  };

  const loadSampleGame = (key: keyof typeof sampleSGFs) => {
    try {
      const parsed = SGFParser.parse(sampleSGFs[key]);
      const description = sampleGameDescriptions[key];
      
      const viewerMoves: ViewerMove[] = parsed.moves.map(move => ({
        stone: { x: move.x, y: move.y, color: move.color },
        title: `${move.color === 'black' ? 'Black' : 'White'} ${move.moveNumber}`,
        commentary: move.comment || `Move ${move.moveNumber}`,
      }));

      // FIX: The 'gameData' object now correctly maps 'parsed.size'
      // to 'boardSize' and includes all required properties.
      const gameData: SGFData = {
        title: description.title,
        description: description.description,
        moves: viewerMoves,
        boardSize: parsed.size, // This line fixes the error
        gameInfo: parsed.gameInfo,
        initialCommentary: description.initialCommentary,
      };

      setSelectedSGF(gameData);
      setSelectedFileName(description.title);
      setActiveTab('viewer');
    } catch(error) {
      console.error("Error parsing sample SGF:", error)
    }
  };

  return (
    <section id="blog" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl">Go Game Records & Analysis</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive go game viewer supporting SGF files. Upload your own games
              or explore our sample lessons covering fundamental concepts.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="samples">Sample Games</TabsTrigger>
              <TabsTrigger value="upload">Upload SGF</TabsTrigger>
              <TabsTrigger value="viewer">Game Viewer</TabsTrigger>
            </TabsList>

            <TabsContent value="samples" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => loadSampleGame('opening')}>
                  <CardHeader>
                    <CardTitle>Opening Principles</CardTitle>
                    <CardDescription>
                      Learn the fundamental priority order: corners, sides, then center
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      View Game
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => loadSampleGame('joseki')}>
                  <CardHeader>
                    <CardTitle>Basic Joseki</CardTitle>
                    <CardDescription>
                      Essential corner patterns every go player should know
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      View Game
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => loadSampleGame('lifeAndDeath')}>
                  <CardHeader>
                    <CardTitle>Life & Death</CardTitle>
                    <CardDescription>
                      Understanding eye shapes and group survival
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      View Game
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-8">
              <SGFUploader
                onSGFSelect={handleSGFSelect}
                selectedFile={selectedFileName}
              />
            </TabsContent>

            <TabsContent value="viewer" className="space-y-8">
              {selectedSGF ? (
                <SGFViewer
                  title={selectedSGF.title}
                  description={selectedSGF.description}
                  moves={selectedSGF.moves}
                  boardSize={selectedSGF.boardSize}
                  initialCommentary={selectedSGF.initialCommentary}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No game selected. Choose a sample game or upload your own SGF file to begin.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}