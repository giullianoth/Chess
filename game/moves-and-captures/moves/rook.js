import { getSquare } from "../../variables.js"
import MoveSquares from "./squares.js"

export default function RookMoves(piece) {
    let square = getSquare(piece)

    let squares = [
        ...MoveSquares(square, "up"),
        ...MoveSquares(square, "right"),
        ...MoveSquares(square, "down"),
        ...MoveSquares(square, "left"),
    ]

    return squares
}