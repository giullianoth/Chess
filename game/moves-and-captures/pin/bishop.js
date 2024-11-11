import { getSquare } from "../../variables.js"
import PinSquares from "./squares.js"

const directions = ["up-left", "up-right", "down-right", "down-left"]

export default function BishopPin(piece) {
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