import { AvaliableMoves } from "../moves/avaliable-moves.js"
import { PawnCapture } from "../moves/pawn-move.js"
import { getPieceType } from "../variables.js"
import BishopPin, { AllBishopPin } from "./bishop-pin.js"
import QueenPin, { AllQueenPin } from "./queen-pin.js"
import RookPin, { AllRookPin } from "./rook-pin.js"

export function AvaliablePin(piece) {
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

export function AvaliableCompletePin(piece) {
    let squares = []
    let pieceType = getPieceType(piece)

    switch (pieceType) {
        case "rook":
            squares = AllRookPin(piece)
            break;

        case "bishop":
            squares = AllBishopPin(piece)
            break;

        case "queen":
            squares = AllQueenPin(piece)
            break;
    }

    return squares
}

export function PossibleCaptures(piece) {
    let pieceType = getPieceType(piece)

    return pieceType === "pawn"
        ? PawnCapture(piece).moves.concat(PawnCapture(piece).captures)
        : AvaliableMoves(piece).moves.concat(AvaliableMoves(piece).captures)
}