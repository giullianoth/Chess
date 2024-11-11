import { getSquare } from "../../variables.js"
import PossibleCaptureSquares from "./squares.js"
import CaptureSquares from "./squares.js"

export default function QueenPossibleCaptures(piece) {
    let square = getSquare(piece)

    let squares = [
        ...PossibleCaptureSquares(square, "up"),
        ...PossibleCaptureSquares(square, "right"),
        ...PossibleCaptureSquares(square, "down"),
        ...PossibleCaptureSquares(square, "left"),

        ...PossibleCaptureSquares(square, "up-left"),
        ...PossibleCaptureSquares(square, "up-right"),
        ...PossibleCaptureSquares(square, "down-right"),
        ...PossibleCaptureSquares(square, "down-left"),
    ]

    return squares
}