import { getAvailableCaptures, getAvailableMoves, pin } from "./getAvailableMoves.js"
import { bishopLine } from "./pieceMoves/bishop.js"
import { queenLine } from "./pieceMoves/queen.js"
import { rookLine } from "./pieceMoves/rook.js"
import { addClass, getPiecesByColor, getSquare, getType, opponent, piecesCheck, setCheck, turn } from "./variables.js"

/**
 * Verifies if the next player is in check
 */
export const checkCheck = () => {
    let king = getPiecesByColor().find(piece => getType(piece) === "king")
    let square = getSquare(king)

    getPiecesByColor(opponent()).forEach(piece => {
        if (getAvailableCaptures(piece).length && getAvailableCaptures(piece).includes(square)) {
            piecesCheck.push(piece)
        }
    })

    if (piecesCheck.length) {
        addClass(king, "check")
        setCheck(true)
    }
}

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
            moves = availableMoves.filter(square => pin().includes(square))
        }
    }

    return moves
}

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