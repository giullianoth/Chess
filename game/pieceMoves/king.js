import { getCaptures, getMoves, getPossibleCaptureSquares } from "./getAvailableSquares.js"
import { columns, getColor, getPieceBySquare, getSquare, getType, isFirstMove, ranks, squareHasPiece } from "../variables.js"
import { getPossibleCaptures } from "../getAvailableMoves.js"

/**
 * Returns the list of ranks for king movement
 * @param {string} rank 
 * @returns {string[]}
 */
const kingRanks = rank => ranks.filter((r, i) => i > ranks.indexOf(rank) - 2 && i < ranks.indexOf(rank) + 2)

/**
 * Returns the list of columns for king movement
 * @param {string} rank 
 * @returns {string[]}
 */
const kingColumns = column => columns.filter((r, i) => i > columns.indexOf(column) - 2 && i < columns.indexOf(column) + 2)

/**
 * Returns the list of columns for king movement with castle feature
 * @param {string} column 
 * @param {string} rank 
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
const kingCastleColumns = (column, rank, piece) => {
    let castleQueenside = false
    let castleKingside = false

    for (let index = columns.indexOf(column) + 1; index < columns.length; index++) {
        if (getPossibleCaptures(getColor(piece)).includes(columns[index] + rank) && index <= columns.indexOf(column) + 2) {
            break
        }

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
        if (getPossibleCaptures(getColor(piece)).includes(columns[index] + rank) && index >= columns.indexOf(column) - 2) {
            break
        }

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

/**
 * Returns the list of king's available move squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const kingMoves = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...getMoves(square, "up-left", kingColumns(c), kingRanks(r)),
        ...getMoves(square, "up", [], kingRanks(r)),
        ...getMoves(square, "up-right", kingColumns(c), kingRanks(r)),
        ...getMoves(square, "right", kingCastleColumns(c, r, piece), []),
        ...getMoves(square, "down-right", kingColumns(c), kingRanks(r)),
        ...getMoves(square, "down", [], kingRanks(r)),
        ...getMoves(square, "down-left", kingColumns(c), kingRanks(r)),
        ...getMoves(square, "left", kingCastleColumns(c, r, piece), []),
    ]

    let safeSquares = squares.filter(s => !getPossibleCaptures(color).includes(s))
    return safeSquares
}

/**
 * Returns the list of king's available capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const kingCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...getCaptures(square, "up-left", color, kingColumns(c), kingRanks(r)),
        ...getCaptures(square, "up", color, [], kingRanks(r)),
        ...getCaptures(square, "up-right", color, kingColumns(c), kingRanks(r)),
        ...getCaptures(square, "right", color, kingColumns(c), []),
        ...getCaptures(square, "down-right", color, kingColumns(c), kingRanks(r)),
        ...getCaptures(square, "down", color, [], kingRanks(r)),
        ...getCaptures(square, "down-left", color, kingColumns(c), kingRanks(r)),
        ...getCaptures(square, "left", color, kingColumns(c), []),
    ]

    let safeSquares = squares.filter(s => !getPossibleCaptures(color).includes(s))
    return safeSquares
}

/**
 * Returns the list of king's possible capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const kingPossibleCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...getPossibleCaptureSquares(square, "up-left", color, kingColumns(c), kingRanks(r)),
        ...getPossibleCaptureSquares(square, "up", color, [], kingRanks(r)),
        ...getPossibleCaptureSquares(square, "up-right", color, kingColumns(c), kingRanks(r)),
        ...getPossibleCaptureSquares(square, "right", color, kingColumns(c), []),
        ...getPossibleCaptureSquares(square, "down-right", color, kingColumns(c), kingRanks(r)),
        ...getPossibleCaptureSquares(square, "down", color, [], kingRanks(r)),
        ...getPossibleCaptureSquares(square, "down-left", color, kingColumns(c), kingRanks(r)),
        ...getPossibleCaptureSquares(square, "left", color, kingColumns(c), []),
    ]

    return squares
}