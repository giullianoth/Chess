// DOM

/**
 * Returns an element from DOM
 * @param {string} selector 
 * @param {HTMLElement | null} parentElement 
 * @returns {HTMLElement | undefined}
 */
export const getElement = (selector, parentElement = null) => (parentElement ?? document).querySelector(selector)

/**
 * Returns a list of elements from DOM
 * @param {string} selector 
 * @param {HTMLElement | null} parentElement 
 * @returns {HTMLElement[] | undefined}
 */
export const getElements = (selector, parentElement = null) => [...(parentElement ?? document).querySelectorAll(selector)]

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// CSS CLASSES

/**
 * Sets a CSS style to an element
 * @param {HTMLElement} element 
 * @param {string} attribute 
 * @param {string} value 
 * @returns {void}
 */
export const setStyle = (element, attribute, value) => element.style[attribute] = value

/**
 * Adds a CSS class name to an element
 * @param {HTMLElement} element 
 * @param {string} className 
 * @returns {void}
 */
export const addClass = (element, className) => element.classList.add(className)

/**
 * Removes a CSS class name from an element
 * @param {HTMLElement} element 
 * @param {string} className 
 * @returns {void}
 */
export const removeClass = (element, className) => element.classList.remove(className)

/**
 * Toggles a CSS class name in an element
 * @param {HTMLElement} element 
 * @param {string} className 
 * @returns {void}
 */
export const toggleClass = (element, className) => element.classList.toggle(className)

/**
 * Replaces a CSS class name to another in an element
 * @param {HTMLElement} element 
 * @param {string} currentClassName 
 * @param {string} newClassName 
 * @returns {void}
 */
export const replaceClass = (element, currentClassName, newClassName) => element.classList.replace(currentClassName, newClassName)

/**
 * Verifies if an element has a specified CSS class name
 * @param {HTMLElement} element 
 * @param {string} className 
 * @returns {boolean}
 */
export const hasClass = (element, className) => element.classList.contains(className)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// SOME OPERATIONS

/**
 * Verifies if a specified number is even
 * @param {number} num 
 * @returns {boolean}
 */
export const isEven = (num) => num % 2 === 0

/**
 * Verifies if a specified number is odd
 * @param {number} num 
 * @returns {boolean}
 */
export const isOdd = (num) => !isEven(num)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// BOARD

/**
 * Returns the board element
 */
export const board = getElement(".board")

/**
 * Returns the columns indicator from board
 */
export const indicatorColumns = getElement(".indicator.columns", board)

/**
 * Returns the ranks indicator from board
 */
export const indicatorRanks = getElement(".indicator.ranks", board)

/**
 * Returns the list of columns
 */
export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]

/**
 * Returns the list of ranks
 */
export const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()

/**
 * Returns the dimension (width and height) of the board, in pixels
 * @returns {number}
 */
export const boardDimension = () => board.offsetWidth || board.offsetHeight

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// SQUARES

/**
 * Returns all square elements from board
 * @returns {HTMLDivElement[]}
 */
export const getSquaresFromBoard = () => getElements(".square")

/**
 * Returns a square element from board
 * @param {string} square 
 * @returns {HTMLDivElement}
 */
export const getSquareFromBoard = square => getSquaresFromBoard().find(s => square === getSquare(s))

/**
 * Returns the list of available movement squares from a piece
 * @returns {HTMLDivElement[] | null}
 */
export const getMoveSquares = () => getElements(".move") ?? null

/**
 * Returns the dimension (width and height) of a square, in pixels
 * @returns {number}
 */
export const squareDimension = () => boardDimension() / 8


/**
 * Returns the top and left coordinates, in pixels, from a specified square
 * @param {string} square 
 * @returns {{top: number, left: number}}
 */
export const getCoordinateBySquare = (square) => {
    let [c, r] = square.split("")

    return {
        top: ranks.indexOf(r) * squareDimension(),
        left: columns.indexOf(c) * squareDimension()
    }
}

/**
 * Check if a specified square has a piece in
 * @param {string} square 
 * @returns {boolean}
 */
export const squareHasPiece = square => getPieces().some(piece => getSquare(piece) === square)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// PIECES

/**
 * Returns all pieces in the board
 * @returns {HTMLElement[]}
 */
export const getPieces = () => getElements(".piece")

/**
 * Returns the pieces of a specified color
 * @param {string} color 
 * @returns {HTMLElement[]}
 */
export const getPiecesByColor = (color = turn) => getPieces().filter(piece => getColor(piece) === color)

/**
 * Sets the square in a HTML data attribute of an element
 * @param {HTMLElement} element 
 * @param {string} square 
 * @returns {void}
 */
export const setSquare = (element, square) => element.setAttribute("data-square", square)

/**
 * Sets the color in a HTML data attribute of an element
 * @param {HTMLElement} element 
 * @param {string} color 
 * @returns {void}
 */
