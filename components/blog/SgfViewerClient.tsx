"use client";

import { useState } from "react";
import { SGFViewer } from "@/components/go-club/SGFViewer";
import { SGFUploader } from "@/components/go-club/SGFUploader";
import { SGFParser } from "@/lib/sgf-parser";
import { SGFData, ParsedSGF } from "@/lib/sgf-types";
// import { Buffer } from "buffer";

const SGF_DATA_PREFIX = "<!-- SGF_DATA:";
const SGF_DATA_SUFFIX = "-->";

function extractAndDecodeSGF(content: string): { sgfString: string | null; cleanContent: string } {
  const startIndex = content.indexOf(SGF_DATA_PREFIX);
  const endIndex = content.indexOf(SGF_DATA_SUFFIX, startIndex);

  if (startIndex !== -1 && endIndex !== -1) {
    const sgfString = content.substring(startIndex + SGF_DATA_PREFIX.length, endIndex).trim();
    const cleanContent = content.substring(0, startIndex) + content.substring(endIndex + SGF_DATA_SUFFIX.length);
    return { sgfString, cleanContent };
  }
  return { sgfString: null, cleanContent: content };
}

interface SgfViewerClientProps {
  initialPostContent: string;
  postTitle: string;
  postExcerpt: string;
}

export default function SgfViewerClient({
  initialPostContent,
  postTitle,
  postExcerpt,
}: SgfViewerClientProps) {
  console.log("SgfViewerClient: Rendering...");
  const [uploadedSGFData, setUploadedSGFData] = useState<ParsedSGF | null>(null);

  const handleSGFSelect = (parsedSGF: ParsedSGF | null) => {
    setUploadedSGFData(parsedSGF);
  };

  const { sgfString } = extractAndDecodeSGF(initialPostContent || "");
  let sgfData: SGFData | null = null;

  // Prioritize uploaded SGF data if available
  const currentSGF = uploadedSGFData || (sgfString ? SGFParser.parse(sgfString) : null);

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
      <SGFUploader onSGFSelect={handleSGFSelect} />
    </div>
  );
}
