import { CheckCheck, EscapeFromCheck } from "./check.js";
import { AvaliableMoves } from "./moves/avaliable-moves.js";
import { addClass, board, capturePiece, check, gameHistory, getColor, getCoordinateBySquare, getMoveSquares, getPieceBySquare, getPieceMove, getPieceName, getPieceType, getPieces, getSquare, hasClass, incrementRound, incrementRoundPerMove, isCastle, isFirstMove, isPassant, isPromotion, movePiece, promotionList, promotionOptions, removeClass, replaceClass, round, roundPerMove, setCheck, setName, setSquare, setStyle, setType, squareHasPiece, swapTurn, toggleClass, turn, unsetPassant } from "./variables.js";

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

const promotionElement = (color) => {
    let element = document.createElement("div")
    element.className = "promotion"
    setStyle(element, (color === "white" ? "top" : "bottom"), 0)

    element.innerHTML = `
        <i class="fa-solid fa-chess-knight piece ${color}" data-type="knight"></i>
        <i class="fa-solid fa-chess-bishop piece ${color}" data-type="bishop"></i>
        <i class="fa-solid fa-chess-rook piece ${color}" data-type="rook"></i>
        <i class="fa-solid fa-chess-queen piece ${color}" data-type="queen"></i>
    `

    return element
}

function insertMoveSquares(piece) {
    let { moves, captures } = /*check ? EscapeFromCheck(piece) :*/ AvaliableMoves(piece)

    if (moves.length) {
        moves.forEach(square => board.append(moveSquareElement(square)))
    }

    if (captures.length) {
        forEach(square => board.append(captureSquareElement(square)))
    }
}

function promotion(piece, moveSquare) {
    board.append(promotionElement(getColor(piece)))

    promotionOptions().forEach(opt => {
        opt.addEventListener("click", ({ target }) => {
            replaceClass(piece, "fa-chess-pawn", `fa-chess-${getPieceType(target)}`)
            setType(piece, getPieceType(target))
            setName(piece, `${getPieceName(piece)}-promoted-to-${getPieceType(target)}`)
            promotionList().remove()
            move(piece, moveSquare)
        })
    })
}

function selectPiece(piece) {
    addClass(piece, "active")
    insertMoveSquares(piece)
}

function defineMove(piece) {

    unsetPassant()

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

        square.addEventListener("click", ({ target }) => {
            let [c, r] = getSquare(target).split("")
            if (isPromotion(piece, r)) {
                promotion(piece, target)
            } else {
                move(piece, target)
            }
        })
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

function move(piece, moveSquare) {
    removeClass(piece, "fixed")
    removeClass(piece, "active")
    getMoveSquares().forEach(s => s.remove())

    let square = getSquare(moveSquare)
    let castleRook = null
    let castleSquare = null
    let capturedPiece = null

    if (isCastle(piece, square)) {
        let [c, r] = square.split("")
        castleSquare = (c === "c" ? "d" : "f") + r
        castleRook = getPieceBySquare((c === "c" ? "a" : "h") + r)

        if (castleRook && getPieceType(castleRook) === "rook" && isFirstMove(castleRook)) {
            movePiece(castleRook, castleSquare)
        }
    }

    if (squareHasPiece(square)) {
        capturedPiece = getPieceBySquare(square)
        capturePiece(capturedPiece)
    }

    if (isPassant) {
        capturedPiece = getPieces().find(p => p === gameHistory[roundPerMove - 2].moved_piece)
        capturePiece(capturedPiece)
        unsetPassant()
    }

    gameHistory.push({
        last_round: round,
        last_round_per_move: roundPerMove,
        moved_piece: piece,
        piece_move: getPieceMove(piece) + 1,
        piece_name: getPieceName(piece),
        color: getColor(piece),
        square_origin: getSquare(piece),
        square_destination: square,
        captured_piece: capturedPiece,
        castle_piece: castleRook,
        castle_square: castleSquare
    })

    movePiece(piece, square)
    check && setCheck()
    getPieces().forEach(p => removeClass(p, "check"))

    // CheckCheck(piece)

    swapTurn()
    incrementRoundPerMove()
    getColor(piece) === "black" && incrementRound()

    console.log(
        `${gameHistory[roundPerMove - 2].last_round} - 
        ${getPieceName(gameHistory[roundPerMove - 2].moved_piece)} ${gameHistory[roundPerMove - 2].color}:
        ${gameHistory[roundPerMove - 2].square_origin} - ${gameHistory[roundPerMove - 2].square_destination}
        ${gameHistory[roundPerMove - 2].captured_piece ? " captures " + getPieceName(gameHistory[roundPerMove - 2].captured_piece) : ""}`
    );
}

export default function Moves() {
    getPieces().forEach(piece => {
        piece.addEventListener("mouseenter", ({ target }) => getColor(target) === turn && selectPiece(target))
        piece.addEventListener("click", ({ target }) => getColor(target) === turn && defineMove(target))
        piece.addEventListener("mouseleave", ({ target }) => getColor(target) === turn && disselectPiece(target))
    })
}