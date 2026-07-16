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
export const getElements = (selector, parentElement = null) => Array.from((parentElement ?? document).querySelectorAll(selector))

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

/**
 * Returns a text with first letter in upper case
 * @param {string} text 
 * @returns {string}
 */
export const capitalized = text => text.charAt(0).toUpperCase() + text.slice(1)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// BOARD

/**
 * The board element
 */
export const board = getElement(".board")

/**
 * The columns indicator from board
 */
export const indicatorColumns = getElement(".indicator.columns", board)

/**
 * The ranks indicator from board
 */
export const indicatorRanks = getElement(".indicator.ranks", board)

/**
 * The list of columns
 */
export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]

/**
 * The list of ranks
 */
export const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()

/**
 * The default dimension of the board in pixels
 */
export const defaultBoardDimension = 600

/**
 * Returns the dimension (width and height) of the board, in pixels
 * @returns {number}
 */
export const boardDimension = () => board.offsetWidth || board.offsetHeight

/**
 * The button to spin the board
 */
export const buttonRotate = getElement(".rotate")

/**
 * The area of captured pieces
 */
export const capturedPiecesArea = getElement(".capturedPieces")

/**
 * The area of captured white pieces
 */
export const capturedWhitePiecesArea = getElement("div.white", capturedPiecesArea)

/**
 * The area of captured black pieces
 */
export const capturedBlackPiecesArea = getElement("div.black", capturedPiecesArea)

/**
 * Button to undo a move
 */
export const buttonUndo = getElement(".undo")

/**
 * Button to restart the game
 */
export const buttonRestart = getElement(".restart")

/**
 * The area of the controller buttons and the undo button
 */
export const controllersArea = getElement(".controllers")

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
 * Check if a specified square has a piece in
 * @param {string} square 
 * @returns {boolean}
 */
export const squareHasPiece = square => getPieces().some(piece => getSquare(piece) === square)

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

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// PIECES

/**
 * Returns all pieces in the board
 * @returns {HTMLElement[]}
 */
export const getPieces = () => getElements(".piece:not(.captured)")

/**
 * Returns the pieces of a specified color
 * @param {string} color 
 * @returns {HTMLElement[]}
 */
export const getPiecesByColor = (color = turn) => getPieces().filter(piece => getColor(piece) === color)

/**
 * Returns a piece if it's in a specified square
 * @param {string} square 
 * @returns {HTMLElement | undefined}
 */
export const getPieceBySquare = square => getPieces().find(piece => getSquare(piece) === square)

/**
 * Returns the captured pieces
 * @returns {HTMLElement[] | undefined}
 */
export const getCapturedPieces = () => getElements(".piece.captured")

/**
 * Returns the capturedpieces of a specified color
 * @param {string} color 
 * @returns {HTMLElement[] | undefined}
 */
export const getCapturedPiecesByColor = (color = turn) => getCapturedPieces().filter(piece => getColor(piece) === color)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// DATA ATTRIBUTES

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
 * @param {number} move 
 * @returns {void}
 */
export const setMove = (element, move) => element.setAttribute("data-move", move)

/**
 * Sets the piece name in a HTML data attribute of an element
 * @param {HTMLElement} element 
 * @param {string} name 
 * @returns {void}
 */
export const setName = (element, name) => element.setAttribute("data-name", name)

/**
 * Sets the piece type in a HTML data attribute of an element
 * @param {HTMLElement} element 
 * @param {string} type 
 * @returns {void}
 */
export const setType = (element, type) => element.setAttribute("data-type", type)

/**
 * Returns the current square where the piece is in
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getSquare = element => element.dataset.square

/**
 * Returns the color of a specified piece
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getColor = (element) => element.dataset.color

/**
 * Returns the name of a specified piece
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getName = element => element.dataset.name

/**
 * Returns the type of a specified piece
 * @param {HTMLElement} element 
 * @returns {string}
 */
export const getType = (element) => element.dataset.type

/**
 * Returns the current move order of piece
 * @param {HTMLElement} element 
 * @returns {number}
 */
export const getPieceMove = element => parseInt(element.dataset.move)

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// GAME FEATURES

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
 * Sets the turn with a specified value
 * @param {string} color 
 * @returns {void}
 */
export const setTurn = color => turn = color

/**
 * Resets the color turn when game restarts
 * @returns {void}
 */
export const resetTurn = () => turn = "white"

