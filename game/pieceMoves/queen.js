import { getCaptures, getMoves, getPossibleCaptureSquares } from "./getAvailableSquares.js"
import { getColor, getSquare } from "../variables.js"
import { getColumn, getDiagonal1, getDiagonal2, getPin, getRank } from "../lines/getLines.js"

/**
 * Returns the list of queen's available move squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const queenMoves = piece => {
    let square = getSquare(piece)

    let squares = [
        ...getMoves(square, "up-left"),
        ...getMoves(square, "up"),
        ...getMoves(square, "up-right"),
        ...getMoves(square, "right"),
        ...getMoves(square, "down-right"),
        ...getMoves(square, "down"),
        ...getMoves(square, "down-left"),
        ...getMoves(square, "left"),
    ]

    return squares
}

/**
 * Returns the list of queen's available capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const queenCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)

    let squares = [
        ...getCaptures(square, "up-left", color),
        ...getCaptures(square, "up", color),
        ...getCaptures(square, "up-right", color),
        ...getCaptures(square, "right", color),
        ...getCaptures(square, "down-right", color),
        ...getCaptures(square, "down", color),
        ...getCaptures(square, "down-left", color),
        ...getCaptures(square, "left", color),
    ]

    return squares
}

/**
 * Returns the list of queen's possible capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const queenPossibleCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)

    let squares = [
        ...getPossibleCaptureSquares(square, "up-left", color),
        ...getPossibleCaptureSquares(square, "up", color),
        ...getPossibleCaptureSquares(square, "up-right", color),
        ...getPossibleCaptureSquares(square, "right", color),
        ...getPossibleCaptureSquares(square, "down-right", color),
        ...getPossibleCaptureSquares(square, "down", color),
        ...getPossibleCaptureSquares(square, "down-left", color),
        ...getPossibleCaptureSquares(square, "left", color),
    ]

    return squares
}

/**
 * Returns the list of squares if queen is in the same line of opponent king
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const queenPin = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")
    let column = getColumn(c)
    let rank = getRank(r)
    let diagonal1 = getDiagonal1(square)
    let diagonal2 = getDiagonal2(square)

    let squares = [
        ...getPin(column, square, color),
        ...getPin(rank, square, color),
        ...getPin(diagonal1, square, color),
        ...getPin(diagonal2, square, color),
    ]

    return squares
}

/**
 * Returns the entire line if queen is in the same line of opponent king
 * @param {HTMLElement} piece 
 * @param {HTMLElement} king 
 * @returns {string[]}
 */
export const queenLine = (piece, king) => {
    let square = getSquare(piece)
    let kingSquare = getSquare(king)
    let [c, r] = square.split("")

    let squares = [getColumn(c), getRank(r), getDiagonal1(square), getDiagonal2(square)]

    return squares.find(list => list.includes(kingSquare))
}