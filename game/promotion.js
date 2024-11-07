import { movement } from "./moves.js"
import { board, getColor, getName, getType, promotionList, promotionOptions, replaceClass, setName, setStyle, setType } from "./variables.js"

const promotionElement = (color) => {
    let element = document.createElement("div")
    element.className = "promotion"
    setStyle(element, (color === "white" ? "top" : "bottom"), 0)

    let piecesToPromote = ["knight", "bishop", "rook", "queen"]

    piecesToPromote.forEach(pieceType => {
        let piece = document.createElement("i")
        piece.className = `fa-solid fa-chess-${pieceType} piece ${color}`
        setType(piece, pieceType)
        element.append(piece)
    })

    return element
}

export default function Promotion(piece, destinationSquare) {
    board.append(promotionElement(getColor(piece)))

    promotionOptions().forEach(opt => {
        opt.addEventListener("click", ({ target }) => {
            replaceClass(piece, "fa-chess-pawn", `fa-chess-${getType(target)}`)
            setType(piece, getType(target))
            setName(piece, `${getName(piece)}-promoted-to-${getType(target)}`)
            promotionList().remove()
            movement(piece, destinationSquare)
        })
    })
}