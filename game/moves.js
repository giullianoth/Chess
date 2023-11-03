import { AvaliableMoves } from "./moves/avaliable-moves.js";
import { addClass, board, getColor, getCoordinateBySquare, getMoveSquares, getPieces, hasClass, removeClass, setSquare, setStyle, toggleClass, turn } from "./variables.js";

{/* <div class="move capture" style="top: 225px; left: 300px;"></div> */ }

const moveSquareElement = (square) => {
    let element = document.createElement("div")
    let {top, left} = getCoordinateBySquare(square)
    element.className = "move"
    setSquare(element, square)
    setStyle(element, "top", `${top}px`)
    setStyle(element, "left", `${left}px`)

    return element
}

const captureSquareElement = (square) => {
    let element = moveSquareElement(square)
    addClass(element, "capture")
    return element
}

function selectPiece(piece) {
    let { moves, captures } = AvaliableMoves(piece)
    addClass(piece, "active")

    if (moves) {
        moves.forEach(square => board.append(moveSquareElement(square)))
    }

    if (captures) {
        captures.forEach(square => board.append(captureSquareElement(square)))
    }
}

function defineMove(piece) {

    getPieces().forEach(p => {
        if (p !== piece) {
            removeClass(p, "fixed")
            removeClass(p, "active")
        }
    })

    toggleClass(piece, "fixed")
}

function disselectPiece(piece) {
    if (!hasClass(piece, "fixed")) {
        removeClass(piece, "active")
    }

    if (getMoveSquares()) {
        getMoveSquares().forEach(square => square.remove())
    }
}

export default function Moves() {
    getPieces().forEach(piece => {
        piece.addEventListener("mouseenter", ({ target }) => getColor(target) === turn && selectPiece(target))
        piece.addEventListener("click", ({ target }) => getColor(target) === turn && defineMove(target))
        piece.addEventListener("mouseleave", ({ target }) => getColor(target) === turn && disselectPiece(target))
    })
}