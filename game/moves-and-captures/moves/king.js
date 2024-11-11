import { PossibleCaptures } from "../../avaliable-moves.js"
import { columns, getColor, getPieceBySquare, getSquare, getType, isFirstMove, ranks, squareHasPiece } from "../../variables.js"
import MoveSquares from "./squares.js"

const kingColumns = (column, rank, piece) => {
    let castleQueenside = false
    let castleKingside = false

    for (let index = columns.indexOf(column) + 1; index < columns.length; index++) {
        if (squareHasPiece(columns[index] + rank)) {
            let pieceCastle = getPieceBySquare(columns[index] + rank)

            if (getType(pieceCastle) === "rook") {
                if (isFirstMove(piece) && isFirstMove(pieceCastle)) {
                    castleKingside = true
                }
            } else {
                break
            }
        }
    }

    for (let index = columns.indexOf(column) - 1; index >= 0; index--) {
        if (squareHasPiece(columns[index] + rank)) {
            let pieceCastle = getPieceBySquare(columns[index] + rank)

            if (getType(pieceCastle) === "rook") {
                if (isFirstMove(piece) && isFirstMove(pieceCastle)) {
                    castleQueenside = true
                }
            } else {
                break
            }
        }
    }

    return columns.filter((c, i) => i > columns.indexOf(column) - (castleQueenside ? 3 : 2) && i < columns.indexOf(column) + (castleKingside ? 3 : 2))
}

const kingRanks = (rank) => ranks.filter((r, i) => i > ranks.indexOf(rank) - 2 && i < ranks.indexOf(rank) + 2)

export default function KingMoves(piece) {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...MoveSquares(square, "up", [], kingRanks(r)),
        ...MoveSquares(square, "right", kingColumns(c, r, piece), []),
        ...MoveSquares(square, "down", [], kingRanks(r)),
        ...MoveSquares(square, "left", kingColumns(c, r, piece), []),

        ...MoveSquares(square, "up-left", kingColumns(c, r, piece), kingRanks(r)),
        ...MoveSquares(square, "up-right", kingColumns(c, r, piece), kingRanks(r)),
        ...MoveSquares(square, "down-right", kingColumns(c, r, piece), kingRanks(r)),
        ...MoveSquares(square, "down-left", kingColumns(c, r, piece), kingRanks(r)),
    ]

    let safeSquares = squares.filter(s => !PossibleCaptures(color).includes(s))
    
    return safeSquares

    return squares
}