import { columns, getColor, getSquare, ranks } from "../../variables.js"
import PossibleCaptureSquares from "./squares.js"

const pawnDirection1 = (color) => `${color === "white" ? "up" : "down"}-left`
const pawnDirection2 = (color) => `${color === "white" ? "up" : "down"}-right`

const pawnColumns = (column) =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 1 || i === columns.indexOf(column) + 1)

const pawnRanks = (rank, color) =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) + (color === "white" ? -1 : 1))

export default function PawnPossibleCaptures(piece) {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...PossibleCaptureSquares(square, pawnDirection1(color), pawnColumns(c), pawnRanks(r, color)),
        ...PossibleCaptureSquares(square, pawnDirection2(color), pawnColumns(c), pawnRanks(r, color)),
    ]

    return squares
}