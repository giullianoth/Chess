import { setPiecesCheck } from "./check.js"
import ShowReviewButton from "./review.js"
import { addClass, board, buttonUndo, defeatedIcon, drawIcon, endGameByCheckMate, endGameByDraw, gameHistory, getCapturedPiecesByColor, getColor, getCoordinateBySquare, getName, getPieces, getPiecesByColor, getSquare, getType, hasClass, insertCapturedPieces, opponent, removeClass, setCheck, setColor, setDrawAfterFiftyMoves, setDrawByLackOfMaterial, setDrawByRepetition, setMove, setName, setPassant, setRound, setRoundPerMove, setSquare, setStaleMate, setStyle, setTurn, setType, showRoundStatus, storagedGame, winnerIcon } from "./variables.js"

/**
 * The pieces list of each player
 */
export const piecesList = ["pawn1", "pawn2", "pawn3", "pawn4", "pawn5", "pawn6", "pawn7", "pawn8", "rook1", "rook2", "knight1", "knight2", "bishop1", "bishop2", "queen", "king"]
// export const piecesList = ["pawn2", "bishop1", "king"]

/**
 * Returns the initial square of every piece
 * @param {string} color 
 * @param {string} pieceName 
 * @returns {string}
 */
const initialSquare = (color, pieceName) => {
    switch (pieceName) {
        case "pawn1":
            return color === "white" ? "a2" : "a7"

        case "pawn2":
            return color === "white" ? "b2" : "b7"

        case "pawn3":
            return color === "white" ? "c2" : "c7"

        case "pawn4":
            return color === "white" ? "d2" : "d7"

        case "pawn5":
            return color === "white" ? "e2" : "e7"

        case "pawn6":
            return color === "white" ? "f2" : "f7"

        case "pawn7":
            return color === "white" ? "g2" : "g7"

        case "pawn8":
            return color === "white" ? "h2" : "h7"

        case "rook1":
            return color === "white" ? "a1" : "a8"

        case "rook2":
            return color === "white" ? "h1" : "h8"

        case "knight1":
            return color === "white" ? "b1" : "b8"

        case "knight2":
            return color === "white" ? "g1" : "g8"

        case "bishop1":
            return color === "white" ? "c1" : "c8"

        case "bishop2":
            return color === "white" ? "f1" : "f8"

        case "queen":
            return color === "white" ? "d1" : "d8"

        case "king":
            return color === "white" ? "e1" : "e8"
    }
}

/**
 * Returns the HTML element of an existing piece from browser local storage
 * @param {string} name 
 * @param {string} color 
 * @param {string} type 
 * @param {string} square 
 * @param {number} move 
 * @returns {HTMLElement}
 */
const existingPieceElement = (name, color, type, square, move) => {
    let element = document.createElement("i")
    let { top, left } = getCoordinateBySquare(square)

    element.className = `fa-solid fa-chess-${type} piece ${color}`
    setType(element, type)
    setName(element, name)
    setColor(element, color)
    setSquare(element, square)
    setMove(element, move)

    setStyle(element, "top", `${top}px`)
    setStyle(element, "left", `${left}px`)

    return element
}

/**
 * Arrange pieces from a previously saved game
 * @param {{
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
 * }[]} savedGame 
 */
