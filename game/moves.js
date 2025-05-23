import { captureScape, checkCheck, moveScape } from "./check.js";
import { getAvailableCaptures, getAvailableMoves } from "./getAvailableMoves.js";
import Pieces from "./pieces.js";
import { addClass, board, buttonRestart, buttonUndo, capitalized, capturedArea, capturedBlackPieces, capturedPieces, capturedWhitePieces, capturePiece, check, checkMate, decrementRound, decrementRoundPerMove, gameHistory, getColor, getCoordinateBySquare, getElement, getElements, getMoveSquares, getName, getPieceBySquare, getPieceMove, getPieces, getPiecesByColor, getSquare, getType, hasClass, incrementRound, incrementRoundPerMove, isCastle, isFirstMove, isPassant, isPromotion, lastRound, movePiece, piecesCheck, promotionList, promotionOptions, removeClass, replaceClass, resetCheckMate, resetRound, resetRoundPerMove, resetTurn, round, roundPerMove, setCheck, setMove, setName, setPassant, setSquare, setStyle, setType, swapTurn, toggleClass, turn } from "./variables.js";

/**
 * Returns an element of a move square representation
 * @param {string} square 
 * @returns {HTMLDivElement}
 */
const moveElement = square => {
    let element = document.createElement("div")
    let { top, left } = getCoordinateBySquare(square)
    element.className = "move"
    setSquare(element, square)
    setStyle(element, "top", `${top}px`)
    setStyle(element, "left", `${left}px`)
    return element
}

/**
 * Returns an element of a capture square representation
 * @param {string} square 
 * @returns {HTMLDivElement}
 */
const captureElement = square => {
    let element = moveElement(square)
    addClass(element, "capture")
    return element
}

/**
 * Returns the element of pieces to promotion
 * @param {string} color 
 * @returns {HTMLDivElement}
 */
const promotionElement = color => {
    let element = document.createElement("div")
    element.className = "promotionPieces"
    setStyle(element, (color === "white" ? "top" : "bottom"), 0)

    let piecesToPromote = ["knight", "bishop", "rook", "queen"]

    piecesToPromote.forEach(pieceType => {
        let piece = document.createElement("i")
        piece.className = `fa-solid fa-chess-${pieceType} piece ${color}`
        setType(piece, pieceType)
        element.append(piece)
    })

    return element
}

/**
 * Shows the available move squares from a specified piece
 * @param {HTMLElement} piece 
 */
const setMoveSquares = piece => {
    if (getMoveSquares().length) {
        getMoveSquares().forEach(square => !hasClass(square, "fixed") && square.remove())
    }

    let moveSquares = check ? moveScape(piece) : getAvailableMoves(piece)
    let captureSquares = check ? captureScape(piece) : getAvailableCaptures(piece)

    if (moveSquares.length) {
        moveSquares.forEach(square => {
            board.append(moveElement(square))
        })
    }

    if (captureSquares.length) {
        captureSquares.forEach(square => {
            board.append(captureElement(square))
        })
    }
}

/**
 * Inserts a captured piece in the list of captured pieces
 * @param {HTMLElement} piece 
 */
