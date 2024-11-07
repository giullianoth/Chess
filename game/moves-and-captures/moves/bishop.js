import { getSquare } from "../../variables.js"
import MoveSquares from "./squares.js"

export default function BishopMoves(piece) {
    let square = getSquare(piece)

    let squares = [
        ...MoveSquares(square, "up-left"),
        ...MoveSquares(square, "up-right"),
        ...MoveSquares(square, "down-right"),
        ...MoveSquares(square, "down-left"),
    ]

    return squares
}