/**
 * Returns the color of the current player's opponent
 * @param {string} color 
 * @returns {string}
 */
export const opponent = (color = turn) => color === "white" ? "black" : "white"

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
 * Verify if the movement is castle of king
 * @param {HTMLElement} piece 
 * @param {string} square 
 * @returns {boolean}
 */
export const isCastle = (piece, square) => getType(piece) === "king" && isFirstMove(piece) && hasClass(getSquareFromBoard(square), "castle")

/**
 * Moves a piece to a specified square
 * @param {HTMLElement} piece 
 * @param {string} square 
 * @param {boolean} undone
 */
export const movePiece = (piece, square, undoneMove = false) => {
    let { top, left } = getCoordinateBySquare(square)
    setSquare(piece, square)
    setMove(piece, undoneMove ? getPieceMove(piece) - 1 : getPieceMove(piece) + 1)
    setStyle(piece, "top", `${top}px`)
    setStyle(piece, "left", `${left}px`)
}

/**
 * Removes a captured piece from board
 * @param {HTMLElement} piece 
 */
export const capturePiece = (piece) => {
    addClass(piece, "captured")
    const pieceClone = piece.cloneNode(true)
    insertCapturedPieces(pieceClone)
    piece.remove()
}

/**
 * Inserts a captured piece in the list of captured pieces
 * @param {HTMLElement} piece 
 * @param {boolean} inReview
 */
export const insertCapturedPieces = (piece, inReview = false) => {
    let color = getColor(piece)
    let pieces = getCapturedPiecesByColor(color) ?? []
    let piecesToInsert = inReview ? [...pieces, piece] : [piece]

    if (color === "white") {
        capturedWhitePiecesArea.append(...piecesToInsert)
    } else {
        capturedBlackPiecesArea.append(...piecesToInsert)
    }
}

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
 * Decrements the round by each player
 * @returns {void}
 */
export const decrementRound = () => round -= 1

/**
 * Sets the round from a specified value
 * @param {number} roundValue 
 * @returns {void}
 */
export const setRound = roundValue => round = roundValue

/**
 * Resets the round by each player
 * @returns {void}
 */
export const resetRound = () => round = 1

/**
 * Increments the round by movements
 * @returns {void}
 */
export const incrementRoundPerMove = () => roundPerMove += 1

/**
 * Decrements the round by movements
 * @returns {void}
 */
export const decrementRoundPerMove = () => roundPerMove -= 1

/**
 * Sets the round by movements from a specified value
 * @param {number} roundValue 
 * @returns {void}
 */
export const setRoundPerMove = roundValue => roundPerMove = roundValue

/**
 * Resets the round by movements
 * @returns {void}
 */
export const resetRoundPerMove = () => roundPerMove = 1

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
 * Check if the movement of piece is first
 * @param {HTMLElement} piece 
 * @returns {boolean}
 */
export const isFirstMove = piece => getPieceMove(piece) === 0

/**
 * Check condition
 */
export var check = false

/**
 * Checkmate condition
 */
export var checkMate = false

/**
 * Stalemate condition
 */
export var staleMate = false

/**
 * Draw by repetition condition
 */
export var drawByRepetition = false

/**
 * Draw by lack of material condition
 */
export var drawByLackOfMaterial = false

/**
 * Draw after fifty moves condition
 */
export var drawAfterFiftyMoves = false

/**
 * Draw condition
 */
export var draw = false

/**
 * Pieces those are attacking the opponent king
 */
export const piecesCheck = []

/**
 * Sets the check condition
 * @param {boolean} value 
 * @returns {void}
 */
export const setCheck = value => check = value

/**
 * Sets the stalemate condition
 * @param {boolean} value 
 * @returns {void}
 */
export const setStaleMate = value => staleMate = value

/**
 * Sets the draw by repetition condition
 * @param {boolean} value 
 * @returns {void}
 */
export const setDrawByRepetition = value => drawByRepetition = value

/**
 * Sets the draw by lack of material condition
 * @param {boolean} value 
 * @returns {void}
 */
export const setDrawByLackOfMaterial = value => drawByLackOfMaterial = value

/**
 * Sets the draw after fifty moves condition
 * @param {boolean} value 
 * @returns {void}
 */
export const setDrawAfterFiftyMoves = value => drawAfterFiftyMoves = value

/**
 * Ends the game by checkmate
 * @returns {void}
 */
export const endGameByCheckMate = () => checkMate = true