export const setColor = (element, color) => element.setAttribute("data-color", color)

/**
 * Sets the move in a HTML data attribute of an element
 * @param {HTMLElement} element 
 * @param {string} color 
 * @returns {void}
 */
export const setMove = (element, move) => element.setAttribute("data-move", move)

/**
 * Sets the piece name in a HTML data attribute of an element
 * @param {HTMLElement} element 
 * @param {string} color 
 * @returns {void}
 */
export const setName = (element, name) => element.setAttribute("data-name", name)

/**
 * Sets the piece type in a HTML data attribute of an element
 * @param {HTMLElement} element 
 * @param {string} color 
 * @returns {void}
 */
export const setType = (element, type) => element.setAttribute("data-type", type)

/**
 * Returns the color of a specified piece
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getColor = (element) => element.dataset.color

/**
 * Returns the type of a specified piece
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getType = (element) => element.dataset.type

/**
 * Returns the current square where the piece is in
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getSquare = element => element.dataset.square

/**
 * Returns the name of a specified piece
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getName = element => element.dataset.name

/**
 * Returns the current move order of piece
 * @param {HTMLElement} element 
 * @returns {number}
 */
export const getPieceMove = element => parseInt(element.dataset.move)

/**
 * Returns a piece if it's in a specified square
 * @param {string} square 
 * @returns {HTMLElement | undefined}
 */
export const getPieceBySquare = square => getPieces().find(piece => getSquare(piece) === square)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// GAME FEATURES

/**
 * The history informations of the game
 */
export const gameHistory = []

/**
 * Returns the game info of last round per move
 * @returns {{
 *  round: number,
 *  roundPerMove: number,
 *  pieceName: string,
 *  pieceType: string,
 *  pieceMove: number,
 *  pieceColor: string,
 *  squareOrigin: string,
 *  squareDestination: string
 * } | undefined}
 */
export const lastRound = () => gameHistory[roundPerMove - 2]

/**
 * The current turn of the game
 */
export var turn = "white"

/**
 * Swaps the turn in the game
 * @returns {void}
 */
export const swapTurn = () => turn = (turn === "white" ? "black" : "white")

/**
 * Returns the color of the current player's opponent
 * @param {string} color 
 * @returns {string}
 */
export const opponent = (color = turn) => color === "white" ? "black" : "white"

/**
 * The round number by each player
 */
export var round = 1

/**
 * The round number by movements
 */
export var roundPerMove = 1

/**
 * Increments the round by each player
 * @returns {void}
 */
export const incrementRound = () => round += 1

/**
 * Increments the round by movements
 * @returns {void}
 */
export const incrementRoundPerMove = () => roundPerMove += 1

/**
 * Check if the movement of piece is first
 * @param {HTMLElement} piece 
 * @returns {boolean}
 */
export const isFirstMove = piece => getPieceMove(piece) === 0

/**
 * Check if the square is for promotion of pawn
 * @param {HTMLElement} piece 
 * @param {string} square 
 * @returns {boolean}
 */
export const isPromotion = (piece, square) => getType(piece) === "pawn" && hasClass(getSquareFromBoard(square), "promotion")

/**
 * Returns the element of pieces to promotion, if it's available
 * @returns {HTMLElement | undefined}
 */
export const promotionList = () => getElement(".promotionPieces")

/**
 * Returns the list of pieces to promotion, if it's available
 * @returns {HTMLElement[] | undefined}
 */
export const promotionOptions = () => getElements(".piece", promotionList())

/**
 * Verify if the movement is castle of king
 * @param {HTMLElement} piece 
 * @param {string} square 
 * @returns {boolean}
 */
export const isCastle = (piece, square) => getType(piece) === "king" && isFirstMove(piece) && hasClass(getSquareFromBoard(square), "castle")

/**
 * Verification if capture en passant is valid
 */
export var isPassant = false

/**
 * Validates capture en passant
 * @param {boolean} value 
 * @returns {void}
 */
export const setPassant = value => isPassant = value

/**
 * Moves a piece to a specified square
 * @param {HTMLElement} piece 
 * @param {string} square 
 */
export const movePiece = (piece, square) => {
    let { top, left } = getCoordinateBySquare(square)
    setSquare(piece, square)
    setMove(piece, getPieceMove(piece) + 1)
    setStyle(piece, "top", `${top}px`)
    setStyle(piece, "left", `${left}px`)
}

/**
 * Removes a captured piece from board
 * @param {HTMLElement} piece 
 */
export const capturePiece = piece => {
    piece.remove()
}

/**
 * Check condition
 */
export var check = false

/**
 * Checkmate condition
 */
export var checkMate = false

/**
 * Pieces that are attacking the opponent king
 */
export const piecesCheck = []

/**
 * Sets the check value
 * @param {boolean} value 
 * @returns {void}
 */
export const setCheck = value => check = value

/**
 * Ends the game
 * @returns {void}
 */
export const endGame = () => checkMate = true