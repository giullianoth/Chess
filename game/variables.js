// DOM
export const getElement = (selector, parentElement = null) => (parentElement ?? document).querySelector(selector)
export const getElements = (selector, parentElement = null) => [...(parentElement ?? document).querySelectorAll(selector)]

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// CSS CLASSES
export const setStyle = (element, attribute, value) => element.style[attribute] = value
export const addClass = (element, className) => element.classList.add(className)
export const removeClass = (element, className) => element.classList.remove(className)
export const toggleClass = (element, className) => element.classList.toggle(className)
export const replaceClass = (element, currentClassName, newClassName) => element.classList.replace(currentClassName, newClassName)
export const hasClass = (element, className) => element.classList.contains(className)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// SOME OPERATIONS
export const isEven = (num) => num % 2 === 0
export const isOdd = (num) => !isEven(num)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// BOARD
export const board = getElement(".board")
export const indicatorColumns = getElement(".indicator.columns", board)
export const indicatorRanks = getElement(".indicator.ranks", board)
export const boardDimension = () => board.offsetWidth || board.offsetHeight
export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
export const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// SQUARES
export const getAllSquares = () => getElements(".square")
export const getMoveSquares = () => getElements(".move") ?? null
export const squareDimension = () => boardDimension() / 8

export const getCoordinateBySquare = (square) => {
    let [c, r] = square.split("")

    return {
        top: ranks.indexOf(r) * squareDimension(),
        left: columns.indexOf(c) * squareDimension()
    }
}

export const getSquareByCoordinate = (top, left) => columns[left / squareDimension()] + ranks[top / squareDimension()]

export const squareHasPiece = (square) => getPieces().some(piece => getSquare(piece) === square)
export const getPromotionSquares = () => getAllSquares().filter(square => hasClass(square, "promotion-square"))
export const getCastleSquares = () => getAllSquares().filter(square => hasClass(square, "castle"))
export const getPassantSquares = () => getAllSquares().filter(square => hasClass(square, "passant"))

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// PIECES
export const getPieces = () => getElements(".piece")
export const getPiecesByColor = (color = turn) => getPieces().filter(piece => getColor(piece) === color)

export const setColor = (element, color) => element.setAttribute("data-color", color)
export const setMove = (element, move) => element.setAttribute("data-move", move)
export const setName = (element, name) => element.setAttribute("data-name", name)
export const setSquare = (element, square) => element.setAttribute("data-square", square)
export const setType = (element, type) => element.setAttribute("data-type", type)

export const getColor = (element) => element.dataset.color
export const getType = (element) => element.dataset.type
export const getName = (element) => element.dataset.name
export const getSquare = (element) => element.dataset.square
export const getPieceMove = (element) => parseInt(element.dataset.move)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// GAME FEATURES
export var turn = "white"
export const swapTurn = () => turn = turn === "white" ? "black" : "white"
export const opponentColor = (color = turn) => color === "white" ? "black" : "white"

export var round = 1
export var roundPerMove = 1
export const incrementRound = () => round += 1
export const incrementRoundPerMove = () => roundPerMove += 1

export const isFirstMove = (piece) => getPieceMove(piece) === 0
export const getPieceBySquare = (square) => getPieces().find(piece => getSquare(piece) === square) ?? null

export const movePiece = (piece, square) => {
    let { top, left } = getCoordinateBySquare(square)
    setSquare(piece, square)
    setMove(piece, getPieceMove(piece) + 1)
    setStyle(piece, "top", `${top}px`)
    setStyle(piece, "left", `${left}px`)
}

export const capturePiece = (piece) => piece.remove()
export const promotionList = () => getElement(".promotion")
export const promotionOptions = () => getElements(".piece", promotionList())

export var isPassant = false
export const setPassant = () => isPassant = true
export const unsetPassant = () => isPassant = false

export const gameHistory = []