/**
 * Resets the checkmate when game restarts
 * @returns {void}
 */
export const resetCheckMate = () => checkMate = false

/**
 * Ends the game by draw
 * @returns {void}
 */
export const endGameByDraw = () => draw = true

/**
 * Resets the checkmate when game restarts
 * @returns {void}
 */
export const resetDraw = () => draw = false

/**
 * Returns the icon of defeated king
 * @param {string} square 
 * @returns {HTMLDivElement}
 */
export const defeatedIcon = square => {
    const element = document.createElement("div")
    const icon = "<i class=\"fa-solid fa-hashtag\"></i>"
    const { top, left } = getCoordinateBySquare(square)

    element.className = "endGameIcon defeated"
    element.innerHTML = icon
    setSquare(element, square)
    setStyle(element, "top", `${top}px`)
    setStyle(element, "left", `${left}px`)

    return element
}

/**
 * Returns the icon of winner king
 * @param {string} square 
 * @returns {HTMLDivElement}
 */
export const winnerIcon = square => {
    const element = document.createElement("div")
    const icon = "<i class=\"fa-solid fa-crown\"></i>"
    const { top, left } = getCoordinateBySquare(square)

    element.className = "endGameIcon winner"
    element.innerHTML = icon
    setSquare(element, square)
    setStyle(element, "top", `${top}px`)
    setStyle(element, "left", `${left}px`)

    return element
}

/**
 * Returns the icon when the game ends on draw
 * @param {string} square 
 * @returns {HTMLDivElement}
 */
export const drawIcon = square => {
    const element = document.createElement("div")
    const icon = "<span>1/2</span>"
    const { top, left } = getCoordinateBySquare(square)

    element.className = "endGameIcon draw"
    element.innerHTML = icon
    setSquare(element, square)
    setStyle(element, "top", `${top}px`)
    setStyle(element, "left", `${left}px`)

    return element
}

export const endGameIcons = () => getElements(".endGameIcon")

/**
 * The history informations of the game
 */
export const gameHistory = []

/**
 * Returns the game info of last round per move
 * @param {number} index 
 * @returns {{
 *  round: number,
 *  roundPerMove: number,
 *  squareOrigin: string,
 *  squareDestination: string,
 *  castle: boolean,
 *  passant: boolean,
 *  promoted: boolean,
 *  escapedFromCheck: boolean,
 *  check: boolean,
 *  checkMate: boolean,
 *  draw: boolean,
 *  staleMate: boolean,
 *  drawByRepetition: boolean,
 *  drawByLackOfMaterial: boolean,
 *  drawAfterFiftyMoves: boolean,
 *  piece: {
 *      name: string,
 *      type: string,
 *      color: string,
 *      move: number,
 *  },
 *  capturedPiece: {
 *      name: string,
 *      type: string,
 *      color: string,
 *      square: string,
 *      move: number,
 *  } | null,
 *  currentPieces: {
 *      name: string,
 *      type: string,
 *      color: string,
 *      square: string,
 *      move: number,
 *  }[]
 * }}
 */
export const lastRound = (index = roundPerMove) => gameHistory[index - 2]

/**
 * Accumulation of pieces rounds to verify repetition
 */
export const repetitionCount = []

/**
 * The limit of repetitions in the accumulator array, it's a representation of the real limit that is 3
 */
export const arrayRepetitionLimit = 10

/**
 * The index for repetition accumulator
 */
export var repetitionIndex = 0

/**
 * Increments the index of repetition accumulator
 * @returns {void}
 */
export const incrementRepetitionIndex = () => repetitionIndex += 1

/**
 * Resets the repetition accumulator
 */
export const resetRepetitionCount = () => {
    repetitionCount.length = 0
    repetitionIndex = 0
}

/**
 * Accumulation of moves to verify the draw after fifty moves rule
 */
export const fiftyMovesCount = []

/**
 * The limit of fifty moves in the accumulator array, it's a representation of the real limit that is 50
 */
export const arrayFiftyMovesLimit = 100

/**
 * Increments the index of fifty moves accumulator
 * @returns {void}
 */
export const incrementFiftyMovesIndex = () => fiftyMovesIndex += 1

/**
 * Resets the fifty moves accumulator
 */
export const resetFiftyMovesCount = () => fiftyMovesCount.length = 0

