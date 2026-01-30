import { pieceElement } from "./pieces.js"
import { addClass, backwardsRoundButton, board, controllersArea, endGameIcons, firstRoundButton, forwardsRoundButton, gameHistory, getCapturedPiecesByColor, getColor, getName, getPieces, getPiecesByColor, getSquare, getType, insertCapturedPieces, lastRoundButton, movePieceOnReview, piecesList, removeClass, reviewButton, reviewButtonElement, reviewControllersElement, roundPerMove } from "./variables.js"

/**
 * The last game history after checkmate
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
const roundsToReview = () => {
    const currentWhitePieces = piecesList.map(pieceName => {
        const piece = pieceElement(pieceName, "white")

        return {
            type: getType(piece),
            name: getName(piece),
            color: "white",
            square: getSquare(piece),
            moves: 0
        }
    })

    const currentBlackPieces = piecesList.map(pieceName => {
        const piece = pieceElement(pieceName, "black")

        return {
            type: getType(piece),
            name: getName(piece),
            color: "black",
            square: getSquare(piece),
            moves: 0
        }
    })

    const currentPieces = currentWhitePieces.concat(currentBlackPieces)

    const initialPosition = {
        round: 0,
        roundPerMove: 0,
        pieceName: "",
        pieceType: "",
        pieceMove: 0,
        pieceColor: "",
        squareOrigin: "",
        squareDestination: "",
        castle: false,
        promoted: false,
        enPassant: false,
        turn: "",
        check: false,
        checkMate: false,
        currentPieces
    }

    return [initialPosition, ...gameHistory]
}

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
    const firstRound = roundsToReview()[0]
    const lastCapturedPieces = roundsToReview()[roundsToReview().length - 1].capturedPieces

    if (lastCapturedPieces && lastCapturedPieces.length) {
        lastCapturedPieces.forEach(pieceInfo => {
            const capturedPieceColor = pieceInfo.piece.color
            const capturedPieceName = pieceInfo.piece.name
            const capturedPiece = getCapturedPiecesByColor(capturedPieceColor).find(piece => getName(piece) === capturedPieceName)

            capturedPiece.remove()
            removeClass(capturedPiece, "captured")
            board.append(capturedPiece)
        })
    }

    firstRound.currentPieces.forEach(pieceInfo => {
        const piece = getPieces().find(p => getName(p) === pieceInfo.name && getColor(p) === pieceInfo.color)
        console.log(piece)
        movePieceOnReview(piece, pieceInfo.square, pieceInfo.moves)
    })

    if (roundsToReview().indexOf(firstRound) < roundsToReview().length - 1) {
        lastRoundButton().removeAttribute("disabled")
        forwardsRoundButton().removeAttribute("disabled")
    }

    firstRoundButton().setAttribute("disabled", true)
    backwardsRoundButton().setAttribute("disabled", true)

    const kings = getPieces().filter(piece => getType(piece) === "king")
    kings.forEach(king => addClass(king, "inReview"))

    endGameIcons().forEach(icon => addClass(icon, "hidden"))
    setCurrentRoundIndex(0)
}

/**
 * Shows the last round of the game
 */
const goToLastRound = () => {
    const lastRoundIndex = roundsToReview().length - 1
    const lastRound = roundsToReview()[lastRoundIndex]
    const capturedPiecesReference = roundsToReview().filter(roundInfo => roundInfo.capturedPieces)

    const lastCapturedPieces = capturedPiecesReference
        ? capturedPiecesReference[capturedPiecesReference.length - 1].capturedPieces
        : []

    if (lastCapturedPieces && lastCapturedPieces.length) {
        lastCapturedPieces.forEach(pieceInfo => {
            const pieceToCaptureColor = pieceInfo.piece.color
            const pieceToCaptureName = pieceInfo.piece.name
            const pieceToCapture = getPiecesByColor(pieceToCaptureColor).find(piece => getName(piece) === pieceToCaptureName)

            pieceToCapture.remove()
            addClass(pieceToCapture, "captured")
            insertCapturedPieces(pieceToCapture)
        })
    }

    lastRound.currentPieces.forEach(pieceInfo => {
        const piece = getPieces().find(p => getName(p) === pieceInfo.name && getColor(p) === pieceInfo.color)
        movePieceOnReview(piece, pieceInfo.square, pieceInfo.moves)
    })

    if (roundsToReview().indexOf(lastRound) === roundsToReview().length - 1) {
        lastRoundButton().setAttribute("disabled", true)
        forwardsRoundButton().setAttribute("disabled", true)
    }

    firstRoundButton().removeAttribute("disabled")
    backwardsRoundButton().removeAttribute("disabled")

    const kings = getPieces().filter(piece => getType(piece) === "king")
    kings.forEach(king => removeClass(king, "inReview"))

    endGameIcons().forEach(icon => removeClass(icon, "hidden"))
    setCurrentRoundIndex(roundsToReview().length - 1)
}

