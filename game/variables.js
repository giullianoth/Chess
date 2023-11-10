// DOM
export const getElement = (selector, parent = null) => (parent ?? document).querySelector(selector)
export const getElements = (selector, parent = null) => (parent ?? document).querySelectorAll(selector)

// ELEMENT CLASSES OPERATIONS
export const setStyle = (element, attribute, value) => element.style[attribute] = value
export const addClass = (element, className) => element.classList.add(className)
export const removeClass = (element, className) => element.classList.remove(className)
export const toggleClass = (element, className) => element.classList.toggle(className)
export const replaceClass = (element, currentClassName, newClassName) => element.classList.replace(currentClassName, newClassName)
export const hasClass = (element, className) => element.classList.contains(className)

// SOME OPERATIONS
export const isEven = (number) => number % 2 === 0
export const isOdd = (number) => !isEven(number)

export const normalArray = (array) => {
    let newArray = []
    array.forEach(item => newArray.push(item))
    return newArray
}

// BOARD
export const board = getElement(".board")
export const indicatorColumns = getElement(".indicator.columns", board)
export const indicatorRanks = getElement(".indicator.ranks", board)
export const boardDimension = () => board.offsetWidth || board.offsetHeight

// SQUARES AND COORDINATES
export const getSquares = () => normalArray(getElements(".square"))
export const getMoveSquares = () => normalArray(getElements(".move")) ?? []
export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
export const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()
export const squareDimension = () => boardDimension() / 8
export const findSquare = (square) => getSquares().find(s => getSquare(s) === square)

export const getCoordinateBySquare = (square) => {
    let [c, r] = square.split("")

    return {
        top: ranks.indexOf(r) * squareDimension(),
        left: columns.indexOf(c) * squareDimension()
    }
}

export const getSquareByCoordinate = (top, left) => columns[left / squareDimension()] + ranks[top / squareDimension()]
export const squareHasPiece = (square) => getPieces().some(piece => getSquare(piece) === square)

// PIECES
export const getPieces = () => normalArray(getElements(".piece"))
export const getPiecesByColor = (color) => getPieces().filter(piece => getColor(piece) === color)

// GAME OPERATIONS
export const setSquare = (element, square) => element.setAttribute("data-square", square)
export const setName = (element, name) => element.setAttribute("data-name", name)
export const setColor = (element, color) => element.setAttribute("data-color", color)
export const setType = (element, type) => element.setAttribute("data-type", type)
export const setMove = (element, move) => element.setAttribute("data-move", move)

export const getColor = (element) => element.dataset.color
export const getPieceType = (piece) => piece.dataset.type
export const getPieceName = (piece) => piece.dataset.name
export const getSquare = (element) => element.dataset.square
export const getPieceMove = (piece) => parseInt(piece.dataset.move)

export const getPieceBySquare = (square) => getPieces().find(piece => getSquare(piece) === square)
export const isFirstMove = (piece) => getPieceMove(piece) === 0

// GAME FEATURES
export var turn = "white"
export const swapTurn = () => turn = turn === "white" ? "black" : "white"

export var round = 1
export var roundPerMove = 1
export const incrementRound = () => round += 1
export const incrementRoundPerMove = () => roundPerMove += 1

export const isCastle = (piece, square) => getPieceType(piece) === "king" && isFirstMove(piece) && hasClass(findSquare(square), "castle")

export const isPromotion = (piece, rank) => getPieceType(piece) === "pawn" &&
    ((getColor(piece) === "white" && rank === "8") || (getColor(piece) === "black" && rank === "1"))

export const promotionList = () => getElement(".promotion")
export const promotionOptions = () => getElements(".piece", promotionList())

export var isPassant = false
export const setPassant = () => isPassant = true
export const unsetPassant = () => isPassant = false

export const movePiece = (piece, square) => {
    let { top, left } = getCoordinateBySquare(square)
    setSquare(piece, square)
    setMove(piece, getPieceMove(piece) + 1)
    setStyle(piece, "top", `${top}px`)
    setStyle(piece, "left", `${left}px`)
}

export const capturePiece = (piece) => {
    piece.remove()
}

export const gameHistory = []