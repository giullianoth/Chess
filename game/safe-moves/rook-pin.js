import { getSquare } from "../variables.js"
import { getAllPinSquares, getPin } from "./pin-squares.js"

export function AllRookPin(piece) {
    let square = getSquare(piece)

    return [
        ...getAllPinSquares(square, "up"),
        ...getAllPinSquares(square, "down"),
        ...getAllPinSquares(square, "left"),
        ...getAllPinSquares(square, "right"),
    ]
}

export default function RookPin(piece) {
    let square = getSquare(piece)

    return [
        ...getPin(square, "up"),
        ...getPin(square, "down"),
        ...getPin(square, "left"),
        ...getPin(square, "right"),
    ]
}