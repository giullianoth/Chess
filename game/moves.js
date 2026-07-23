import { getAvailableCaptures, getAvailableMoves } from "./available-moves.js"
import { captureScape, checkCheck, moveScape, setPiecesCheck } from "./check.js"
import { checkFiftyMoves, checkLackOfMaterial, checkRepetition, checkStalemate } from "./draw.js"
import Pieces from "./pieces.js"
import { addClass, board, buttonRestart, buttonUndo, capturedBlackPiecesArea, capturedWhitePiecesArea, capturePiece, check, checkMate, clearStoragedGame, controllerButtons, decrementRound, decrementRoundPerMove, draw, drawByLackOfMaterial, drawByRepetition, gameHistory, getCapturedPieces, getColor, getCoordinateBySquare, getElement, getElements, getMoveSquares, getName, getPieceBySquare, getPieceMove, getPieces, getPiecesByColor, getSquare, getSquareFromBoard, getType, hasClass, incrementRound, incrementRoundPerMove, isCastle, isFirstMove, isPassant, isPromotion, lastRound, movePiece, opponent, piecesCheck, promotionList, promotionOptions, removeClass, replaceClass, resetCheckMate, resetDraw, resetRound, resetRoundPerMove, resetTurn, reviewButton, round, roundPerMove, setCheck, setDrawAfterFiftyMoves, setDrawByLackOfMaterial, setDrawByRepetition, setName, setPassant, setSquare, setStaleMate, setStyle, setType, showRoundStatus, squareHasPiece, staleMate, storageGame, swapTurn, toggleClass, turn } from "./variables.js"

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
 * Moves a piece
 * @param {HTMLElement} piece 
 * @param {HTMLElement} squareTarget
 * @param {boolean} promoted 
 */
const movement = (piece, squareTarget, promoted = false) => {
    let pieceToCapture = null
    let squareOrigin = getSquare(piece)
    let squareDestination = getSquare(squareTarget)
    let color = getColor(piece)
    let castle = false
    let passant = false
    let escapedFromCheck = false

    if (check) {
        let king = getPiecesByColor(color).find(p => getType(p) === "king")
        removeClass(king, "check")
        piecesCheck.length = 0
        escapedFromCheck = true
        setCheck(false)
    }

    getMoveSquares().forEach(s => s.remove())
    removeClass(piece, "selected")
    removeClass(piece, "active")

    if (hasClass(squareTarget, "capture") && squareHasPiece(squareDestination)) {
        pieceToCapture = getPieceBySquare(squareDestination)
        capturePiece(pieceToCapture)
    }

    if (isCastle(piece, squareDestination)) {
        let [c, r] = squareDestination.split("")
        let castleSquare = (c === "c" ? "d" : "f") + r
        let castleRook = getPieceBySquare((c === "c" ? "a" : "h") + r)

        if (castleRook && getType(castleRook) === "rook" && isFirstMove(castleRook) && color === getColor(castleRook)) {
            movePiece(castleRook, castleSquare)
            castle = true
        }
    }

    if (isPassant) {
        pieceToCapture = getPieceBySquare(lastRound().squareDestination)
        capturePiece(pieceToCapture)
        setPassant(false)
        passant = true
    }

    movePiece(piece, squareDestination)

    const currentGameInfo = {
        round,
        roundPerMove,
        squareOrigin,
        squareDestination,
        castle,
        passant,
        promoted,
        escapedFromCheck,
        piece: {
            name: getName(piece),
            type: getType(piece),
            move: getPieceMove(piece),
            color,
        },
        capturedPiece: pieceToCapture
            ? {
                name: getName(pieceToCapture),
                type: getType(pieceToCapture),
                color: getColor(pieceToCapture),
                square: getSquare(pieceToCapture),
                move: getPieceMove(pieceToCapture),
            }
            : null,
        currentPieces: getPieces().map(p => ({
            name: getName(p),
            type: getType(p),
            color: getColor(p),
            square: getSquare(p),
            move: getPieceMove(p),
        }))
    }

    if (turn === "black") {
        incrementRound()
    }

    incrementRoundPerMove()
    swapTurn()
    checkCheck()
    checkStalemate()
    checkLackOfMaterial()

    currentGameInfo.check = check
    currentGameInfo.checkMate = checkMate
    currentGameInfo.draw = draw
    currentGameInfo.staleMate = staleMate
    currentGameInfo.drawByLackOfMaterial = drawByLackOfMaterial
    gameHistory.push(currentGameInfo)
    
    checkRepetition()
    checkFiftyMoves()

    if (gameHistory.length) {
        buttonUndo.removeAttribute("disabled")
    } else {
        buttonUndo.setAttribute("disabled", true)
    }

    showRoundStatus(
        color,
        promoted,
        piece,
        pieceToCapture,
        squareOrigin,
        squareDestination,
        castle,
        passant,
    )

    storageGame()
}

/**
 * Promotes a pawn before moving it
 * @param {HTMLElement} piece 
 * @param {HTMLElement} squareTarget 
 */
