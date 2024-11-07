import { columns, getColor, getPieceBySquare, ranks, squareHasPiece, turn } from "../../variables.js"
import AllMoveSquares from "../squares.js"

export default function CaptureSquares(square, direction, columnsSet = columns, ranksSet = ranks, colorToCompare = turn) {
    let squares = AllMoveSquares(square, direction, columnsSet, ranksSet)
    let avaliableSquares = []

    if (squares.length) {
        for (let index = 0; index < squares.length; index++) {
            if (squareHasPiece(squares[index])) {
                let pieceInSquare = getPieceBySquare(squares[index])
                getColor(pieceInSquare) !== colorToCompare && avaliableSquares.push(squares[index])
                break
            }
        }
    }

    return avaliableSquares
}