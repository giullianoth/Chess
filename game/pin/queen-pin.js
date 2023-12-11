import { getPin } from "../moves/move-squares.js";
import { getSquare } from "../variables.js";

export default function QueenPin(piece) {
    let square = getSquare(piece)

    return [
        ...getPin(square, "up"),
        ...getPin(square, "down"),
        ...getPin(square, "left"),
        ...getPin(square, "right"),

        ...getPin(square, "up-left"),
        ...getPin(square, "up-right"),
        ...getPin(square, "down-right"),
        ...getPin(square, "down-left"),
    ]
}