const insertCapturedPieces = piece => {
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
 * Moves a piece
 * @param {HTMLElement} piece 
 * @param {string} square 
 */
const movement = (piece, square, promoted = false) => {
    let pieceToCapture = getPieceBySquare(square)
    let squareOrigin = getSquare(piece)
    let color = getColor(piece)
    let castle = false

    if (check) {
        let king = getPiecesByColor(color).find(p => getType(p) === "king")
        removeClass(king, "check")
        piecesCheck.length = 0
        setCheck(false)
    }

    getMoveSquares().forEach(s => s.remove())
    removeClass(piece, "selected")
    removeClass(piece, "active")

    if (isCastle(piece, square)) {
        let [c, r] = square.split("")
        let castleSquare = (c === "c" ? "d" : "f") + r
        let castleRook = getPieceBySquare((c === "c" ? "a" : "h") + r)

        if (castleRook && getType(castleRook) === "rook" && isFirstMove(castleRook) && color === getColor(castleRook)) {
            movePiece(castleRook, castleSquare)
            castle = true
        }
    }

    if (isPassant) {
        let pawnToCapture = getPieceBySquare(lastRound().squareDestination)
        capturePiece(pawnToCapture, roundPerMove)
        insertCapturedPieces(pawnToCapture)
        setPassant(false)
    }

    if (pieceToCapture) {
        capturePiece(pieceToCapture, roundPerMove)
        insertCapturedPieces(pieceToCapture)
    }

    movePiece(piece, square)

    gameHistory.push({
        round,
        roundPerMove,
        pieceName: getName(piece),
        pieceType: getType(piece),
        pieceMove: getPieceMove(piece),
        pieceColor: color,
        squareOrigin,
        squareDestination: square
    })

    if (color === "white") {
        console.log(`\nROUND ${round}`)
    }

    if (turn === "black") {
        incrementRound()
    }

    incrementRoundPerMove()
    swapTurn()
    checkCheck()

    console.log(
        `${promoted ? "Promoted to " : ""}${capitalized(getType(piece))}${pieceToCapture ? ` x ${capitalized(getType(pieceToCapture))}` : ""} | ${squareOrigin} => ${square} ${castle ? "\nCastle" : ""}${check && !checkMate ? "\nCheck" : ""}${checkMate ? "\nCheckmate" : ""}`
    )

    if (gameHistory.length) {
        buttonUndo.removeAttribute("disabled")
    } else {
        buttonUndo.setAttribute("disabled", true)
    }
}

/**
 * Promotes a pawn before moving it
 * @param {HTMLElement} piece 
 * @param {string} square 
 */
const promotion = (piece, square) => {
    board.append(promotionElement(getColor(piece)))

    promotionOptions().forEach(opt => {
        opt.addEventListener("click", ({ target }) => {
            replaceClass(piece, "fa-chess-pawn", `fa-chess-${getType(target)}`)
            setType(piece, getType(target))
            setName(piece, `${getName(piece)}-promoted-to-${getType(target)}`)
            promotionList().remove()
            movement(piece, square, true)
        })
    })
}

/**
 * Selects a specified piece when mouse is over
 * @param {HTMLElement} piece 
 */
const selectPiece = piece => {
    if (checkMate) {
        return
    }

    if (hasClass(piece, "captured")) {
        return
    }

    setPassant(false)
    addClass(piece, "active")
    setMoveSquares(piece)
}

/**
 * Diselects a specified piece when mouse is out
 * @param {HTMLElement} piece 
 */
const disselectPiece = piece => {
    if (checkMate) {
        return
    }

    if (hasClass(piece, "captured")) {
        return
    }

    if (!hasClass(piece, "selected")) {
        removeClass(piece, "active")
    }

    if (getMoveSquares().length) {
        getMoveSquares().forEach(square => {
            if (!hasClass(square, "fixed")) {
                square.remove()
            }
        })
    }
}

/**
 * Set the selected piece to move and its available move squares when clicked
 * @param {HTMLElement} piece 
 */
const defineMove = piece => {
    if (checkMate) {
        return
    }

    if (hasClass(piece, "captured")) {
        return
    }

    let color = getColor(piece)

    getPiecesByColor(color).forEach(p => {
        if (p !== piece) {
            removeClass(p, "selected")
            removeClass(p, "active")
        }
    })

    toggleClass(piece, "selected")
    getMoveSquares().forEach(square => removeClass(square, "fixed"))

    if (hasClass(piece, "selected")) {
        setMoveSquares(piece)
        getMoveSquares().forEach(square => addClass(square, "fixed"))
    }

    if (getMoveSquares().length && getMoveSquares().every(square => hasClass(square, "fixed"))) {
        getMoveSquares().forEach(square => {
            square.addEventListener("click", ({ target }) => {
                if (isPromotion(piece, getSquare(target))) {
                    promotion(piece, getSquare(target))
                } else {
                    movement(piece, getSquare(target))
                }
            })
        })
    }
}

/**
 * Undo a piece movement
 * @returns {void}
 */
const undoMove = () => {
    if (!lastRound()) {
        return
    }

    let piece = getPiecesByColor(lastRound().pieceColor).find(p => getName(p) === lastRound().pieceName)
    let lastCapturedPieceInfo = capturedPieces.find(info => info.roundPerMove === lastRound().roundPerMove)

    movePiece(piece, lastRound().squareOrigin)
    setMove(piece, getPieceMove(piece) - 2)

    if (lastCapturedPieceInfo) {
        let lastCapturedPiece = lastCapturedPieceInfo.piece
        lastCapturedPiece.remove()
        removeClass(lastCapturedPiece, "captured")
        board.append(lastCapturedPiece)
        capturedPieces.pop()
    }

    if (lastRound().pieceColor === "black" && round > 1) {
        decrementRound()
    }

    swapTurn()
    decrementRoundPerMove()
    gameHistory.pop()

    if (!lastRound()) {
        buttonUndo.setAttribute("disabled", true)
    }

    console.log("\nUNDONE MOVE")
}

/**
 * Restarts the game
 * @returns {void}
 */
const restartGame = () => {
    let defeated = getElement(".defeated")
    let winner = getElement(".winner")

    if (!checkMate) {
        let confirmRestart = window.confirm("Deseja iniciar um novo jogo?")

        if (!confirmRestart) {
            return
        }
    }

    if (defeated) {
        defeated.remove()
    }

    if (winner) {
        winner.remove()
    }

    getPieces().forEach(piece => piece.remove())
    capturedPieces.length = 0
    gameHistory.length = 0
    piecesCheck.length = 0
    setPassant(false)
    setCheck(false)
    resetCheckMate()
    resetRound()
    resetRoundPerMove()
    resetTurn()

    Pieces()
    Moves()
    console.clear()
}

export default function Moves() {
    getPieces().forEach(piece => {
        piece.addEventListener("mouseenter", ({ target }) => getColor(target) === turn && selectPiece(target))
        piece.addEventListener("click", ({ target }) => getColor(target) === turn && defineMove(target))
        piece.addEventListener("mouseleave", ({ target }) => getColor(target) === turn && disselectPiece(target))
    })

    buttonUndo.addEventListener("click", undoMove)
    buttonRestart.addEventListener("click", restartGame)
}