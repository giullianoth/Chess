import { check, columns, getPieceBySquare, getPieceType, getSquare, isFirstMove, ranks, squareHasPiece } from "../variables.js"
import { getCaptures, getMoves } from "./move-squares.js"

export const kingColumns = (column, rank, piece) => {
    let castleQueenside = false
    let castleKingside = false

    if (!check) {
        for (let index = columns.indexOf(column) + 1; index < columns.length; index++) {
            if (squareHasPiece(columns[index] + rank)) {
                let pieceCastle = getPieceBySquare(columns[index] + rank)
    
                if (getPieceType(pieceCastle) === "rook") {
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
    
                if (getPieceType(pieceCastle) === "rook") {
                    if (isFirstMove(piece) && isFirstMove(pieceCastle)) {
                        castleQueenside = true
                    }
                } else {
                    break
                }
            }
        }
    }

    return columns.filter((c, i) => i > columns.indexOf(column) - (castleQueenside ? 3 : 2) && i < columns.indexOf(column) + (castleKingside ? 3 : 2))
}

export const kingRanks = (rank) => ranks.filter((r, i) => i > ranks.indexOf(rank) - 2 && i < ranks.indexOf(rank) + 2)

export default function KingMove(piece) {
    let square = getSquare(piece)
    let [c, r] = square.split("")

    return {
        moves: [
            ...getMoves(square, "up", [], kingRanks(r)),
            ...getMoves(square, "down", [], kingRanks(r)),
            ...getMoves(square, "left", kingColumns(c, r, piece), []),
            ...getMoves(square, "right", kingColumns(c, r, piece), []),

            ...getMoves(square, "up-left", kingColumns(c, r, piece), kingRanks(r)),
            ...getMoves(square, "up-right", kingColumns(c, r, piece), kingRanks(r)),
            ...getMoves(square, "down-right", kingColumns(c, r, piece), kingRanks(r)),
            ...getMoves(square, "down-left", kingColumns(c, r, piece), kingRanks(r)),
        ],

        captures: [
            ...getCaptures(square, "up", [], kingRanks(r)),
            ...getCaptures(square, "down", [], kingRanks(r)),
            ...getCaptures(square, "left", kingColumns(c, r, piece), []),
            ...getCaptures(square, "right", kingColumns(c, r, piece), []),

            ...getCaptures(square, "up-left", kingColumns(c, r, piece), kingRanks(r)),
            ...getCaptures(square, "up-right", kingColumns(c, r, piece), kingRanks(r)),
            ...getCaptures(square, "down-right", kingColumns(c, r, piece), kingRanks(r)),
            ...getCaptures(square, "down-left", kingColumns(c, r, piece), kingRanks(r)),
        ]
    }
}