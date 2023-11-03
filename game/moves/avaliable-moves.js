import { getPieceType } from "../variables.js"
import BishopMove from "./bishop-move.js";
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
    }

    return squares
}