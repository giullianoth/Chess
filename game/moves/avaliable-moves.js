import { getPieceType } from "../variables.js"
import BishopMove from "./bishop-move.js";
import KingMove from "./king-move.js";
import QueenMove from "./queen-move.js";
import RookMove from "./rook-move.js";

export function AvaliableMoves(piece) {
    let squares = []
    let pieceType = getPieceType(piece)

    switch (pieceType) {
        case "rook":
            squares = RookMove(piece)
            break;

        case "bishop":
            squares = BishopMove(piece)
            break;

        case "queen":
            squares = QueenMove(piece)
            break;

        case "king":
            squares = KingMove(piece)
            break;
    }

    return squares
}