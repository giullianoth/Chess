import { getCaptures, getMoves, getPossibleCaptureSquares } from "./getAvailableSquares.js"
import { getColor, getSquare } from "../variables.js"
import { getDiagonal1, getDiagonal2, getPin } from "../lines/getLines.js"

/**
 * Returns the list of bishop's available move squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const bishopMoves = piece => {
    let square = getSquare(piece)

    let squares = [
        ...getMoves(square, "up-left"),
        ...getMoves(square, "up-right"),
        ...getMoves(square, "down-right"),
        ...getMoves(square, "down-left"),
    ]

    return squares
}

/**
 * Returns the list of bishop's available capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const bishopCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)

    let squares = [
        ...getCaptures(square, "up-left", color),
        ...getCaptures(square, "up-right", color),
        ...getCaptures(square, "down-right", color),
        ...getCaptures(square, "down-left", color),
    ]

    return squares
}

/**
 * Returns the list of bishop's possible capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const bishopPossibleCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)

    let squares = [
        ...getPossibleCaptureSquares(square, "up-left", color),
        ...getPossibleCaptureSquares(square, "up-right", color),
        ...getPossibleCaptureSquares(square, "down-right", color),
        ...getPossibleCaptureSquares(square, "down-left", color),
    ]

    return squares
}

/**
 * Returns the list of squares if bishop is in the same line of opponent king
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const bishopPin = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let diagonal1 = getDiagonal1(square)
    let diagonal2 = getDiagonal2(square)

    let squares = [
        ...getPin(diagonal1, square, color),
        ...getPin(diagonal2, square, color),
    ]

    return squares
}

/**
 * Returns the entire line if bishop is in the same line of opponent king
 * @param {HTMLElement} piece 
 * @param {HTMLElement} king 
 * @returns {string[]}
 */
export const bishopLine = (piece, king) => {
    let square = getSquare(piece)
    let kingSquare = getSquare(king)

    let squares = [getDiagonal1(square), getDiagonal2(square)]

    return squares.find(list => list.includes(kingSquare))
}