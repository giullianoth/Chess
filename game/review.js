import { pieceElement, piecesList } from "./pieces.js"
import { addClass, backwardsRoundButton, board, controllersArea, drawAfterFiftyMoves, drawByLackOfMaterial, drawByRepetition, endGameIcons, firstRoundButton, forwardsRoundButton, gameHistory, getCapturedPieces, getCapturedPiecesByColor, getName, getPieceBySquare, getPieceMove, getPieces, getPiecesByColor, getSquare, getType, hasClass, insertCapturedPieces, lastRoundButton, movePiece, movePieceOnReview, opponent, removeClass, replaceClass, reviewButton, reviewButtonElement, setName, setType, staleMate } from "./variables.js"

/**
 * Element of a controller review button
 * @param {string} className 
 * @param {string} title 
 * @param {string} iconName 
 * @returns {HTMLButtonElement}
 */
const reviewControllersElement = (className, title, iconName) => {
    const element = document.createElement("button")
    const icon = document.createElement("i")
    element.className = className
    element.setAttribute("title", title)
    icon.className = `fa-solid fa-${iconName}`
    element.append(icon)
    return element
}

/**
 * The last game history after checkmate
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
const roundsToReview = () => {
    const currentWhitePieces = piecesList.map(pieceName => {
        const piece = pieceElement(pieceName, "white")

        return {
            name: getName(piece),
            type: getType(piece),
            color: "white",
            square: getSquare(piece),
            moves: 0
        }
    })

    const currentBlackPieces = piecesList.map(pieceName => {
        const piece = pieceElement(pieceName, "black")

        return {
            name: getName(piece),
            type: getType(piece),
            color: "black",
            square: getSquare(piece),
            moves: 0,
        }
    })

    const currentPieces = currentWhitePieces.concat(currentBlackPieces)

    const initialPosition = {
        round: 0,
        roundPerMove: 0,
        squareOrigin: "",
        squareDestination: "",
        castle: false,
        passant: false,
        promoted: false,
        escapeFromCheck: false,
        check: false,
        checkMate: false,
        draw: false,
        staleMate: false,
        drawByRepetition: false,
        drawByLackOfMaterial: false,
        drawAfterFiftyMoves: false,
        currentPieces,
        capturedPiece: null,
        piece: {
            name: "",
            type: "",
            color: "",
            move: 0,
        }
    }

    return [initialPosition, ...gameHistory]
}

/**
 * The list of current captured pieces
 * @returns {{
 *  name: string,
 *  type: string,
 *  color: string,
 *  square: string,
 *  moves: number
 * }[]}
 */
const lastCapturedPieces = () => roundsToReview().filter(info => info.capturedPiece).map(info => info.capturedPiece)

/**
 * The current index from rounds array of game review
 */
let currentRoundIndex = 0

/**
 * Sets the current index from rounds array of game review
 * @param {number} index 
 * @returns {void}
 */
const setCurrentRoundIndex = index => currentRoundIndex = index

/**
 * Shows the first round of the game
 */
const goToFirstRound = () => {
    const roundIndex = 0
    const firstRound = roundsToReview()[roundIndex]
    const capturedPiecesInfo = lastCapturedPieces()

    if (!firstRound) {
        return
    }

    if (capturedPiecesInfo.length) {
        capturedPiecesInfo.forEach(pieceInfo => {
            const piece = getCapturedPiecesByColor(pieceInfo.color).find(p => getName(p) === pieceInfo.name)

            if (piece) {
                piece.remove()
                removeClass(piece, "captured")
                board.append(piece)
            }
        })
    }

    if (gameHistory.some(info => info.promoted)) {
        const promotedPawns = gameHistory.filter(info => info.promoted).map(info => info.piece)

        promotedPawns.forEach(pawnInfo => {
            const pawn = getPiecesByColor(pawnInfo.color).find(piece => getName(piece) === pawnInfo.name)
            const pawnName = pawnInfo.name.slice(0, pawnInfo.type.length)
            replaceClass(pawn, `fa-chess-${pawnInfo.type}`, "fa-chess-pawn")
            setType(pawn, "pawn")
            setName(pawn, pawnName)
        })
    }

    firstRound.currentPieces.forEach(pieceInfo => {
        const piece = getPiecesByColor(pieceInfo.color).find(p => getName(p) === pieceInfo.name)
        movePieceOnReview(piece, pieceInfo.square, pieceInfo.move)

        if (getType(piece) === "king") {
            addClass(piece, "inReview")
        }
    })

    const kings = getPieces().filter(p => getType(p) === "king")
    kings.forEach(king => removeClass(king, "check"))

    endGameIcons().forEach(icon => addClass(icon, "hidden"))

    firstRoundButton().setAttribute("disabled", true)
    backwardsRoundButton().setAttribute("disabled", true)
    lastRoundButton().removeAttribute("disabled")
    forwardsRoundButton().removeAttribute("disabled")

    setCurrentRoundIndex(roundIndex)
}

