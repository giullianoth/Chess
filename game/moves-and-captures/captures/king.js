import { columns, getSquare, ranks } from "../../variables.js"
import CaptureSquares from "./squares.js"

const kingColumns = (column) => columns.filter((c, i) => i > columns.indexOf(column) - 2 && i < columns.indexOf(column) + 2)
const kingRanks = (rank) => ranks.filter((r, i) => i > ranks.indexOf(rank) - 2 && i < ranks.indexOf(rank) + 2)

export default function KingCaptures(piece) {
    let square = getSquare(piece)
    let [c, r] = square.split("")

    let squares = [
        ...CaptureSquares(square, "up", [], kingRanks(r)),
        ...CaptureSquares(square, "right", kingColumns(c), []),
        ...CaptureSquares(square, "down", [], kingRanks(r)),
        ...CaptureSquares(square, "left", kingColumns(c), []),
        
        ...CaptureSquares(square, "up-left", kingColumns(c), kingRanks(r)),
        ...CaptureSquares(square, "up-right", kingColumns(c), kingRanks(r)),
        ...CaptureSquares(square, "down-right", kingColumns(c), kingRanks(r)),
        ...CaptureSquares(square, "down-left", kingColumns(c), kingRanks(r)),
    ]

    return squares
}