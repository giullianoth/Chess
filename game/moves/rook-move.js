import { getSquare } from "../variables.js";
import { getCaptures, getMoves } from "./move-squares.js";

export default function RookMove(piece) {
    let square = getSquare(piece)

    return {
        moves: [
            ...getMoves(square, "up"),
            ...getMoves(square, "down"),
            ...getMoves(square, "left"),
            ...getMoves(square, "right"),
        ],

        captures: [
            ...getCaptures(square, "up"),
            ...getCaptures(square, "down"),
            ...getCaptures(square, "left"),
            ...getCaptures(square, "right"),
        ]
    }
}