/**
 * Goes back a round in game review
 * @returns {void}
 */
const goBackRound = () => {
    const index = currentRoundIndex - 1
    const currentRound = roundsToReview()[index]
    const lastCapturedPieces = roundsToReview()[index + 1].capturedPieces

    if (!currentRound) {
        return
    }

    if (lastCapturedPieces && lastCapturedPieces.some(pieceInfo => pieceInfo.roundPerMove === currentRound.roundPerMove + 1)) {
        const capturedPieceIndex = lastCapturedPieces.length - 1
        const capturedPieceColor = lastCapturedPieces[capturedPieceIndex].piece.color
        const capturedPieceName = lastCapturedPieces[capturedPieceIndex].piece.name
        const capturedPiece = getCapturedPiecesByColor(capturedPieceColor).find(piece => getName(piece) === capturedPieceName)

        capturedPiece.remove()
        removeClass(capturedPiece, "captured")
        board.append(capturedPiece)
    }

    currentRound.currentPieces.forEach(pieceInfo => {
        const piece = getPieces().find(p => getName(p) === pieceInfo.name && getColor(p) === pieceInfo.color)
        movePieceOnReview(piece, pieceInfo.square, pieceInfo.moves)
    })

    if (index < roundsToReview().length - 1) {
        lastRoundButton().removeAttribute("disabled")
        forwardsRoundButton().removeAttribute("disabled")

        const kings = getPieces().filter(piece => getType(piece) === "king")
        kings.forEach(king => addClass(king, "inReview"))

        endGameIcons().forEach(icon => addClass(icon, "hidden"))
    }

    if (index === 0) {
        firstRoundButton().setAttribute("disabled", true)
        backwardsRoundButton().setAttribute("disabled", true)
    }

    setCurrentRoundIndex(index)
}

/**
 * Goes forward a round in game review
 * @returns {void}
 */
const forwardRound = () => {
    const index = currentRoundIndex + 1
    const currentRound = roundsToReview()[index]
    const lastCapturedPieces = currentRound.capturedPieces

    if (!currentRound) {
        return
    }

    if (lastCapturedPieces && lastCapturedPieces.some(pieceInfo => pieceInfo.roundPerMove === currentRound.roundPerMove)) {
        const pieceToCaptureIndex = lastCapturedPieces.length - 1
        const pieceToCaptureColor = lastCapturedPieces[pieceToCaptureIndex].piece.color
        const pieceToCaptureName = lastCapturedPieces[pieceToCaptureIndex].piece.name
        const pieceToCapture = getPiecesByColor(pieceToCaptureColor).find(piece => getName(piece) === pieceToCaptureName)

        pieceToCapture.remove()
        addClass(pieceToCapture, "captured")
        insertCapturedPieces(pieceToCapture)
    }

    currentRound.currentPieces.forEach(pieceInfo => {
        const piece = getPieces().find(p => getName(p) === pieceInfo.name && getColor(p) === pieceInfo.color)
        movePieceOnReview(piece, pieceInfo.square, pieceInfo.moves)
    })

    if (index === roundsToReview().length - 1) {
        lastRoundButton().setAttribute("disabled", true)
        forwardsRoundButton().setAttribute("disabled", true)

        const kings = getPieces().filter(piece => getType(piece) === "king")
        kings.forEach(king => removeClass(king, "inReview"))

        endGameIcons().forEach(icon => removeClass(icon, "hidden"))
    }

    if (index > 0) {
        firstRoundButton().removeAttribute("disabled")
        backwardsRoundButton().removeAttribute("disabled")
    }

    setCurrentRoundIndex(index)
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
 * Shows the review of game button after checkmate
 */
export default function ShowReviewButton() {
    controllersArea.append(reviewButtonElement())
    reviewButton().addEventListener("click", reviewGame)
}