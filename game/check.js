import { AvaliableMoves } from "./moves/avaliable-moves.js";
import { AvaliablePin } from "./safe-moves/safe-squares.js";
import { addClass, getColor, getPieceBySquare, getPieceType, getPiecesByColor, pieceCheck, setCheck, setKingInCheck, setPieceCheck } from "./variables.js";

export function EscapeFromCheck(piece) {
    let moves = []
    let captures = []

    if (getPieceType(piece) === "king") {
        moves = AvaliableMoves(piece).moves
        captures = AvaliableMoves(piece).captures
    } else {
        let coverPin = AvaliableMoves(piece).moves.find(square => AvaliablePin(pieceCheck).some(s => s === square))
        let capturePieceCheck = AvaliableMoves(piece).captures.find(square => getPieceBySquare(square) === pieceCheck)

        if (coverPin) {
            moves = AvaliableMoves(piece).moves.filter(square => AvaliablePin(pieceCheck).some(s => s === square))
        }

        if (capturePieceCheck) {
            captures = AvaliableMoves(piece).captures.filter(square => getPieceBySquare(square) === pieceCheck)
        }
    }

    return { moves, captures }
}

export function CheckCheck(piece) {
    let color = getColor(piece)

    getPiecesByColor(color).forEach(p => {
        let { captures } = AvaliableMoves(p)

        if (captures.length) {
            let squareCheck = captures.find(square => getPieceType(getPieceBySquare(square)) === "king"
                && color !== getColor(getPieceBySquare(square)))

            if (squareCheck) {
                let king = getPieceBySquare(squareCheck)
                addClass(king, "check")
                setKingInCheck(king)
                setPieceCheck(p)
                setCheck()
            }
        }
    })
}