import { columns, getColor, getPieceBySquare, ranks, squareHasPiece } from "../../variables.js"
import AllMoveSquares from "../squares.js"

export default function PossibleCaptureSquares(square, direction, columnsSet = columns, ranksSet = ranks) {
    let squares = AllMoveSquares(square, direction, columnsSet, ranksSet)
    let color = getColor(getPieceBySquare(square))
    let avaliableSquares = []

    if (squares.length) {
        for (let index = 0; index < squares.length; index++) {
            if (squareHasPiece(squares[index])) {
                let pieceInSquare = getPieceBySquare(squares[index])
                getColor(pieceInSquare) === color && avaliableSquares.push(squares[index])
                break
            }

            avaliableSquares.push(squares[index])
        }
    }

    return avaliableSquares
}