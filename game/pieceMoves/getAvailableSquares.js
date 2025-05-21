import { columns, getColor, getPieceBySquare, ranks, squareHasPiece, turn } from "../variables.js";

/**
 * Returns the list of squares to move up
 * @param {string} square 
 * @param {string[]} ranksSet 
 * @returns {string[]}
 */
const moveUp = (square, ranksSet) => {
    let [c, r] = square.split("")
    return ranksSet.filter((rank, index) => index < ranksSet.indexOf(r)).map(rank => c + rank).reverse()
}

/**
 * Returns the list of squares to move down
 * @param {string} square 
 * @param {string[]} ranksSet 
 * @returns {string[]}
 */
const moveDown = (square, ranksSet) => {
    let [c, r] = square.split("")
    return ranksSet.filter((rank, index) => index > ranksSet.indexOf(r)).map(rank => c + rank)
}

/**
  * Returns the list of squares to move left
  * @param {string} square 
  * @param {string[]} columnsSet 
  * @returns {string[]}
  */
const moveLeft = (square, columnsSet) => {
    let [c, r] = square.split("")
    return columnsSet.filter((column, index) => index < columnsSet.indexOf(c)).map(column => column + r).reverse()
}

/**
  * Returns the list of squares to move right
  * @param {string} square 
  * @param {string[]} columnsSet 
  * @returns {string[]}
  */
const moveRight = (square, columnsSet) => {
    let [c, r] = square.split("")
    return columnsSet.filter((column, index) => index > columnsSet.indexOf(c)).map(column => column + r)
}

/**
 * Returns the list of squares to move up-left
 * @param {string} square 
 * @param {string[]} columnsSet 
 * @param {string[]} ranksSet 
 * @returns {string[]}
 */
const moveUpLeft = (square, columnsSet, ranksSet) => {
    let [c, r] = square.split("")
    columnsSet = columnsSet.filter((column, index) => index < columnsSet.indexOf(c)).reverse()
    ranksSet = ranksSet.filter((rank, index) => index < ranksSet.indexOf(r)).reverse()

    if (columnsSet.length > ranksSet.length) {
        return columnsSet.filter((column, index) => index < ranksSet.length)
            .map((column, index) => column + ranksSet[index])
    }

    if (ranksSet.length > columnsSet.length) {
        return ranksSet.filter((rank, index) => index < columnsSet.length)
            .map((rank, index) => columnsSet[index] + rank)
    }

    return columnsSet.map((column, index) => column + ranksSet[index])
}

/**
 * Returns the list of squares to move up-right
 * @param {string} square 
 * @param {string[]} columnsSet 
 * @param {string[]} ranksSet 
 * @returns {string[]}
 */
const moveUpRight = (square, columnsSet, ranksSet) => {
    let [c, r] = square.split("")
    columnsSet = columnsSet.filter((column, index) => index > columnsSet.indexOf(c))
    ranksSet = ranksSet.filter((rank, index) => index < ranksSet.indexOf(r)).reverse()

    if (columnsSet.length > ranksSet.length) {
        return columnsSet.filter((column, index) => index < ranksSet.length)
            .map((column, index) => column + ranksSet[index])
    }

    if (ranksSet.length > columnsSet.length) {
        return ranksSet.filter((rank, index) => index < columnsSet.length)
            .map((rank, index) => columnsSet[index] + rank)
    }

    return columnsSet.map((column, index) => column + ranksSet[index])
}

/**
 * Returns the list of squares to move down-right
 * @param {string} square 
 * @param {string[]} columnsSet 
 * @param {string[]} ranksSet 
 * @returns {string[]}
 */
const moveDownRight = (square, columnsSet, ranksSet) => {
    let [c, r] = square.split("")
    columnsSet = columnsSet.filter((column, index) => index > columnsSet.indexOf(c))
    ranksSet = ranksSet.filter((rank, index) => index > ranksSet.indexOf(r))

    if (columnsSet.length > ranksSet.length) {
        return columnsSet.filter((column, index) => index < ranksSet.length)
            .map((column, index) => column + ranksSet[index])
    }

    if (ranksSet.length > columnsSet.length) {
        return ranksSet.filter((rank, index) => index < columnsSet.length)
            .map((rank, index) => columnsSet[index] + rank)
    }

    return columnsSet.map((column, index) => column + ranksSet[index])
}

