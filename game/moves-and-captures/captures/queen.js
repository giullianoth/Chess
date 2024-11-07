import { getSquare } from "../../variables.js"
import CaptureSquares from "./squares.js"

export default function QueenCaptures(piece) {
    let square = getSquare(piece)

    let squares = [
        ...CaptureSquares(square, "up"),
        ...CaptureSquares(square, "right"),
        ...CaptureSquares(square, "down"),
        ...CaptureSquares(square, "left"),

        ...CaptureSquares(square, "up-left"),
        ...CaptureSquares(square, "up-right"),
        ...CaptureSquares(square, "down-right"),
        ...CaptureSquares(square, "down-left"),
    ]

    return squares
}