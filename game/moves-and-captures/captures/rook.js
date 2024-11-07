import { getSquare } from "../../variables.js"
import CaptureSquares from "./squares.js"

export default function RookCaptures(piece) {
    let square = getSquare(piece)

    let squares = [
        ...CaptureSquares(square, "up"),
        ...CaptureSquares(square, "right"),
        ...CaptureSquares(square, "down"),
        ...CaptureSquares(square, "left"),
    ]

    return squares
}