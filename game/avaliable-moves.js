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
import BishopPin from "./moves-and-captures/pin/bishop.js"
import QueenPin from "./moves-and-captures/pin/queen.js"
import RookPin from "./moves-and-captures/pin/rook.js"
import BishopPossibleCaptures from "./moves-and-captures/possible-captures/bishop.js"
import KingPossibleCaptures from "./moves-and-captures/possible-captures/king.js"
import KnightPossibleCaptures from "./moves-and-captures/possible-captures/knight.js"
import PawnPossibleCaptures from "./moves-and-captures/possible-captures/pawn.js"
import QueenPossibleCaptures from "./moves-and-captures/possible-captures/queen.js"
import RookPossibleCaptures from "./moves-and-captures/possible-captures/rook.js"
import { getPiecesByColor, getType, opponentColor } from "./variables.js"

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

export function PossibleCaptures(color) {
    let squares = []

    getPiecesByColor(opponentColor(color)).forEach(piece => {
        switch (getType(piece)) {
            case "rook":
                squares.push(...RookPossibleCaptures(piece))
                break;

            case "bishop":
                squares.push(...BishopPossibleCaptures(piece))
                break;

            case "queen":
                squares.push(...QueenPossibleCaptures(piece))
                break;

            case "king":
                squares.push(...KingPossibleCaptures(piece))
                break;

            case "knight":
                squares.push(...KnightPossibleCaptures(piece))
                break;

            case "pawn":
                squares.push(...PawnPossibleCaptures(piece))
                break;
        }
    })

    return Array.from(new Set(squares))
}

export function Pin(color) {
    let squares = []

    getPiecesByColor(opponentColor(color)).forEach(piece => {
        switch (getType(piece)) {
            case "rook":
                squares.push(RookPin(piece))
                break;

            case "bishop":
                squares.push(BishopPin(piece))
                break;

            case "queen":
                squares.push(QueenPin(piece))
                break;
        }
    })

    return squares
}