const arrangeExistingPieces = (savedGame) => {
    const lastSavedRound = savedGame[savedGame.length - 1]
    const capturedPieces = savedGame.filter(info => info.capturedPiece).map(info => info.capturedPiece)

    setRound(lastSavedRound.round + (lastSavedRound.piece.color === "white" ? 0 : 1))
    setRoundPerMove(lastSavedRound.roundPerMove + 1)
    setTurn(opponent(lastSavedRound.piece.color))

    lastSavedRound.currentPieces.forEach(pieceInfo => {
        const piece = existingPieceElement(
            pieceInfo.name,
            pieceInfo.color,
            pieceInfo.type,
            pieceInfo.square,
            pieceInfo.move,
        )

        board.append(piece)
    })

    if (capturedPieces.length) {
        capturedPieces.forEach(pieceInfo => {
            const piece = existingPieceElement(
                pieceInfo.name,
                pieceInfo.color,
                pieceInfo.type,
                pieceInfo.square,
                pieceInfo.move,
            )

            addClass(piece, "captured")
            insertCapturedPieces(piece)
        })
    }

    savedGame.forEach(gameInfo => {
        gameHistory.push(gameInfo)

        const currentPiece = existingPieceElement(
            gameInfo.piece.name,
            gameInfo.piece.color,
            gameInfo.piece.type,
            gameInfo.squareDestination,
            gameInfo.piece.move,
        )

        const capturedPiece = gameInfo.capturedPiece
            ? getPiecesByColor(gameInfo.capturedPiece.color).find(piece => getName.piece === gameInfo.capturedPiece.name)
            : null

        setCheck(gameInfo.check)

        if (gameInfo.checkMate) {
            const king = getPiecesByColor(opponent()).find(piece => getType(piece) === "king")
            const kingInCheck = getPiecesByColor().find(piece => getType(piece) === "king")

            addClass(king, "winner")
            board.append(winnerIcon(getSquare(king)))
            board.append(defeatedIcon(getSquare(kingInCheck)))
            getPieces().forEach(piece => addClass(piece, "afterEndGame"))
            addClass(buttonUndo, "hidden")

            endGameByCheckMate()
            ShowReviewButton()
        }

        if (gameInfo.draw && lastSavedRound.roundPerMove === gameInfo.roundPerMove) {
            const kings = getPieces().filter(piece => getType(piece) === "king")

            kings.forEach(king => {
                addClass(king, "draw")
                board.append(drawIcon(getSquare(king)))
            })

            getPieces().forEach(piece => addClass(piece, "afterEndGame"))
            addClass(buttonUndo, "hidden")

            setStaleMate(gameInfo.staleMate)
            setDrawByRepetition(gameInfo.drawByRepetition)
            setDrawByLackOfMaterial(gameInfo.drawByLackOfMaterial)
            setDrawAfterFiftyMoves(gameInfo.drawAfterFiftyMoves)
            endGameByDraw()
            ShowReviewButton()
        }

        showRoundStatus(
            gameInfo.piece.color,
            gameInfo.promoted,
            currentPiece,
            capturedPiece,
            gameInfo.squareDestination,
            gameInfo.squareDestination,
            gameInfo.castle,
            gameInfo.passant,
            gameInfo.round
        )
    })

    if (lastSavedRound.check) {
        const kingInCheck = getPiecesByColor().find(piece => getType(piece) === "king")
        addClass(kingInCheck, "check")
        setPiecesCheck(getSquare(kingInCheck))
    }

    buttonUndo.removeAttribute("disabled")
}

/**
 * Returns the HTML element of a piece
 * @param {string} pieceName 
 * @param {string} color 
 * @returns {HTMLElement}
 */
export const pieceElement = (pieceName, color) => {
    let element = document.createElement("i")
    let pieceType = pieceName !== "queen" && pieceName !== "king" ? pieceName.substring(0, pieceName.length - 1) : pieceName
    let square = initialSquare(color, pieceName)
    let { top, left } = getCoordinateBySquare(square)

    element.className = `fa-solid fa-chess-${pieceType} piece ${color}`
    setType(element, pieceType)
    setName(element, pieceName)
    setColor(element, color)
    setSquare(element, square)
    setMove(element, 0)

    setStyle(element, "top", `${top}px`)
    setStyle(element, "left", `${left}px`)

    return element
}

export default function Pieces() {
    if (storagedGame() && storagedGame().length) {
        arrangeExistingPieces(storagedGame())
        return
    }

    piecesList.forEach(pieceName => {
        board.append(pieceElement(pieceName, "white"))
        board.append(pieceElement(pieceName, "black"))
    })
}