/**
 * Shows in browser console the status of the current round
 * @param {string} color 
 * @param {boolean} promoted 
 * @param {HTMLElement} piece 
 * @param {HTMLElement} capturedPiece 
 * @param {string} squareOrigin 
 * @param {string} squareDestination 
 * @param {boolean} castle 
 * @param {boolean} enPassant 
 */
export const showRoundStatus = (color, promoted, piece, capturedPiece, squareOrigin, squareDestination, castle, enPassant, currentRound = round) => {
    if (color === "white") {
        console.log(`\nROUND ${currentRound}`)
    }

    const piecesCondition = (promoted ? "PROMOTED TO " : "")
        + capitalized(getType(piece))
        + (capturedPiece ? ` x ${capitalized(getType(capturedPiece))}` : "")

    const drawCondition = "\n** DRAW"
        + (staleMate ? " BY STALEMATE" : "")
        + (drawByRepetition ? " BY REPETITION" : "")
        + (drawByLackOfMaterial ? " BY LACK OF MATERIAL" : "")
        + (drawAfterFiftyMoves ? " AFTER FIFTY MOVES" : "")
        + " **"

    console.log(
        "*",
        piecesCondition,
        "|",
        `${squareOrigin} => ${squareDestination}`,
        castle ? "\n** CASTLE **" : "",
        enPassant ? "\n** EN PASSANT CAPTURE **" : "",
        check && !checkMate ? "\n** CHECK **" : "",
        checkMate ? "\n** CHECKMATE **" : "",
        draw ? drawCondition : "",
    )
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// GAME REVIEW

/**
 * Element of game review button
 * @returns {HTMLButtonElement}
 */
export const reviewButtonElement = () => {
    const element = document.createElement("button")
    element.className = "review"
    element.innerText = "Rever jogo"
    return element
}

/**
 * The game review button
 * @returns {HTMLButtonElement | undefined}
 */
export const reviewButton = () => getElement(".review")

/**
 * All controller buttons of game review
 * @returns {HTMLButtonElement[] | undefined}
 */
export const controllerButtons = () => getElements(".controller")

/**
 * The button that goes to first round on game review
 * @returns {HTMLButtonElement | undefined}
 */
export const firstRoundButton = () => getElement(".controller.first")

/**
 * The button that goes to last round on game review
 * @returns {HTMLButtonElement | undefined}
 */
export const lastRoundButton = () => getElement(".controller.last")

/**
 * The button that goes back a round on game review
 * @returns {HTMLButtonElement | undefined}
 */
export const backwardsRoundButton = () => getElement(".controller.backwards")

/**
 * The button that advances a round on game review
 * @returns {HTMLButtonElement | undefined}
 */
export const forwardsRoundButton = () => getElement(".controller.forwards")

/**
 * Moves a piece to the square according the specified round
 * @param {HTMLElement} piece 
 * @param {string} square 
 * @param {number} pieceMove 
 */
export const movePieceOnReview = (piece, square, pieceMove) => {
    movePiece(piece, square)
    setMove(piece, pieceMove)
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// GAME STORAGE

/**
 * The key for game storage
 */
const gameKey = "chess-game"

/**
 * Returns the game informations those is saved on browser's local storage
 * @returns {{
 *  round: number,
 *  roundPerMove: number,
 *  squareOrigin: string,
 *  squareDestination: string,
 *  castle: boolean,
 *  passant: boolean,
 *  promoted: boolean,
 *  escapedFromCheck: boolean,
 *  check: boolean,
 *  checkMate: boolean,
 *  draw: boolean,
 *  staleMate: boolean,
 *  drawByRepetition: boolean,
 *  drawByLackOfMaterial: boolean,
 *  drawAfterFiftyMoves: boolean,
 *  piece: {
 *      name: string,
 *      type: string,
 *      color: string,
 *      move: number,
 *  },
 *  capturedPiece: {
 *      name: string,
 *      type: string,
 *      color: string,
 *      square: string,
 *      move: number,
 *  } | null,
 *  currentPieces: {
 *      name: string,
 *      type: string,
 *      color: string,
 *      square: string,
 *      move: number,
 *  }[]
 * }[] | undefined}
 */
export const storagedGame = () => JSON.parse(localStorage.getItem(gameKey))

/**
 * Saves the game informations on browser local storage
 * @returns {void}
 */
export const storageGame = () => localStorage.setItem(gameKey, JSON.stringify(gameHistory))

/**
 * Clear the game informations on browser local storage
 * @returns {void}
 */
export const clearStoragedGame = () => localStorage.removeItem(gameKey)