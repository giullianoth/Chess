import { getAvailableCaptures, getAvailableMoves } from "./available-moves.js"
import ShowReviewButton from "./review.js"
import { addClass, arrayFiftyMovesLimit, arrayRepetitionLimit, board, buttonUndo, checkMate, draw, drawAfterFiftyMoves, drawByRepetition, drawIcon, endGameByDraw, fiftyMovesCount, gameHistory, getPieces, getPiecesByColor, getSquare, getSquaresFromBoard, getType, incrementRepetitionIndex, lastRound, repetitionCount, repetitionIndex, resetFiftyMovesCount, resetRepetitionCount, setDrawAfterFiftyMoves, setDrawByLackOfMaterial, setDrawByRepetition, setStaleMate, storageGame } from "./variables.js"

export const checkStalemate = () => {
    if (checkMate) {
        return
    }

    const hasPieceMoves = getPiecesByColor().some(piece =>
        getAvailableMoves(piece).length || getAvailableCaptures(piece).length)

    if (!hasPieceMoves) {
        const kings = getPieces().filter(piece => getType(piece) === "king")

        kings.forEach(king => {
            addClass(king, "draw")
            board.append(drawIcon(getSquare(king)))
        })

        getPieces().forEach(piece => addClass(piece, "afterEndGame"))
        setStaleMate(true)
        endGameByDraw()

        addClass(buttonUndo, "hidden")
        ShowReviewButton()
    }
}

export const checkRepetition = () => {
    const lastPiece = lastRound().piece
    const squareDestination = lastRound().squareDestination
    const squareOrigin = lastRound().squareOrigin

    repetitionCount.push({
        piece: lastPiece,
        squareDestination,
        squareOrigin,
    })

    if (repetitionIndex >= 2) {
        const currentRepetitionInfo = repetitionCount[repetitionIndex]
        const repetitionInfoToCompare = repetitionCount[repetitionIndex - 2]

        if (
            currentRepetitionInfo.piece.name !== repetitionInfoToCompare.piece.name ||
            currentRepetitionInfo.piece.color !== repetitionInfoToCompare.piece.color ||
            currentRepetitionInfo.squareDestination !== repetitionInfoToCompare.squareOrigin
        ) {
            resetRepetitionCount()
            return
        }
    }

    incrementRepetitionIndex()

    if (repetitionIndex === arrayRepetitionLimit) {
        const kings = getPieces().filter(piece => getType(piece) === "king")

        kings.forEach(king => {
            addClass(king, "draw")
            board.append(drawIcon(getSquare(king)))
        })

        getPieces().forEach(piece => addClass(piece, "afterEndGame"))
        setDrawByRepetition(true)
        endGameByDraw()

        addClass(buttonUndo, "hidden")
        ShowReviewButton()
    }

    const currentRound = gameHistory[gameHistory.length - 1]

    const updatedGameHistory = gameHistory.map(info => info.roundPerMove === currentRound.roundPerMove
        ? { ...info, draw, drawByRepetition }
        : info)

    updatedGameHistory.forEach((info, index) => {
        gameHistory[index] = info
    })

    storageGame()
}

export const checkLackOfMaterial = () => {
    const whitePieces = getPiecesByColor("white")
    const blackPieces = getPiecesByColor("black")

    const thereAreOnlyKings = whitePieces.length === 1 && blackPieces.length === 1

    const thereAreOnlyKingAndKight = (whitePieces.length === 1
        && blackPieces.length === 2
        && blackPieces.some(piece => getType(piece) === "knight"))
        || (blackPieces.length === 1
            && whitePieces.length === 2
            && whitePieces.some(piece => getType(piece) === "knight"))

    const thereAreOnlyKingAndBishop = (whitePieces.length === 1
        && blackPieces.length === 2
        && blackPieces.some(piece => getType(piece) === "bishop"))
        || (blackPieces.length === 1
            && whitePieces.length === 2
            && whitePieces.some(piece => getType(piece) === "bishop"))

    const thereAreOnlyKingAndBishops = () => {
        const thereAreBishops = whitePieces.length === 2
            && whitePieces.some(piece => getType(piece) === "bishop")
            && blackPieces.length === 2
            && blackPieces.some(piece => getType(piece) === "bishop")

        if (!thereAreBishops) {
            return false
        }

        const whiteBishop = whitePieces.find(piece => getType(piece) === "bishop")
        const blackBishop = blackPieces.find(piece => getType(piece) === "bishop")

        const whiteBishopSquares = Array.from(
            getSquaresFromBoard()
                .find(square => getSquare(square) === getSquare(whiteBishop))
                .classList
        )[1]

        const blackBishopSquares = Array.from(
            getSquaresFromBoard()
                .find(square => getSquare(square) === getSquare(blackBishop))
                .classList
        )[1]

        return whiteBishopSquares === blackBishopSquares
    }

    if (
        thereAreOnlyKings
        || thereAreOnlyKingAndKight
        || thereAreOnlyKingAndBishop
        || thereAreOnlyKingAndBishops()
    ) {
        const kings = getPieces().filter(piece => getType(piece) === "king")

        kings.forEach(king => {
            addClass(king, "draw")
            board.append(drawIcon(getSquare(king)))
        })

        getPieces().forEach(piece => addClass(piece, "afterEndGame"))
        setDrawByLackOfMaterial(true)
        endGameByDraw()

        addClass(buttonUndo, "hidden")
        ShowReviewButton()
    }
}

export const checkFiftyMoves = () => {
    const hasCapturedPiece = lastRound().capturedPiece ? true : false
    const hasPawnMovement = lastRound().piece.type === "pawn"

    if (hasCapturedPiece || hasPawnMovement) {
        resetFiftyMovesCount()
        return
    }

    fiftyMovesCount.push(lastRound())

    if (fiftyMovesCount.length === arrayFiftyMovesLimit) {
        const kings = getPieces().filter(piece => getType(piece) === "king")

        kings.forEach(king => {
            addClass(king, "draw")
            board.append(drawIcon(getSquare(king)))
        })

        getPieces().forEach(piece => addClass(piece, "afterEndGame"))
        setDrawAfterFiftyMoves(true)
        endGameByDraw()

        addClass(buttonUndo, "hidden")
        ShowReviewButton()
    }

    const currentRound = gameHistory[gameHistory.length - 1]

    const updatedGameHistory = gameHistory.map(info => info.roundPerMove === currentRound.roundPerMove
        ? { ...info, draw, drawAfterFiftyMoves }
        : info)

    updatedGameHistory.forEach((info, index) => {
        gameHistory[index] = info
    })

    storageGame()
}