import { getColor, getPieceBySquare, getPieceType, getPiecesByColor, opponentColor, squareHasPiece } from "../variables.js"
import { AvaliableCompletePin, AvaliablePin, PossibleCaptures } from "./safe-squares.js";

export default function SafeMoves(piece, moveSquares, captureSquares) {
    let safeMoveSquares = []
    let safeCaptureSquares = []
    let possibleCaptures = []
    let color = getColor(piece)

    if (getPieceType(piece) === "king") {
        getPiecesByColor(opponentColor(color)).forEach(p => {
            possibleCaptures.push(...PossibleCaptures(p), ...AvaliableCompletePin(p))
        })
    } /*else {*/
    //     getPiecesByColor(opponentColor(color)).forEach(p => {
    //         if (AvaliablePin(p).some(square => getPieceBySquare(square) === piece)) {
    //             if (!AvaliablePin(p).some(square => squareHasPiece(square))) {
    //                 moveSquares = moveSquares.filter(square => AvaliablePin(p).some(s => s === square))
    //                 captureSquares = captureSquares.filter(square => getPieceBySquare(square) === p)
    //             }
    //         }
    //     })
    // }

    possibleCaptures = [...(new Set(possibleCaptures))]

    safeMoveSquares = moveSquares.filter(square => !possibleCaptures.some(s => s === square))
    safeCaptureSquares = captureSquares.filter(square => !possibleCaptures.some(s => s === square))

    return { moves: safeMoveSquares, captures: safeCaptureSquares }
    // return { moves: moveSquares, captures: captureSquares }
}