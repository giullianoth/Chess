import { getAllMoves } from "../moves/move-squares.js"
import { columns, getColor, getPieceBySquare, getPieceType, ranks, squareHasPiece } from "../variables.js"

export function getAllPinSquares(square, direction, columnsSet = columns, ranksSet = ranks) {
    let squares = getAllMoves(square, direction, columnsSet, ranksSet)
    let color = getColor(getPieceBySquare(square))

    if (squares.some(s => squareHasPiece(s) && color === getColor(getPieceBySquare(s)))) {
        return []
    }

    if (!squares.some(s =>
        squareHasPiece(s) && getPieceType(getPieceBySquare(s)) === "king" && color !== getColor(getPieceBySquare(s)))) {
        return []
    }

    return squares
}

export function getPin(square, direction, columnsSet = columns, ranksSet = ranks) {
    let allSquares = getAllMoves(square, direction, columnsSet, ranksSet)
    let squares = []
    let color = getColor(getPieceBySquare(square))

    if (allSquares.length) {
        for (let index = 0; index < allSquares.length; index++) {
            squares.push(allSquares[index])

            if (squareHasPiece(allSquares[index])) {
                let pinPiece = getPieceBySquare(allSquares[index])

                if (getPieceType(pinPiece) === "king" && color !== getColor(pinPiece)) {
                    break
                }
            }
        }
    }

    if (!squares.some(s =>
        squareHasPiece(s) && getPieceType(getPieceBySquare(s)) === "king" && color !== getColor(getPieceBySquare(s)))) {
        return []
    }

    squares.pop()
    return squares
}