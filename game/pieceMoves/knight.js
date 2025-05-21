import { getCaptures, getMoves, getPossibleCaptureSquares } from "./getAvailableSquares.js"
import { columns, getColor, getSquare, ranks } from "../variables.js"

/**
 * Returns the list of ranks for knight movement
 * @param {string} rank 
 * @returns {string[]}
 */
const knightRanks1 = rank =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) - 1 || i === ranks.indexOf(rank) + 1)

/**
 * Returns the list of ranks for knight movement
 * @param {string} rank 
 * @returns {string[]}
 */
const knightRanks2 = rank =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) - 2 || i === ranks.indexOf(rank) + 2)

/**
 * Returns the list of columns for knight movement
 * @param {string} rank 
 * @returns {string[]}
 */
const knightColumns1 = column =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 1 || i === columns.indexOf(column) + 1)

/**
 * Returns the list of columns for knight movement
 * @param {string} rank 
 * @returns {string[]}
 */
const knightColumns2 = column =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 2 || i === columns.indexOf(column) + 2)

/**
 * Returns the list of knight's available move squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const knightMoves = piece => {
    let square = getSquare(piece)
    let [c, r] = square.split("")

    let squares = [
        ...getMoves(square, "up-left", knightColumns1(c), knightRanks2(r)),
        ...getMoves(square, "up-left", knightColumns2(c), knightRanks1(r)),

        ...getMoves(square, "up-right", knightColumns1(c), knightRanks2(r)),
        ...getMoves(square, "up-right", knightColumns2(c), knightRanks1(r)),

        ...getMoves(square, "down-right", knightColumns1(c), knightRanks2(r)),
        ...getMoves(square, "down-right", knightColumns2(c), knightRanks1(r)),

        ...getMoves(square, "down-left", knightColumns1(c), knightRanks2(r)),
        ...getMoves(square, "down-left", knightColumns2(c), knightRanks1(r)),
    ]

    return squares
}

/**
 * Returns the list of knight's available capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const knightCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...getCaptures(square, "up-left", color, knightColumns1(c), knightRanks2(r)),
        ...getCaptures(square, "up-left", color, knightColumns2(c), knightRanks1(r)),

        ...getCaptures(square, "up-right", color, knightColumns1(c), knightRanks2(r)),
        ...getCaptures(square, "up-right", color, knightColumns2(c), knightRanks1(r)),

        ...getCaptures(square, "down-right", color, knightColumns1(c), knightRanks2(r)),
        ...getCaptures(square, "down-right", color, knightColumns2(c), knightRanks1(r)),

        ...getCaptures(square, "down-left", color, knightColumns1(c), knightRanks2(r)),
        ...getCaptures(square, "down-left", color, knightColumns2(c), knightRanks1(r)),
    ]

    return squares
}

/**
 * Returns the list of knight's possible capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const knightPossibleCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...getPossibleCaptureSquares(square, "up-left", color, knightColumns1(c), knightRanks2(r)),
        ...getPossibleCaptureSquares(square, "up-left", color, knightColumns2(c), knightRanks1(r)),

        ...getPossibleCaptureSquares(square, "up-right", color, knightColumns1(c), knightRanks2(r)),
        ...getPossibleCaptureSquares(square, "up-right", color, knightColumns2(c), knightRanks1(r)),

        ...getPossibleCaptureSquares(square, "down-right", color, knightColumns1(c), knightRanks2(r)),
        ...getPossibleCaptureSquares(square, "down-right", color, knightColumns2(c), knightRanks1(r)),

        ...getPossibleCaptureSquares(square, "down-left", color, knightColumns1(c), knightRanks2(r)),
        ...getPossibleCaptureSquares(square, "down-left", color, knightColumns2(c), knightRanks1(r)),
    ]

    return squares
}