/**
 * Returns the list of squares to move down-left
 * @param {string} square 
 * @param {string[]} columnsSet 
 * @param {string[]} ranksSet 
 * @returns {string[]}
 */
const moveDownLeft = (square, columnsSet, ranksSet) => {
    let [c, r] = square.split("")
    columnsSet = columnsSet.filter((column, index) => index < columnsSet.indexOf(c)).reverse()
    ranksSet = ranksSet.filter((rank, index) => index > ranksSet.indexOf(r))

    if (columnsSet.length > ranksSet.length) {
        return columnsSet.filter((column, index) => index < ranksSet.length)
            .map((column, index) => column + ranksSet[index])
    }

    if (ranksSet.length > columnsSet.length) {
        return ranksSet.filter((rank, index) => index < columnsSet.length)
            .map((rank, index) => columnsSet[index] + rank)
    }

    return columnsSet.map((column, index) => column + ranksSet[index])
}

/**
 * Returns the list of all move squares for the piece movement
 * @param {string} square 
 * @param {string} direction 
 * @param {string[]} columnsSet 
 * @param {string[]} ranksSet 
 * @returns {string[]}
 */
export const getAllAvailableSquares = (square, direction, columnsSet = columns, ranksSet = ranks) => {
    let squares = []

    switch (direction) {
        case "up":
            squares = moveUp(square, ranksSet)
            break;

        case "right":
            squares = moveRight(square, columnsSet)
            break;

        case "down":
            squares = moveDown(square, ranksSet)
            break;

        case "left":
            squares = moveLeft(square, columnsSet)
            break;

        case "up-left":
            squares = moveUpLeft(square, columnsSet, ranksSet)
            break;

        case "up-right":
            squares = moveUpRight(square, columnsSet, ranksSet)
            break;

        case "down-right":
            squares = moveDownRight(square, columnsSet, ranksSet)
            break;

        case "down-left":
            squares = moveDownLeft(square, columnsSet, ranksSet)
            break;
    }

    return squares
}

/**
 * Returns the list of available move squares for the piece movement
 * @param {string} square 
 * @param {string} direction 
 * @param {string[]} columnsSet 
 * @param {string[]} ranksSet 
 * @returns {string[]}
 */
export const getMoves = (square, direction, columnsSet = columns, ranksSet = ranks) => {
    let squares = getAllAvailableSquares(square, direction, columnsSet, ranksSet)
    let availableSquares = []

    if (squares.length) {
        for (let index = 0; index < squares.length; index++) {
            if (squareHasPiece(squares[index])) {
                break
            }
            availableSquares.push(squares[index])
        }
    }

    return availableSquares
}

/**
 * Returns the list of available capture squares for the piece movement
 * @param {string} square 
 * @param {string} direction 
 * @param {string} color 
 * @param {string[]} columnsSet 
 * @param {string[]} ranksSet 
 * @returns {string[]}
 */
export const getCaptures = (square, direction, color = turn, columnsSet = columns, ranksSet = ranks) => {
    let squares = getAllAvailableSquares(square, direction, columnsSet, ranksSet)
    let availableSquares = []

    if (squares.length) {
        for (let index = 0; index < squares.length; index++) {
            if (squareHasPiece(squares[index])) {
                let pieceInSquare = getPieceBySquare(squares[index])

                if (getColor(pieceInSquare) !== color) {
                    availableSquares.push(squares[index])
                }

                break
            }
        }
    }

    return availableSquares
}

export const getPossibleCaptureSquares = (square, direction, color = turn, columnsSet = columns, ranksSet = ranks) => {
    let squares = getAllAvailableSquares(square, direction, columnsSet, ranksSet)
    let availableSquares = []

    if (squares.length) {
        for (let index = 0; index < squares.length; index++) {
            if (squareHasPiece(squares[index])) {
                let pieceInSquare = getPieceBySquare(squares[index])

                if (getColor(pieceInSquare) === color) {
                    availableSquares.push(squares[index])
                }

                break
            }

            availableSquares.push(squares[index])
        }
    }

    return availableSquares
}