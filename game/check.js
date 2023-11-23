import { AvaliableMoves } from "./moves/avaliable-moves.js";
import { addClass, getColor, getPieceBySquare, getPieceType, getPiecesByColor, setCheck } from "./variables.js";

export function CheckCheck(piece) {
    let color = getColor(piece)

    getPiecesByColor(color).forEach(p => {
        let { captures } = AvaliableMoves(p)

        if (captures.length) {
            let squareCheck = captures.find(square => getPieceType(getPieceBySquare(square)) === "king"
                && color !== getColor(getPieceBySquare(square)))

            if (squareCheck) {
                let kingInCheck = getPieceBySquare(squareCheck)
                addClass(kingInCheck, "check")
                setCheck()
            }
        }
    })
}