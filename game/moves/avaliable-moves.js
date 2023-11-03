import { getPieceType } from "../variables.js"
import RookMove from "./rook-move.js";

export function AvaliableMoves(piece) {
    let squares = []
    let pieceType = getPieceType(piece)

    switch (pieceType) {
        case "rook":
            squares = RookMove(piece)
            break;
    }

    return squares
}