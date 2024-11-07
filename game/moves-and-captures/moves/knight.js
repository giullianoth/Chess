import { columns, getSquare, ranks } from "../../variables.js"
import MoveSquares from "./squares.js"

const knightColumns1 = (column) =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 1 || i === columns.indexOf(column) + 1)

const knightColumns2 = (column) =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 2 || i === columns.indexOf(column) + 2)

const knightRanks1 = (rank) =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) - 1 || i === ranks.indexOf(rank) + 1)

const knightRanks2 = (rank) =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) - 2 || i === ranks.indexOf(rank) + 2)

export default function KnightMoves(piece) {
    let square = getSquare(piece)
    let [c, r] = square.split("")

    let squares = [
        ...MoveSquares(square, "up-left", knightColumns1(c), knightRanks2(r)),
        ...MoveSquares(square, "up-left", knightColumns2(c), knightRanks1(r)),

        ...MoveSquares(square, "up-right", knightColumns1(c), knightRanks2(r)),
        ...MoveSquares(square, "up-right", knightColumns2(c), knightRanks1(r)),

        ...MoveSquares(square, "down-right", knightColumns1(c), knightRanks2(r)),
        ...MoveSquares(square, "down-right", knightColumns2(c), knightRanks1(r)),

        ...MoveSquares(square, "down-left", knightColumns1(c), knightRanks2(r)),
        ...MoveSquares(square, "down-left", knightColumns2(c), knightRanks1(r)),
    ]

    return squares
}