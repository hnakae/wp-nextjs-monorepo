'use client';

import { useState } from 'react';
import { SGFViewer } from './SGFViewer';
import { SGFUploader } from './SGFUploader';
// FIX: Added CardContent and CardDescription back to the import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // FIX: Added Button import
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SGFParser } from '@/lib/sgf-parser';
import { sampleSGFs, sampleGameDescriptions } from '@/data/sample-sgfs';
import { ParsedSGF, SGFData, ViewerMove } from '@/lib/sgf-types';

export function Blog() {
  const [selectedSGF, setSelectedSGF] = useState<SGFData | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [activeTab, setActiveTab] = useState('samples');
  const [error, setError] = useState<string | null>(null);

  const handleSGFSelect = (parsedData: ParsedSGF | null, fileName: string) => {
    setError(null);
    if (parsedData && Array.isArray(parsedData.moves)) {
      const viewerMoves: ViewerMove[] = parsedData.moves.map(move => ({
        stone: { x: move.x, y: move.y, color: move.color },
        title: `Move ${move.moveNumber}`,
        commentary: move.comment || '',
      }));
      const gameData: SGFData = {
        title: fileName,
        description: `Game record for ${fileName}`,
        moves: viewerMoves,
        boardSize: parsedData.size,
        gameInfo: parsedData.gameInfo,
        initialCommentary: 'Game loaded from SGF file.',
        totalMoves: parsedData.totalMoves,
      };
      setSelectedSGF(gameData);
      setSelectedFileName(fileName);
      setActiveTab('viewer');
    } else if (fileName) {
      setError(`Could not parse the SGF file: ${fileName}.`);
      setSelectedSGF(null);
      setSelectedFileName('');
    }
  };

  const loadSampleGame = (key: keyof typeof sampleSGFs) => {
    setError(null);
    try {
      const parsed = SGFParser.parse(sampleSGFs[key]);
      handleSGFSelect(parsed, sampleGameDescriptions[key].title);
    } catch (e: unknown) {
      console.error("Error loading sample game:", e);
      const message = (e instanceof Error) ? e.message : "An error occurred while loading the sample game.";
      setError(message);
    }
  };

  return (
    <section id="blog" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl">Go Game Records & Analysis</h2>
          </div>

          {error && (
            <div className="p-4 my-4 text-center text-red-700 bg-red-100 rounded-lg">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="samples">Sample Games</TabsTrigger>
              <TabsTrigger value="upload">Upload SGF</TabsTrigger>
              <TabsTrigger value="viewer">Game Viewer</TabsTrigger>
            </TabsList>
            <TabsContent value="samples">
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                {/* FIX: Restored the card content for a complete look */}
                <Card className="cursor-pointer hover:shadow-lg" onClick={() => loadSampleGame('opening')}>
                  <CardHeader>
                    <CardTitle>Opening Principles</CardTitle>
                    <CardDescription>Learn the fundamental priority order.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Game</Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg" onClick={() => loadSampleGame('joseki')}>
                  <CardHeader>
                    <CardTitle>Basic Joseki</CardTitle>
                    <CardDescription>Essential corner patterns to know.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Game</Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg" onClick={() => loadSampleGame('lifeAndDeath')}>
                  <CardHeader>
                    <CardTitle>Life & Death</CardTitle>
                    <CardDescription>Understanding eye shapes and survival.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Game</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="upload">
              <SGFUploader onSGFSelect={handleSGFSelect} selectedFile={selectedFileName} />
            </TabsContent>
            <TabsContent value="viewer">
              {selectedSGF ? (
                <SGFViewer
                  key={selectedFileName}
                  title={selectedSGF.title}
                  description={selectedSGF.description}
                  moves={selectedSGF.moves}
                  boardSize={selectedSGF.boardSize}
                  initialCommentary={selectedSGF.initialCommentary}
                  // totalMoves={selectedSGF.totalMoves}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No game selected or the SGF file could not be read.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}