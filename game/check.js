import { getAvailableCaptures, getAvailableMoves } from "./getAvailableMoves.js"
import { bishopLine, bishopPin } from "./pieceMoves/bishop.js"
import { queenLine, queenPin } from "./pieceMoves/queen.js"
import { rookLine, rookPin } from "./pieceMoves/rook.js"
import { addClass, board, buttonUndo, defeatedIcon, endGame, getColor, getPieces, getPiecesByColor, getSquare, getType, opponent, piecesCheck, setCheck, winnerIcon } from "./variables.js"

/**
 * Sets the list of pieces those attack the opponent king
 * @param {string} square 
 */
export const setPiecesCheck = (square) => {
    getPiecesByColor(opponent()).forEach(piece => {
        if (getAvailableCaptures(piece).length && getAvailableCaptures(piece).includes(square)) {
            piecesCheck.push(piece)
        }
    })
}

/**
 * Verifies if the next player is in check
 */
export const checkCheck = () => {
    let king = getPiecesByColor().find(piece => getType(piece) === "king")
    let square = getSquare(king)
    let color = getColor(king)

    setPiecesCheck(square)

    if (piecesCheck.length) {
        addClass(king, "check")
        setCheck(true)

        if (getPiecesByColor(color).every(piece => !moveScape(piece).length && !captureScape(piece).length)) {
            let opponentKing = getPiecesByColor(opponent()).find(piece => getType(piece) === "king")

            board.append(defeatedIcon(square))
            board.append(winnerIcon(getSquare(opponentKing)))
            getPieces().forEach(piece => addClass(piece, "afterEndGame"))
            addClass(opponentKing, "winner")
            endGame()

            addClass(buttonUndo, "hidden")
        }
    }
}

/**
 * Returns the list of available moves of a specified piece, when the king is in check
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const moveScape = piece => {
    let moves = []
    let availableMoves = getAvailableMoves(piece)
    let type = getType(piece)

    if (type === "king") {
        let list = []

        piecesCheck.forEach(p => {
            switch (getType(p)) {
                case "rook":
                    list.push(...rookLine(p, piece))
                    break

                case "bishop":
                    list.push(...bishopLine(p, piece))
                    break

                case "queen":
                    list.push(...queenLine(p, piece))
                    break
            }
        })

        moves = availableMoves.filter(s => !list.includes(s))
    } else {
        if (availableMoves.length && piecesCheck.length === 1) {
            switch (getType(piecesCheck[0])) {
                case "rook":
                    moves = availableMoves.filter(square => rookPin(piecesCheck[0]).includes(square))
                    break

                case "bishop":
                    moves = availableMoves.filter(square => bishopPin(piecesCheck[0]).includes(square))
                    break

                case "queen":
                    moves = availableMoves.filter(square => queenPin(piecesCheck[0]).includes(square))
                    break
            }
        }
    }

    return moves
}

/**
 * Returns the list of available captures of a specified piece, when the king is in check
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const captureScape = piece => {
    let captures = []
    let availableCaptures = getAvailableCaptures(piece)
    let type = getType(piece)

    if (type === "king") {
        let list = []

        piecesCheck.forEach(p => {
            switch (getType(p)) {
                case "rook":
                    list.push(...rookLine(p, piece).filter(s => s !== getSquare(p)))
                    break

                case "bishop":
                    list.push(...bishopLine(p, piece).filter(s => s !== getSquare(p)))
                    break

                case "queen":
                    list.push(...queenLine(p, piece).filter(s => s !== getSquare(p)))
                    break
            }
        })

        captures = availableCaptures.filter(s => !list.includes(s))
    } else {
        if (availableCaptures.length && piecesCheck.length === 1) {
            captures = availableCaptures.filter(square => square === getSquare(piecesCheck[0]))
        }
    }

    return captures
}