import { getSquare } from "../../variables.js"
import PossibleCaptureSquares from "./squares.js"

export default function BishopPossibleCaptures(piece) {
    let square = getSquare(piece)

    let squares = [
        ...PossibleCaptureSquares(square, "up-left"),
        ...PossibleCaptureSquares(square, "up-right"),
        ...PossibleCaptureSquares(square, "down-right"),
        ...PossibleCaptureSquares(square, "down-left"),
    ]

    return squares
}