const promotion = (piece, squareTarget) => {
    board.append(promotionElement(getColor(piece)))
    const square = getSquare(squareTarget)

    promotionOptions().forEach(opt => {
        opt.addEventListener("click", ({ target }) => {
            replaceClass(piece, "fa-chess-pawn", `fa-chess-${getType(target)}`)
            setType(piece, getType(target))
            setName(piece, `${getName(piece)}-promoted-to-${getType(target)}`)
            promotionList().remove()
            movement(piece, squareTarget, true)
        })
    })
}

/**
 * Selects a specified piece when mouse is over
 * @param {HTMLElement} piece 
 */
const selectPiece = piece => {
    if (checkMate || draw || hasClass(piece, "captured")) {
        return
    }

    setPassant(false)
    addClass(piece, "active")
    setMoveSquares(piece)
}

const disselectPiece = piece => {
    if (checkMate || draw || hasClass(piece, "captured")) {
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
    if (checkMate || draw || hasClass(piece, "captured")) {
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
                    promotion(piece, target)
                } else {
                    movement(piece, target)
                }
            })
        })
    }
}

/**
 * Undo lhe last piece movement
 * @returns {void}
 */
const undoMove = () => {
    if (!lastRound() || checkMate || draw) {
        return
    }

    let piece = getPiecesByColor(lastRound().piece.color).find(p => getName(p) === lastRound().piece.name)

    movePiece(piece, lastRound().squareOrigin, true)

    if (lastRound().capturedPiece) {
        let capturedPiece = getCapturedPieces().find(p =>
            getName(p) === lastRound().capturedPiece.name && getColor(p) === lastRound().capturedPiece.color)

        if (capturedPiece) {
            let capturedPieceClone = capturedPiece.cloneNode(true)
            capturedPiece.remove()
            removeClass(capturedPieceClone, "captured")
            board.append(capturedPieceClone)
        }
    }

    if (lastRound().castle) {
        let [c, r] = lastRound().squareDestination
        let rookCastle = getPieceBySquare((c === "c" ? "d" : "f") + r)
        let squareToReturn = (c === "c" ? "a" : "h") + r
        movePiece(rookCastle, squareToReturn, true)
    }

    if (lastRound().promoted) {
        let type = getType(piece)
        let name = getName(piece).slice(0, type.length)
        replaceClass(piece, `fa-chess-${type}`, "fa-chess-pawn")
        setType(piece, "pawn")
        setName(piece, name)
    }

    if (lastRound().piece.color === "black" && round > 1) {
        decrementRound()
    }

    if (check) {
        const kingInCheck = getPieces().find(p => hasClass(p, "check") && getType(p) === "king")
        removeClass(kingInCheck, "check")
        piecesCheck.length = 0
        setCheck(false)
    }

    if (lastRound().escapedFromCheck) {
        let kingInCheck = getType(piece) === "king"
            ? piece
            : getPiecesByColor(getColor(piece)).find(p => getType(p) === "king")


        setPiecesCheck(getSquare(kingInCheck), opponent(lastRound().piece.color))
        addClass(kingInCheck, "check")
        setCheck(true)
    }

    swapTurn()
    decrementRoundPerMove()
    gameHistory.pop()

    if (!lastRound()) {
        buttonUndo.setAttribute("disabled", true)
    }

    storageGame()
    console.log("\n<< UNDONE MOVE")
}

/**
 * Restarts the game
 * @returns {void}
 */
const restartGame = () => {
    if (!checkMate && !draw) {
        let confirmRestart = window.confirm("Deseja iniciar um novo jogo?")

        if (!confirmRestart) {
            return
        }
    }

    let defeatedIcon = getElement(".defeated")
    let winnerIcon = getElement("div.winner")
    let drawIcons = getElements("div.draw")

    if (defeatedIcon) {
        defeatedIcon.remove()
    }

    if (winnerIcon) {
        winnerIcon.remove()
    }

    if (drawIcons && drawIcons.length) {
        drawIcons.forEach(icon => icon.remove())
    }

    getPieces().forEach(piece => piece.remove())
    capturedWhitePiecesArea.innerHTML = ""
    capturedBlackPiecesArea.innerHTML = ""
    gameHistory.length = 0
    piecesCheck.length = 0
    setPassant(false)
    setCheck(false)
    setStaleMate(false)
    setDrawByRepetition(false)
    setDrawByLackOfMaterial(false)
    setDrawAfterFiftyMoves(false)
    resetCheckMate()
    resetDraw()
    resetRound()
    resetRoundPerMove()
    resetTurn()

    if (reviewButton()) {
        reviewButton().remove()
    }

    buttonUndo.setAttribute("disabled", true)
    controllerButtons().forEach(button => button.remove())
    clearStoragedGame()

    Pieces()
    Moves()
    console.clear()
}

export default function Moves() {
    getPieces().forEach(piece => {
        piece.addEventListener("mouseenter", ({ target }) => {
            if (getColor(target) === turn) {
                selectPiece(target)
            }
        })

        piece.addEventListener("click", ({ target }) => {
            if (getColor(target) === turn) {
                defineMove(target)
            }
        })

        piece.addEventListener("mouseleave", ({ target }) => {
            if (getColor(target) === turn) {
                disselectPiece(target)
            }
        })
    })

    if (!checkMate && !draw) {
        removeClass(buttonUndo, "hidden")
    }

    buttonUndo.addEventListener("click", undoMove)
    buttonRestart.addEventListener("click", restartGame)
}