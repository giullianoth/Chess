import { getPin } from "../moves/move-squares.js";
import { getSquare } from "../variables.js";

export default function RookPin(piece) {
    let square = getSquare(piece)

    return [
        ...getPin(square, "up"),
        ...getPin(square, "down"),
        ...getPin(square, "left"),
        ...getPin(square, "right"),
    ]
}