import { columns, getSquare, ranks } from "../variables.js"
import { getCaptures, getMoves } from "./move-squares.js"

export const kingColumns = (column) => columns.filter((c, i) => i > columns.indexOf(column) - 2 && i < columns.indexOf(column) + 2)
export const kingRanks = (rank) => ranks.filter((r, i) => i > ranks.indexOf(rank) - 2 && i < ranks.indexOf(rank) + 2)

export default function KingMove(piece) {
    let square = getSquare(piece)
    let [c, r] = square.split("")

    return {
        moves: [
            ...getMoves(square, "up", [], kingRanks(r)),
            ...getMoves(square, "down", [], kingRanks(r)),
            ...getMoves(square, "left", kingColumns(c), []),
            ...getMoves(square, "right", kingColumns(c), []),

            ...getMoves(square, "up-left", kingColumns(c), kingRanks(r)),
            ...getMoves(square, "up-right", kingColumns(c), kingRanks(r)),
            ...getMoves(square, "down-right", kingColumns(c), kingRanks(r)),
            ...getMoves(square, "down-left", kingColumns(c), kingRanks(r)),
        ],

        captures: [
            ...getCaptures(square, "up", [], kingRanks(r)),
            ...getCaptures(square, "down", [], kingRanks(r)),
            ...getCaptures(square, "left", kingColumns(c), []),
            ...getCaptures(square, "right", kingColumns(c), []),

            ...getCaptures(square, "up-left", kingColumns(c), kingRanks(r)),
            ...getCaptures(square, "up-right", kingColumns(c), kingRanks(r)),
            ...getCaptures(square, "down-right", kingColumns(c), kingRanks(r)),
            ...getCaptures(square, "down-left", kingColumns(c), kingRanks(r)),
        ]
    }
}