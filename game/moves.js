import { AvaliableMoves } from "./moves/avaliable-moves.js";
import { addClass, board, capturePiece, getColor, getCoordinateBySquare, getMoveSquares, getPieceBySquare, getPieces, getSquare, hasClass, movePiece, removeClass, setSquare, setStyle, squareHasPiece, swapTurn, toggleClass, turn } from "./variables.js";

const moveSquareElement = (square) => {
    let element = document.createElement("div")
    let { top, left } = getCoordinateBySquare(square)
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

function insertMoveSquares(piece) {
    let { moves, captures } = AvaliableMoves(piece)

    if (moves) {
        moves.forEach(square => board.append(moveSquareElement(square)))
    }

    if (captures) {
        captures.forEach(square => board.append(captureSquareElement(square)))
    }
}

function selectPiece(piece) {
    addClass(piece, "active")
    insertMoveSquares(piece)
}

function defineMove(piece) {

    getPieces().forEach(p => {
        if (p !== piece) {
            removeClass(p, "fixed")
            removeClass(p, "active")
        }
    })

    toggleClass(piece, "fixed")

    getMoveSquares().forEach(square => square.remove())
    insertMoveSquares(piece)

    getMoveSquares().forEach(square => {
        if (hasClass(piece, "fixed")) {
            addClass(square, "fixed")
        }

        square.addEventListener("click", ({ target }) => move(piece, target))
    })
}

function disselectPiece(piece) {
    if (!hasClass(piece, "fixed")) {
        removeClass(piece, "active")
    }

    if (getMoveSquares()) {
        getMoveSquares().forEach(square => !hasClass(square, "fixed") && square.remove())
    }
}

export function move(piece, moveSquare) {
    removeClass(piece, "fixed")
    removeClass(piece, "active")
    getMoveSquares().forEach(s => s.remove())
    
    let square = getSquare(moveSquare)

    if (squareHasPiece(square)) {
        let capturedPiece = getPieceBySquare(square)
        capturePiece(capturedPiece)
    }

    movePiece(piece, square)
    swapTurn()
}

export default function Moves() {
    getPieces().forEach(piece => {
        piece.addEventListener("mouseenter", ({ target }) => getColor(target) === turn && selectPiece(target))
        piece.addEventListener("click", ({ target }) => getColor(target) === turn && defineMove(target))
        piece.addEventListener("mouseleave", ({ target }) => getColor(target) === turn && disselectPiece(target))
    })
}