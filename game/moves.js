import { AvaliableCaptures, AvaliableMoves } from "./avaliable-moves.js";
import Promotion from "./promotion.js";
import { addClass, board, capturePiece, gameHistory, getCastleSquares, getColor, getCoordinateBySquare, getMoveSquares, getName, getPieceBySquare, getPieceMove, getPieces, getPiecesByColor, getPromotionSquares, getSquare, getType, hasClass, incrementRound, incrementRoundPerMove, isFirstMove, isPassant, movePiece, removeClass, round, roundPerMove, setSquare, setStyle, swapTurn, toggleClass, turn, unsetPassant } from "./variables.js";

const setMoveSquares = (piece) => {
    getMoveSquares() && getMoveSquares().forEach(square => !hasClass(square, "fixed") && square.remove())

    let moveSquares = AvaliableMoves(piece)
    let captureSquares = AvaliableCaptures(piece)

    if (moveSquares.length) {
        moveSquares.forEach(square => {
            board.append(moveSquareElement(square))
        })
    }

    if (captureSquares.length) {
        captureSquares.forEach(square => {
            board.append(captureSquareElement(square))
        })
    }
}

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

function selectPiece(piece) {
    unsetPassant()
    addClass(piece, "active")
    setMoveSquares(piece)
}

function disselectPiece(piece) {
    !hasClass(piece, "selected") && removeClass(piece, "active")
    getMoveSquares().forEach(square => !hasClass(square, "fixed") && square.remove())
}

function defineMove(piece) {
    let color = getColor(piece)

    getPiecesByColor(color).forEach(p => {
        if (p !== piece) {
            removeClass(p, "selected")
            removeClass(p, "active")
        }
    })

    toggleClass(piece, "selected")
    getMoveSquares().forEach(square => removeClass(square, "fixed"))

    if (hasClass(piece, "selected")) {
        setMoveSquares(piece)
        getMoveSquares().forEach(square => addClass(square, "fixed"))
    }

    if (getMoveSquares() && getMoveSquares().every(square => hasClass(square, "fixed"))) {
        getMoveSquares().forEach(square => {
            square.addEventListener("click", ({ target }) => {
                if (getType(piece) === "pawn" && getPromotionSquares().some(s => getSquare(s) === getSquare(target))) {
                    Promotion(piece, target)
                } else {
                    movement(piece, target)
                }
            })
        })
    }
}

export function movement(piece, destinationSquare) {
    let square = getSquare(destinationSquare)
    let pieceToCapture = getPieceBySquare(square)
    let squareOrigin = getSquare(piece)

    getMoveSquares().forEach(s => s.remove())
    removeClass(piece, "selected")
    removeClass(piece, "active")

    if (isFirstMove(piece) && getType(piece) === "king" && getCastleSquares().some(s => getSquare(s) === square)) {
        let [c, r] = square.split("")
        let castleSquare = (c === "c" ? "d" : "f") + r
        let castleRook = getPieceBySquare((c === "c" ? "a" : "h") + r)

        if (castleRook && getType(castleRook) === "rook" && isFirstMove(castleRook)) {
            movePiece(castleRook, castleSquare)
        }
    }

    if (isPassant) {
        let pawnPassant = getPieceBySquare(gameHistory[roundPerMove - 2].square_destination)
        capturePiece(pawnPassant)
        unsetPassant()
    }

    pieceToCapture && capturePiece(pieceToCapture)
    movePiece(piece, square)

    gameHistory.push({
        round: round,
        round_per_move: roundPerMove,
        piece_name: getName(piece),
        piece_type: getType(piece),
        piece_move: getPieceMove(piece),
        square_origin: squareOrigin,
        square_destination: getSquare(destinationSquare),
    })

    turn === "black" && incrementRound()
    incrementRoundPerMove()
    swapTurn()
}

export default function Moves() {
    getPieces().forEach(piece => {
        piece.addEventListener("mouseenter", ({ target }) => getColor(target) === turn && selectPiece(target))
        piece.addEventListener("click", ({ target }) => getColor(target) === turn && defineMove(target))
        piece.addEventListener("mouseleave", ({ target }) => getColor(target) === turn && disselectPiece(target))
    })
}