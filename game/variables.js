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
export const getMoveSquares = () => normalArray(getElements(".move"))
export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
export const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()
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

// PIECES
export const getPieces = () => normalArray(getElements(".piece"))

// GAME OPERATIONS
export const setSquare = (element, square) => element.setAttribute("data-square", square)
export const setName = (element, name) => element.setAttribute("data-name", name)
export const setColor = (element, color) => element.setAttribute("data-color", color)
export const setType = (element, type) => element.setAttribute("data-type", type)
export const setMove = (element, move) => element.setAttribute("data-move", move)

export const getColor = (element) => element.dataset.color
export const getPieceType = (piece) => piece.dataset.type
export const getSquare = (element) => element.dataset.square

export const getPieceBySquare = (square) => getPieces().find(piece => getSquare(piece) === square)

// GAME FEATURES
export var turn = "white"