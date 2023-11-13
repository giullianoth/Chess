import { getSquare } from "../variables.js"
import { getPin } from "./pin-squares.js"

export default function RookPin(piece) {
    let square = getSquare(piece)

    return [
        ...getPin(square, "up"),
        ...getPin(square, "down"),
        ...getPin(square, "left"),
        ...getPin(square, "right"),
    ]
}