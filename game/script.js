import Board, { setBoardDimensions } from "./board.js";
import Moves from "./moves.js";
import Pieces from "./pieces.js";

Board()
Pieces()
Moves()

window.addEventListener("resize", () => setBoardDimensions())