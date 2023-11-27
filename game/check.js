import { AvaliableMoves } from "./moves/avaliable-moves.js";
import { addClass, getColor, getPieceBySquare, getPieceType, getPiecesByColor, pieceCheck, setCheck, setKingInCheck, setPieceCheck } from "./variables.js";

export function EscapeFromCheck(piece) {

}

export function CheckCheck(piece) {
    let color = getColor(piece)
    let piecesCheck = []
    let king = null

    getPiecesByColor(color).forEach(p => {
        let { captures } = AvaliableMoves(p)

        if (captures.length) {
            let squareCheck = captures.find(square => getPieceType(getPieceBySquare(square)) === "king"
                && color !== getColor(getPieceBySquare(square)))

            if (squareCheck) {
                king = getPieceBySquare(squareCheck)
                piecesCheck.push(p)
            }
        }
    })

    if (piecesCheck.length) {
        let length = piecesCheck.length
        
        addClass(king, "check")
        setKingInCheck(king)
        setCheck()

        if (length > 1) {
            setPieceCheck(piecesCheck)
        } else if (length === 1) {
            setPieceCheck(piecesCheck[0])
        }
    }
}