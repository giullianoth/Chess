import { columns, gameHistory, getColor, getName, getPassantSquares, getPiecesByColor, getSquare, getType, opponentColor, ranks, roundPerMove, setPassant } from "../../variables.js"
import CaptureSquares from "./squares.js"

const pawnDirection1 = (color) => `${color === "white" ? "up" : "down"}-left`
const pawnDirection2 = (color) => `${color === "white" ? "up" : "down"}-right`

const pawnColumns = (column) =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 1 || i === columns.indexOf(column) + 1)

const pawnRanks = (rank, color) =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) + (color === "white" ? -1 : 1))

const passantCapture = (square, color) => {
    let capture = []
    let [c, r] = square.split("")

    if (gameHistory[roundPerMove - 2]) {
        let { piece_name } = gameHistory[roundPerMove - 2]

        if (getPassantSquares().some(s => getSquare(s) === square)) {
            let passantColumns = columns.filter((column, index) => index === columns.indexOf(c) - 1 || index === columns.indexOf(c) + 1)

            let passantPawn = getPiecesByColor(opponentColor(color)).find(piece =>
                passantColumns.some(column => getSquare(piece) === column + r)
                && getType(piece) === "pawn"
                && getName(piece) === piece_name)

            if (passantPawn) {
                let colPassant = getSquare(passantPawn).split("")[0]
                let rankPassant = r === "4" ? "3" : "6"
                
                capture.push(colPassant + rankPassant)
                setPassant()
            }
        }
    }

    return capture
}

export default function PawnCaptures(piece) {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...CaptureSquares(square, pawnDirection1(color), pawnColumns(c), pawnRanks(r, color)),
        ...CaptureSquares(square, pawnDirection2(color), pawnColumns(c), pawnRanks(r, color)),
        ...passantCapture(square, color)
    ]

    return squares
}