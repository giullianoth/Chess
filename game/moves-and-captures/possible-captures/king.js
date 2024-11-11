import { columns, getColor, getSquare, ranks } from "../../variables.js"
import PossibleCaptureSquares from "./squares.js"

const kingColumns = (column) => columns.filter((c, i) => i > columns.indexOf(column) - 2 && i < columns.indexOf(column) + 2)
const kingRanks = (rank) => ranks.filter((r, i) => i > ranks.indexOf(rank) - 2 && i < ranks.indexOf(rank) + 2)

export default function KingPossibleCaptures(piece) {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...PossibleCaptureSquares(square, "up", [], kingRanks(r)),
        ...PossibleCaptureSquares(square, "right", kingColumns(c), []),
        ...PossibleCaptureSquares(square, "down", [], kingRanks(r)),
        ...PossibleCaptureSquares(square, "left", kingColumns(c), []),
        
        ...PossibleCaptureSquares(square, "up-left", kingColumns(c), kingRanks(r)),
        ...PossibleCaptureSquares(square, "up-right", kingColumns(c), kingRanks(r)),
        ...PossibleCaptureSquares(square, "down-right", kingColumns(c), kingRanks(r)),
        ...PossibleCaptureSquares(square, "down-left", kingColumns(c), kingRanks(r)),
    ]

    return squares
}