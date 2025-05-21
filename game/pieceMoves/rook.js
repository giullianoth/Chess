import { getCaptures, getMoves, getPossibleCaptureSquares } from "./getAvailableSquares.js"
import { getColor, getPieceBySquare, getSquare, getType, squareHasPiece } from "../variables.js"
import { getColumn, getPin, getRank } from "../lines/getLines.js"

/**
 * Returns the list of rook's available move squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const rookMoves = piece => {
    let square = getSquare(piece)

    let squares = [
        ...getMoves(square, "up"),
        ...getMoves(square, "right"),
        ...getMoves(square, "down"),
        ...getMoves(square, "left"),
    ]

    return squares
}

/**
 * Returns the list of rook's available capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const rookCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)

    let squares = [
        ...getCaptures(square, "up", color),
        ...getCaptures(square, "right", color),
        ...getCaptures(square, "down", color),
        ...getCaptures(square, "left", color),
    ]

    return squares
}

/**
 * Returns the list of rook's possible capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const rookPossibleCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)

    let squares = [
        ...getPossibleCaptureSquares(square, "up", color),
        ...getPossibleCaptureSquares(square, "right", color),
        ...getPossibleCaptureSquares(square, "down", color),
        ...getPossibleCaptureSquares(square, "left", color),
    ]

    return squares
}

/**
 * Returns the list of squares if rook is in the same line of opponent king
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const rookPin = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")
    let column = getColumn(c)
    let rank = getRank(r)

    let squares = [
        ...getPin(column, square, color),
        ...getPin(rank, square, color),
    ]

    return squares
}

/**
 * Returns the entire line if rook is in the same line of opponent king
 * @param {HTMLElement} piece 
 * @param {HTMLElement} king 
 * @returns {string[]}
 */
export const rookLine = (piece, king) => {
    let square = getSquare(piece)
    let kingSquare = getSquare(king)
    let [c, r] = square.split("")

    let squares = [getColumn(c), getRank(r)]

    return squares.find(list => list.includes(kingSquare))
}