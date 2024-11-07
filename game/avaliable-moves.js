import BishopCaptures from "./moves-and-captures/captures/bishop.js"
import KingCaptures from "./moves-and-captures/captures/king.js"
import KnightCaptures from "./moves-and-captures/captures/knight.js"
import PawnCaptures from "./moves-and-captures/captures/pawn.js"
import QueenCaptures from "./moves-and-captures/captures/queen.js"
import RookCaptures from "./moves-and-captures/captures/rook.js"
import BishopMoves from "./moves-and-captures/moves/bishop.js"
import KingMoves from "./moves-and-captures/moves/king.js"
import KnightMoves from "./moves-and-captures/moves/knight.js"
import PawnMoves from "./moves-and-captures/moves/pawn.js"
import QueenMoves from "./moves-and-captures/moves/queen.js"
import RookMoves from "./moves-and-captures/moves/rook.js"
import {getType } from "./variables.js"

export const AvaliableMoves = (piece) => {
    let moves = []
    let type = getType(piece)

    switch (type) {
        case "rook":
            moves = RookMoves(piece)
            break;

        case "bishop":
            moves = BishopMoves(piece)
            break;

        case "queen":
            moves = QueenMoves(piece)
            break;

        case "king":
            moves = KingMoves(piece)
            break;

        case "knight":
            moves = KnightMoves(piece)
            break;

        case "pawn":
            moves = PawnMoves(piece)
            break;
    }

    return moves
}

export const AvaliableCaptures = (piece) => {
    let captures = []
    let type = getType(piece)

    switch (type) {
        case "rook":
            captures = RookCaptures(piece)
            break;

        case "bishop":
            captures = BishopCaptures(piece)
            break;

        case "queen":
            captures = QueenCaptures(piece)
            break;

        case "king":
            captures = KingCaptures(piece)
            break;

        case "knight":
            captures = KnightCaptures(piece)
            break;

        case "pawn":
            captures = PawnCaptures(piece)
            break;
    }

    return captures
}