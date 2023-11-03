import { columns, getColor, getPieceBySquare, ranks, squareHasPiece, turn } from "../variables.js"

const moveUp = (square, ranksSet) => {
    let [c, r] = square.split("")
    return ranksSet.filter((rank, index) => index < ranksSet.indexOf(r)).map(rank => c + rank).reverse()
}

const moveDown = (square, ranksSet) => {
    let [c, r] = square.split("")
    return ranksSet.filter((rank, index) => index > ranksSet.indexOf(r)).map(rank => c + rank)
}

const moveLeft = (square, columnsSet) => {
    let [c, r] = square.split("")
    return columnsSet.filter((column, index) => index < columnsSet.indexOf(c)).map(column => column + r).reverse()
}

const moveRight = (square, columnsSet) => {
    let [c, r] = square.split("")
    return columnsSet.filter((column, index) => index > columnsSet.indexOf(c)).map(column => column + r)
}

export function getAllMoves(square, direction, columnsSet = columns, ranksSet = ranks) {
    let squares = []

    switch (direction) {
        case "up":
            squares = moveUp(square, ranksSet)
            break;

        case "down":
            squares = moveDown(square, ranksSet)
            break;

        case "left":
            squares = moveLeft(square, columnsSet)
            break;

        case "right":
            squares = moveRight(square, columnsSet)
            break;
    }

    return squares
}

export function getMoves(square, direction, columnsSet = columns, ranksSet = ranks) {
    let squares = getAllMoves(square, direction, columnsSet, ranksSet)
    let avaliableSquares = []

    if (squares.length) {
        for (let index = 0; index < squares.length; index++) {
            if (squareHasPiece(squares[index])) {
                break
            }

            avaliableSquares.push(squares[index])
        }
    }

    return avaliableSquares
}

export function getCaptures(square, direction, columnsSet = columns, ranksSet = ranks, colorToCompare = turn) {
    let squares = getAllMoves(square, direction, columnsSet, ranksSet)
    let avaliableSquares = []

    if (squares.length) {
        for (let index = 0; index < squares.length; index++) {
            if (squareHasPiece(squares[index])) {
                let pieceInSquare = getPieceBySquare(squares[index])
                getColor(pieceInSquare) !== colorToCompare && avaliableSquares.push(squares[index])
                break
            }
        }
    }

    return avaliableSquares
}