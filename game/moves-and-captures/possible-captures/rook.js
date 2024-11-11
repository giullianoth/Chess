import { getSquare } from "../../variables.js"
import PossibleCaptureSquares from "./squares.js"

export default function RookPossibleCaptures(piece) {
    let square = getSquare(piece)

    let squares = [
        ...PossibleCaptureSquares(square, "up"),
        ...PossibleCaptureSquares(square, "right"),
        ...PossibleCaptureSquares(square, "down"),
        ...PossibleCaptureSquares(square, "left"),
    ]

    return squares
}