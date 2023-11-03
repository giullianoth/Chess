import { getSquare } from "../variables.js";
import { getCaptures, getMoves } from "./move-squares.js";

export default function BishopMove(piece) {
    let square = getSquare(piece)

    return {
        moves: [
            ...getMoves(square, "up-left"),
            ...getMoves(square, "up-right"),
            ...getMoves(square, "down-right"),
            ...getMoves(square, "down-left"),
        ],

        captures: [
            ...getCaptures(square, "up-left"),
            ...getCaptures(square, "up-right"),
            ...getCaptures(square, "down-right"),
            ...getCaptures(square, "down-left"),
        ]
    }
}