/**
 * Shows the last round of the game
 */
const goToLastRound = () => {
    const roundIndex = roundsToReview().length - 1
    const lastGameRound = roundsToReview()[roundIndex]
    const capturedPiecesInfo = lastCapturedPieces()

    if (!lastGameRound) {
        return
    }

    if (capturedPiecesInfo.length) {
        capturedPiecesInfo.forEach(pieceInfo => {
            const piece = getPiecesByColor(pieceInfo.color).find(p => getName(p) === pieceInfo.name)

            if (piece) {
                piece.remove()
                addClass(piece, "captured")
                insertCapturedPieces(piece, true)
            }
        })
    }

    if (gameHistory.some(info => info.promoted)) {
        const promotedPawns = gameHistory.filter(info => info.promoted).map(info => info.piece)

        promotedPawns.forEach(pawnInfo => {
            const pawnName = pawnInfo.name.slice(0, pawnInfo.type.length)
            const pawn = getPiecesByColor(pawnInfo.color).find(piece => getName(piece) === pawnName)
            replaceClass(pawn, "fa-chess-pawn", `fa-chess-${pawnInfo.type}`)
            setType(pawn, pawnInfo.type)
            setName(pawn, pawnInfo.name)
        })
    }

    lastGameRound.currentPieces.forEach(pieceInfo => {
        const piece = getPiecesByColor(pieceInfo.color).find(p => getName(p) === pieceInfo.name)
        movePieceOnReview(piece, pieceInfo.square, pieceInfo.move)

        if (getType(piece) === "king") {
            removeClass(piece, "inReview")
        }
    })

    if (lastGameRound.check) {
        const kingColor = lastGameRound.checkMate ? opponent(lastGameRound.piece.color) : lastGameRound.piece.color
        const kingInCheck = getPiecesByColor(kingColor).find(p => getType(p) === "king")

        if (kingInCheck) {
            addClass(kingInCheck, "check")
        }
    }

    endGameIcons().forEach(icon => removeClass(icon, "hidden"))

    firstRoundButton().removeAttribute("disabled")
    backwardsRoundButton().removeAttribute("disabled")
    lastRoundButton().setAttribute("disabled", true)
    forwardsRoundButton().setAttribute("disabled", true)

    setCurrentRoundIndex(roundIndex)
}

/**
 * Goes back a round in game review
 * @returns {void}
 */
const goBackRound = () => {
    const currentRound = roundsToReview()[currentRoundIndex]

    if (!currentRound) {
        return
    }

    if (currentRound.capturedPiece) {
        const capturedPiece = getCapturedPiecesByColor(currentRound.capturedPiece.color).find(p => getName(p) === currentRound.capturedPiece.name)
        capturedPiece.remove()
        removeClass(capturedPiece, "captured")
        board.append(capturedPiece)
    }

    const piece = getPiecesByColor(currentRound.piece.color).find(p => getName(p) === currentRound.piece.name)
    movePieceOnReview(piece, currentRound.squareOrigin, currentRound.piece.move - 1)

    if (currentRound.promoted) {
        const pieceType = getType(piece)
        const pieceName = getName(piece).slice(0, pieceType.length)
        replaceClass(piece, `fa-chess-${pieceType}`, "fa-chess-pawn")
        setType(piece, "pawn")
        setName(piece, pieceName)
    }

    if (currentRound.castle) {
        let [c, r] = currentRound.squareDestination.split("")
        const rookCastle = getPieceBySquare((c === "c" ? "d" : "f") + r)
        const squareToReturn = (c === "c" ? "a" : "h") + r
        movePieceOnReview(rookCastle, squareToReturn, getPieceMove(rookCastle) - 1)
    }

    const kings = getPieces().filter(p => getType(p) === "king")
    kings.forEach(king => removeClass(king, "check"))

    const wasCheck = roundsToReview()[currentRoundIndex - 1].check

    if (wasCheck) {
        const kingInCheck = currentRound.piece.type === "king"
            ? getPiecesByColor(currentRound.piece.color).find(p => getType(p) === "king")
            : null

        if (kingInCheck) {
            addClass(kingInCheck, "check")
        }
    }

    lastRoundButton().removeAttribute("disabled")
    forwardsRoundButton().removeAttribute("disabled")

    if (currentRoundIndex - 1 === 0) {
        firstRoundButton().setAttribute("disabled", true)
        backwardsRoundButton().setAttribute("disabled", true)
    }

    if (currentRoundIndex < roundsToReview().length) {
        kings.forEach(king => addClass(king, "inReview"))
        endGameIcons().forEach(icon => addClass(icon, "hidden"))
    }

    setCurrentRoundIndex(currentRoundIndex - 1)
}

