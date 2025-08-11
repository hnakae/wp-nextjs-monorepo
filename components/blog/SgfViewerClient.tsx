"use client";

import { useState, useEffect } from "react";
import { SGFViewer } from "@/components/go-club/SGFViewer";
import { SGFParser } from "@/lib/sgf-parser";
import { SGFData, ParsedSGF } from "@/lib/sgf-types";
// import { Buffer } from "buffer";





interface SgfViewerClientProps {
  initialPostContent: string;
  postTitle: string;
  postExcerpt: string;
  sgfUrl: string | null;
}

export default function SgfViewerClient({
  initialPostContent,
  postTitle,
  postExcerpt,
  sgfUrl,
}: SgfViewerClientProps) {
  console.log("SgfViewerClient: Rendering...");
  const [fetchedSGFString, setFetchedSGFString] = useState<string | null>(null);

  useEffect(() => {
    if (sgfUrl) {
      console.log('Fetching SGF from:', sgfUrl);
      fetch(sgfUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(sgfText => {
          setFetchedSGFString(sgfText);
        })
        .catch(error => {
          console.error("Error fetching SGF file:", error);
          setFetchedSGFString(null); // Clear SGF string on error
        });
    } else {
      setFetchedSGFString(null); // Clear SGF string if no URL
    }
  }, [sgfUrl]);

  let sgfData: SGFData | null = null;

  // Prioritize fetched SGF data if available
  const currentSGF = fetchedSGFString ? SGFParser.parse(fetchedSGFString) : null;

  if (currentSGF) {
    try {
      sgfData = {
        title: postTitle, // Use post title for SGF viewer title
        description: postExcerpt || "", // Use post excerpt for SGF viewer description
        initialCommentary: currentSGF.gameInfo.C || "",
        boardSize: currentSGF.size,
        gameInfo: currentSGF.gameInfo,
        moves: currentSGF.moves.map((move) => ({
          stone: { x: move.x, y: move.y, color: move.color },
          title: `Move ${move.moveNumber}`,
          commentary: move.comment || "",
        })),
        totalMoves: currentSGF.totalMoves,
      };
    } catch (e) {
      console.error("Error parsing SGF:", e);
      // If parsing fails, we'll just render the content without the SGF viewer
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {sgfData && (
        <SGFViewer
          title={sgfData.title}
          description={sgfData.description}
          moves={sgfData.moves}
          boardSize={sgfData.boardSize}
          initialCommentary={sgfData.initialCommentary}
        />
      )}
      
    </div>
  );
}
