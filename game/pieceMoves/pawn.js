import { getCaptures, getMoves, getPossibleCaptureSquares } from "./getAvailableSquares.js"
import { columns, getColor, getSquare, getSquareFromBoard, hasClass, isFirstMove, lastRound, ranks, setPassant } from "../variables.js"

/**
 * Returns the direction of pawn's move based on color
 * @param {string} color 
 * @returns {string}
 */
const pawnMoveDirection = color => color === "white" ? "up" : "down"

/**
 * Returns the first direction of pawn's capture based on color
 * @param {string} color 
 * @returns {string}
 */
const pawnCaptureDirection1 = color => `${color === "white" ? "up" : "down"}-left`

/**
 * Returns the second direction of pawn's capture based on color
 * @param {string} color 
 * @returns {string}
 */
const pawnCaptureDirection2 = color => `${color === "white" ? "up" : "down"}-right`

/**
 * Returns the ranks list of pawn to move
 * @param {string} rank 
 * @param {string} color 
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
const pawnMoveRanks = (rank, color, piece) => {
    let ranksList = color === "white"
        ? ranks.filter((r, i) => i <= ranks.indexOf(rank) && i >= ranks.indexOf(rank) - 2)
        : ranks.filter((r, i) => i >= ranks.indexOf(rank) && i <= ranks.indexOf(rank) + 2)

    if (!isFirstMove(piece)) {
        color === "white" && rank !== "7" && ranksList.shift()
        color === "black" && rank !== "2" && ranksList.pop()
    }

    return ranksList
}

/**
 * Returns the columns list of pawn to capture
 * @param {string} column 
 * @returns {string[]}
 */
const pawnCaptureColumns = column =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 1 || i === columns.indexOf(column) + 1)

/**
 * Returns the ranks list of pawn to capture
 * @param {string} rank 
 * @param {string} color 
 * @returns {string[]}
 */
const pawnCaptureRanks = (rank, color) =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) + (color === "white" ? -1 : 1))

/**
 * Returns the square capture en passant
 * @param {string} square 
 * @param {string} color 
 * @returns {string[]}
 */
const pawnPassantCaptures = (square, color) => {
    let capture = []

    if (lastRound()) {
        let { pieceType, pieceMove, squareDestination } = lastRound()

        if (hasClass(getSquareFromBoard(squareDestination), "passant")
            && hasClass(getSquareFromBoard(square), "passant")
            && pieceType === "pawn"
            && pieceMove === 1) {

            let [passantC, passantR] = squareDestination.split("")
            let [c, r] = square.split("")

            if (passantR === r && (columns.indexOf(c) === columns.indexOf(passantC) + 1 || columns.indexOf(c) === columns.indexOf(passantC) - 1)) {
                let rank = ranks[ranks.indexOf(passantR) + (color === "white" ? -1 : 1)]
                capture.push(passantC + rank)
                setPassant(true)
            }
        }
    }

    return capture
}

/**
 * Returns the list of pawn's available move squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const pawnMoves = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = getMoves(square, pawnMoveDirection(color), [], pawnMoveRanks(r, color, piece))

    return squares
}

/**
 * Returns the list of pawn's available capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const pawnCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    pawnPassantCaptures(square, color)

    let squares = [
        ...getCaptures(square, pawnCaptureDirection1(color), color, pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
        ...getCaptures(square, pawnCaptureDirection2(color), color, pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
        ...pawnPassantCaptures(square, color),
    ]

    return squares
}

/**
 * Returns the list of pawn's possible capture squares
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const pawnPossibleCaptures = piece => {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = [
        ...getPossibleCaptureSquares(square, pawnCaptureDirection1(color), color, pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
        ...getPossibleCaptureSquares(square, pawnCaptureDirection2(color), color, pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
    ]

    return squares
}