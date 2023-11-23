import { getSquare } from "../variables.js"
import { getAllPinSquares, getPin } from "./pin-squares.js"

export function AllQueenPin(piece) {
    let square = getSquare(piece)

    return [
        ...getAllPinSquares(square, "up"),
        ...getAllPinSquares(square, "down"),
        ...getAllPinSquares(square, "left"),
        ...getAllPinSquares(square, "right"),

        ...getAllPinSquares(square, "up-left"),
        ...getAllPinSquares(square, "up-right"),
        ...getAllPinSquares(square, "down-right"),
        ...getAllPinSquares(square, "down-left"),
    ]
}

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