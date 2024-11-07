import { columns, ranks, squareHasPiece } from "../../variables.js"
import AllMoveSquares from "../squares.js"

export default function MoveSquares(square, direction, columnsSet = columns, ranksSet = ranks) {
    let squares = AllMoveSquares(square, direction, columnsSet, ranksSet)
    let avaliableSquares = []

    if (squares.length) {
        for (let index = 0; index < squares.length; index++) {
            if (squareHasPiece(squares[index])) {
                break
            }

            avaliableSquares.push(squares[index])
        }
    }

    return avaliableSquares
}