/**
 * Goes forward a round in game review
 * @returns {void}
 */
const forwardRound = () => {
    const currentRound = roundsToReview()[currentRoundIndex + 1]

    if (!currentRound) {
        return
    }

    if (currentRound.capturedPiece) {
        const capturedPiece = getPiecesByColor(currentRound.capturedPiece.color).find(p => getName(p) === currentRound.capturedPiece.name)
        capturedPiece.remove()
        addClass(capturedPiece, "captured")
        insertCapturedPieces(capturedPiece, true)
    }

    const piece = getPiecesByColor(currentRound.piece.color).find(p =>
        getName(p) === (currentRound.promoted ? currentRound.piece.name.slice(0, currentRound.piece.type.length) : currentRound.piece.name))

    if (currentRound.promoted) {
        replaceClass(piece, "fa-chess-pawn", `fa-chess-${currentRound.piece.type}`)
        setType(piece, currentRound.piece.type)
        setName(piece, currentRound.piece.name)
    }

    movePieceOnReview(piece, currentRound.squareDestination, currentRound.piece.move)

    if (currentRound.castle) {
        let [c, r] = currentRound.squareDestination.split("")
        const castleSquare = (c === "c" ? "d" : "f") + r
        const castleRook = getPieceBySquare((c === "c" ? "a" : "h") + r)
        movePieceOnReview(castleRook, castleSquare, getPieceMove(castleRook) + 1)
    }

    const kings = getPieces().filter(p => getType(p) === "king")
    kings.forEach(king => removeClass(king, "check"))

    if (currentRound.check) {
        const kingInCheck = getPiecesByColor(opponent(currentRound.piece.color)).find(p => getType(p) === "king")

        if (kingInCheck) {
            addClass(kingInCheck, "check")
        }
    }

    firstRoundButton().removeAttribute("disabled")
    backwardsRoundButton().removeAttribute("disabled")

    if (currentRoundIndex + 2 === roundsToReview().length) {
        lastRoundButton().setAttribute("disabled", true)
        forwardsRoundButton().setAttribute("disabled", true)

        const kings = getPieces().filter(p => getType(p) === "king")
        kings.forEach(king => removeClass(king, "inReview"))

        endGameIcons().forEach(icon => removeClass(icon, "hidden"))
    }

    setCurrentRoundIndex(currentRoundIndex + 1)
}

/**
 * Sets the game review feature
 */
const reviewGame = () => {
    const firstButtonElement = reviewControllersElement("controller first", "Primeiro lance", "angles-left")
    const lastButtonElement = reviewControllersElement("controller last", "Último lance", "angles-right")
    const backwardsButtonElement = reviewControllersElement("controller backwards", "Voltar lance", "angle-left")
    const forwardsButtonElement = reviewControllersElement("controller forwards", "Avançar lance", "angle-right")

    reviewButton().remove()

    controllersArea.append(
        firstButtonElement,
        backwardsButtonElement,
        forwardsButtonElement,
        lastButtonElement
    )

    setCurrentRoundIndex(roundsToReview().length - 1)

    firstRoundButton().addEventListener("click", goToFirstRound)
    lastRoundButton().addEventListener("click", goToLastRound)
    backwardsRoundButton().addEventListener("click", goBackRound)
    forwardsRoundButton().addEventListener("click", forwardRound)

    lastRoundButton().setAttribute("disabled", true)
    forwardsRoundButton().setAttribute("disabled", true)
}

/**
 * Shows the review of game button after checkmate or draw
 */
export default function ShowReviewButton() {
    controllersArea.append(reviewButtonElement())
    reviewButton().addEventListener("click", reviewGame)
}