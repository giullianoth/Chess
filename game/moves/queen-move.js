import { getSquare } from "../variables.js";
import { getCaptures, getMoves } from "./move-squares.js";

export default function QueenMove(piece) {
    let square = getSquare(piece)

    return {
        moves: [
            ...getMoves(square, "up"),
            ...getMoves(square, "down"),
            ...getMoves(square, "left"),
            ...getMoves(square, "right"),

            ...getMoves(square, "up-left"),
            ...getMoves(square, "up-right"),
            ...getMoves(square, "down-right"),
            ...getMoves(square, "down-left"),
        ],

        captures: [
            ...getCaptures(square, "up"),
            ...getCaptures(square, "down"),
            ...getCaptures(square, "left"),
            ...getCaptures(square, "right"),

            ...getCaptures(square, "up-left"),
            ...getCaptures(square, "up-right"),
            ...getCaptures(square, "down-right"),
            ...getCaptures(square, "down-left"),
        ]
    }
}