import { getSquare } from "../variables.js";
import { getAllPinSquares, getPin } from "./pin-squares.js";

export function AllBishopPin(piece) {
    let square = getSquare(piece)

    return [
        ...getAllPinSquares(square, "up-left"),
        ...getAllPinSquares(square, "up-right"),
        ...getAllPinSquares(square, "down-right"),
        ...getAllPinSquares(square, "down-left"),
    ]
}

export default function BishopPin(piece) {
    let square = getSquare(piece)

    return [
        ...getPin(square, "up-left"),
        ...getPin(square, "up-right"),
        ...getPin(square, "down-right"),
        ...getPin(square, "down-left"),
    ]
}