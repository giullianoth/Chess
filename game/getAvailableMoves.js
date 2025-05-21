import { bishopCaptures, bishopMoves, bishopPin, bishopPossibleCaptures } from "./pieceMoves/bishop.js";
import { kingCaptures, kingMoves, kingPossibleCaptures } from "./pieceMoves/king.js";
import { knightCaptures, knightMoves, knightPossibleCaptures } from "./pieceMoves/knight.js";
import { pawnCaptures, pawnMoves, pawnPossibleCaptures } from "./pieceMoves/pawn.js";
import { queenCaptures, queenMoves, queenPin, queenPossibleCaptures } from "./pieceMoves/queen.js";
import { rookCaptures, rookMoves, rookPin, rookPossibleCaptures } from "./pieceMoves/rook.js";
import { getColor, getPiecesByColor, getSquare, getType, opponent, squareHasPiece, turn } from "./variables.js";

/**
 * Returns the list of squares if the piece is pinned
 * @param {HTMLElement | null} piece 
 * @returns {string[]}
 */
export const pin = (piece = null) => {
    let pinSquares = []
    let square = piece ? getSquare(piece) : null
    let color = piece ? getColor(piece) : null

    getPiecesByColor(opponent(color ?? turn)).forEach(p => {
        let type = getType(p)

        switch (type) {
            case "rook":
                if (square) {
                    if (rookPin(p).includes(square)) {
                        pinSquares = rookPin(p)
                    }
                } else {
                    pinSquares = rookPin(p)
                }

                break

            case "bishop":
                if (square) {
                    if (bishopPin(p).includes(square)) {
                        pinSquares = bishopPin(p)
                    }
                } else {
                    pinSquares = bishopPin(p)
                }

                break

            case "queen":
                if (square) {
                    if (queenPin(p).includes(square)) {
                        pinSquares = queenPin(p)
                    }
                } else {
                    pinSquares = queenPin(p)
                }

                break
        }
    })

    let squaresToCompare = pinSquares.filter((s, i, arr) => i !== 0 && i !== arr.length - 1 && s !== square)

    if (squaresToCompare.some(s => squareHasPiece(s))) {
        return []
    }

    return pinSquares
}

/**
 * Returns the list of available moves of a specified piece
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const getAvailableMoves = piece => {
    let moves = []
    let type = getType(piece)

    switch (type) {
        case "rook":
            moves = rookMoves(piece)
            break;

        case "bishop":
            moves = bishopMoves(piece)
            break;

        case "queen":
            moves = queenMoves(piece)
            break;

        case "king":
            moves = kingMoves(piece)
            break;

        case "knight":
            moves = knightMoves(piece)
            break;

        case "pawn":
            moves = pawnMoves(piece)
            break;
    }

    if (pin(piece).length && type !== "king") {
        return moves.filter(s => pin(piece).includes(s))
    }

    return moves
}

/**
 * Returns the list of available captures of a specified piece
 * @param {HTMLElement} piece 
 * @returns {string[]}
 */
export const getAvailableCaptures = piece => {
    let captures = []
    let type = getType(piece)

    switch (type) {
        case "rook":
            captures = rookCaptures(piece)
            break;

        case "bishop":
            captures = bishopCaptures(piece)
            break;

        case "queen":
            captures = queenCaptures(piece)
            break;

        case "king":
            captures = kingCaptures(piece)
            break;

        case "knight":
            captures = knightCaptures(piece)
            break;

        case "pawn":
            captures = pawnCaptures(piece)
            break;
    }

    if (pin(piece).length && type !== "king") {
        return captures.filter(s => pin(piece).includes(s))
    }

    return captures
}

/**
 * Returns the list of possible captures of the opponent
 * @param {string} color 
 * @returns {string[]}
 */
export const getPossibleCaptures = (color = turn) => {
    let captures = []

    getPiecesByColor(opponent(color)).forEach(piece => {
        let type = getType(piece)

        switch (type) {
            case "rook":
                captures.push(...rookPossibleCaptures(piece))
                break;

            case "bishop":
                captures.push(...bishopPossibleCaptures(piece))
                break;

            case "queen":
                captures.push(...queenPossibleCaptures(piece))
                break;

            case "king":
                captures.push(...kingPossibleCaptures(piece))
                break;

            case "knight":
                captures.push(...knightPossibleCaptures(piece))
                break;

            case "pawn":
                captures.push(...pawnPossibleCaptures(piece))
                break;
        }
    })

    return Array.from(new Set(captures))
}