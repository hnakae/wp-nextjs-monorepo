// A precise type for the game's metadata
export interface GameInfo {
  playerBlack?: string;
  playerWhite?: string;
  blackRank?: string;
  whiteRank?: string;
  komi?: string;
  handicap?: string;
  result?: string;
  date?: string;
  event?: string;
  MO?: string;
  [key: string]: string | undefined;
}

// The raw data structure returned by the SGF Parser
export interface ParsedSGF {
  size: number;
  moves: Array<{
    x: number;
    y: number;
    color: 'black' | 'white';
    moveNumber: number;
    comment?: string;
  }>;
  gameInfo: GameInfo;
  totalMoves: number; // Add this line
}

// The specific structure for a move that the SGFViewer component expects
export interface ViewerMove {
  stone: { x: number; y: number; color: 'black' | 'white' };
  title: string;
  commentary: string;
}

// The final, enriched data structure that is passed to the SGFViewer
export interface SGFData {
  title: string;
  description: string;
  initialCommentary: string;
  boardSize: number;
  gameInfo: GameInfo;
  moves: ViewerMove[]; // This uses the correct, nested move structure
  totalMoves: number;
}