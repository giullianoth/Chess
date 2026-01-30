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

/**
 * The area of captured pieces
 */
export const capturedArea = getElement(".capturedPieces")

/**
 * The area of captured white pieces
 */
export const capturedWhitePieces = getElement("div.white", capturedArea)

/**
 * The area of captured black pieces
 */
export const capturedBlackPieces = getElement("div.black", capturedArea)

/**
 * The button to spin the board
 */
export const buttonRotate = getElement(".rotate")

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
export const getPieces = () => getElements(".piece:not(.captured)")

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

/**
 * The captured pieces of the game
 */
export const capturedPieces = []

/**
 * The pieces list of each player
 */
export const piecesList = ["pawn1", "pawn2", "pawn3", "pawn4", "pawn5", "pawn6", "pawn7", "pawn8", "rook1", "rook2", "knight1", "knight2", "bishop1", "bishop2", "queen", "king"]

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// ACTIONS

/**
 * Button to undo a move
 */
export const buttonUndo = getElement(".undo")

/**
 * Button to restart the game
 */
export const buttonRestart = getElement(".restart")

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// GAME FEATURES

const gameKey = "chess-game"

/**
 * Returns the game informations those is saved on browser local storage
 * @returns {{
 *  round: number,
 *  roundPerMove: number,
 *  pieceName: string,
 *  pieceType: string,
 *  pieceMove: number,
 *  pieceColor: string,
 *  squareOrigin: string,
 *  squareDestination: string,
 *  castle: boolean,
 *  promoted: boolean,
 *  enPassant: boolean,
 *  turn: string,
 *  check: boolean,
 *  checkMate: boolean,
 *  currentPieces: {
 *      type: string,
 *      name: string,
 *      color: string,
 *      square: string,
 *      moves: number
 *  }[],
 *  capturedPieces: {
 *      piece: {
 *          type: string,
 *          name: string,
 *          color: string,
 *          square: string,
 *          moves: number
 *      },
 *      roundPerMove: number
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
 *  pieceName: string,
 *  pieceType: string,
 *  pieceMove: number,
 *  pieceColor: string,
 *  squareOrigin: string,
 *  squareDestination: string,
 *  castle: boolean,
 *  promoted: boolean,
 *  enPassant: boolean,
 *  turn: string,
 *  check: boolean,
 *  checkMate: boolean,
 *  currentPieces: {
 *      type: string,
 *      name: string,
 *      color: string,
 *      square: string,
 *      moves: number
 *  }[],
 *  capturedPieces: {
 *      piece: {
 *          type: string,
 *          name: string,
 *          color: string,
 *          square: string,
 *          moves: number
 *      },
 *      roundPerMove: number
 *  }[]
 * } | undefined}
 */
export const lastRound = (index = roundPerMove) => gameHistory[index - 2]

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
 * @param {number} currentRoundPerMove
 */
export const capturePiece = (piece, currentRoundPerMove) => {
    addClass(piece, "captured")

    capturedPieces.push({
        piece: piece,
        roundPerMove: currentRoundPerMove
    })

    piece.remove()
}

/**
 * Inserts a captured piece in the list of captured pieces
 * @param {HTMLElement} piece 
 */
export const insertCapturedPieces = piece => {
    if (getColor(piece) === "white") {
        capturedWhitePieces.innerHTML = ""

        capturedPieces.forEach(p => {
            if (getColor(p.piece) === "white") {
                capturedWhitePieces.append(p.piece)
            }
        })
    }

    if (getColor(piece) === "black") {
        capturedBlackPieces.innerHTML = ""

        capturedPieces.forEach(p => {
            if (getColor(p.piece) === "black") {
                capturedBlackPieces.prepend(p.piece)
            }
        })
    }
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
 * Pieces those are attacking the opponent king
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

/**
 * Resets the checkmate when game restarts
 * @returns {void}
 */
export const resetCheckMate = () => checkMate = false

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
    setStyle(element, "top", `${top}px`)
    setStyle(element, "left", `${left}px`)

    return element
}

export const endGameIcons = () => getElements(".endGameIcon")

/**
 * Shows in browser console the status of the current round
 * @param {string} color 
 * @param {boolean} promoted 
 * @param {string} piece 
 * @param {string} capturedPiece 
 * @param {string} squareOrigin 
 * @param {string} squareDestination 
 * @param {boolean} castle 
 * @param {boolean} enPassant 
 */
export const showRoundStatus = (color, promoted, piece, capturedPiece, squareOrigin, squareDestination, castle, enPassant, currentRound = round) => {
    if (color === "white") {
        console.log(`\nROUND ${currentRound}`)
    }

    console.log(
        promoted ? "Promoted to" : "",
        capitalized(getType(piece)),
        capturedPiece ? `x ${capitalized(getType(capturedPiece))}` : "",
        "|",
        `${squareOrigin} => ${squareDestination}`,
        castle ? "\nCastle" : "",
        enPassant ? "\nEn Passant" : "",
        check && !checkMate ? "\nCheck" : "",
        checkMate ? "\nCheckmate" : ""
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
 * Element of a controller review button
 * @param {string} className 
 * @param {string} title 
 * @param {string} iconName 
 * @returns {HTMLButtonElement}
 */
export const reviewControllersElement = (className, title, iconName) => {
    const element = document.createElement("button")
    const icon = document.createElement("i")
    element.className = className
    element.setAttribute("title", title)
    icon.className = `fa-solid fa-${iconName}`
    element.append(icon)
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
export const controllersButtons = () => getElements(".controller")

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

export const movePieceOnReview = (piece, square, pieceMove) => {
    movePiece(piece, square)
    setMove(piece, pieceMove)
}