import { columns, getSquare, ranks } from "../variables.js";
import { getAllMoves, getCaptures, getMoves } from "./move-squares.js";

export const knightColumns1 = (column) =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 1 || i === columns.indexOf(column) + 1)

export const knightColumns2 = (column) =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 2 || i === columns.indexOf(column) + 2)

export const knightRanks1 = (rank) =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) - 1 || i === ranks.indexOf(rank) + 1)

export const knightRanks2 = (rank) =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) - 2 || i === ranks.indexOf(rank) + 2)

export default function KnightMove(piece) {
    let square = getSquare(piece)
    let [c, r] = square.split("")

    return {
        moves: [
            ...getMoves(square, "up-left", knightColumns1(c), knightRanks2(r)),
            ...getMoves(square, "up-left", knightColumns2(c), knightRanks1(r)),

            ...getMoves(square, "up-right", knightColumns1(c), knightRanks2(r)),
            ...getMoves(square, "up-right", knightColumns2(c), knightRanks1(r)),

            ...getMoves(square, "down-right", knightColumns1(c), knightRanks2(r)),
            ...getMoves(square, "down-right", knightColumns2(c), knightRanks1(r)),

            ...getMoves(square, "down-left", knightColumns1(c), knightRanks2(r)),
            ...getMoves(square, "down-left", knightColumns2(c), knightRanks1(r)),
        ],

        captures: [
            ...getCaptures(square, "up-left", knightColumns1(c), knightRanks2(r)),
            ...getCaptures(square, "up-left", knightColumns2(c), knightRanks1(r)),

            ...getCaptures(square, "up-right", knightColumns1(c), knightRanks2(r)),
            ...getCaptures(square, "up-right", knightColumns2(c), knightRanks1(r)),

            ...getCaptures(square, "down-right", knightColumns1(c), knightRanks2(r)),
            ...getCaptures(square, "down-right", knightColumns2(c), knightRanks1(r)),

            ...getCaptures(square, "down-left", knightColumns1(c), knightRanks2(r)),
            ...getCaptures(square, "down-left", knightColumns2(c), knightRanks1(r)),
        ]
    }
}