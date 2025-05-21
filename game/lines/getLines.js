import { getAllAvailableSquares } from "../pieceMoves/getAvailableSquares.js";
import { getColor, getPieceBySquare, getSquare, getType, squareHasPiece } from "../variables.js";

/**
 * Returns the list of squares from a specified column
 * @param {string} column 
 * @returns {string[]}
 */
export const getColumn = column => [column + "1", ...getAllAvailableSquares(column + "1", "up")]

/**
 * Returns the list of squares from a specified rank
 * @param {string} rank 
 * @returns {string[]}
 */
export const getRank = rank => ["a" + rank, ...getAllAvailableSquares("a" + rank, "right")]

/**
 * Returns the list of squares from up-right diagonal based on a specified square
 * @param {string} square 
 * @returns {string[]}
 */
export const getDiagonal1 = square => {
    let diagonal = [
        square,
        ...getAllAvailableSquares(square, "up-right"),
        ...getAllAvailableSquares(square, "down-left"),
    ]

    return diagonal.sort()
}

/**
 * Returns the list of squares from down-right diagonal based on a specified square
 * @param {string} square 
 * @returns {string[]}
 */
export const getDiagonal2 = square => {
    let diagonal = [
        square,
        ...getAllAvailableSquares(square, "down-right"),
        ...getAllAvailableSquares(square, "up-left"),
    ]

    return diagonal.sort()
}

/**
 * Returns the list of squares of a piece if it's in the same line of opponent king
 * @param {string[]} line 
 * @param {string} square 
 * @param {string} color 
 * @returns {string[]}
 */
export const getPin = (line, square, color) => {
    let squares = []

    if (line.some(s => squareHasPiece(s) && getType(getPieceBySquare(s)) === "king" && getColor(getPieceBySquare(s)) !== color)) {
        let king = getPieceBySquare(line.find(s => squareHasPiece(s) && getType(getPieceBySquare(s)) === "king" && getColor(getPieceBySquare(s)) !== color))

        if (king) {
            let kingSquare = getSquare(king)

            squares = line.filter((s, i) => line.indexOf(square) > line.indexOf(kingSquare)
                ? i <= line.indexOf(square) && i >= line.indexOf(kingSquare)
                : i >= line.indexOf(square) && i <= line.indexOf(kingSquare))
        }
    }

    return squares
}