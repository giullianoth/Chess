import { getSquare } from "../../variables.js"
import PinSquares from "./squares.js"

const directions = ["up", "right", "down", "left", "up-left", "up-right", "down-right", "down-left"]

export default function QueenPin(piece) {
    let square = getSquare(piece)
    let squares = {}

    for (let index = 0; index < directions.length; index++) {
        squares = PinSquares(square, directions[index])

        if (Object.entries(squares).length) {
            break
        }
    }

    return squares
}