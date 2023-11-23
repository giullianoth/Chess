import { AvaliableMoves } from "../moves/avaliable-moves.js";
import { getColor, getPieceName, getPieceType, getPiecesByColor, opponentColor } from "../variables.js"
import { AvaliableCompletePin, PossibleCaptures } from "./safe-squares.js";

export default function SafeMoves(piece, moveSquares, captureSquares) {
    let safeMoveSquares = []
    let safeCaptureSquares = []
    let possibleCaptures = []
    let color = getColor(piece)

    if (getPieceType(piece) === "king") {
        getPiecesByColor(opponentColor(color)).forEach(p => {
            console.log(AvaliableCompletePin(p));
            possibleCaptures.push(...PossibleCaptures(p), ...AvaliableCompletePin(p))
        })
    }

    possibleCaptures = [...(new Set(possibleCaptures))]

    safeMoveSquares = moveSquares.filter(square => !possibleCaptures.some(s => s === square))

    safeCaptureSquares = captureSquares.filter(square => !possibleCaptures.some(s => s === square))

    return { moves: safeMoveSquares, captures: safeCaptureSquares }
}