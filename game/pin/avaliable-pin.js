import { getPieceType } from "../variables.js"
import BishopPin from "./bishop-pin.js";
import QueenPin from "./queen-pin.js";
import RookPin from "./rook-pin.js";

export function AvaliablePinSquares(piece) {
    let squares = []
    let pieceType = getPieceType(piece)

    switch (pieceType) {
        case "rook":
            squares = RookPin(piece)
            break;

        case "bishop":
            squares = BishopPin(piece)
            break;

        case "queen":
            squares = QueenPin(piece)
            break;
    }

    return squares
}