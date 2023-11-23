import { columns, gameHistory, getColor, getPieceType, getSquare, isFirstMove, ranks, roundPerMove, setPassant } from "../variables.js";
import { getCaptures, getMoves } from "./move-squares.js";

export const pawnMoveDirection = (color) => color === "white" ? "up" : "down"
export const pawnCaptureDirection1 = (color) => `${color === "white" ? "up" : "down"}-left`
export const pawnCaptureDirection2 = (color) => `${color === "white" ? "up" : "down"}-right`

export const pawnMoveRanks = (rank, color, piece) => {
    let ranksList = color === "white"
        ? ranks.filter((r, i) => i <= ranks.indexOf(rank) && i >= ranks.indexOf(rank) - 2)
        : ranks.filter((r, i) => i >= ranks.indexOf(rank) && i <= ranks.indexOf(rank) + 2)

    if (!isFirstMove(piece)) {
        color === "white" && ranksList.shift()
        color === "black" && ranksList.pop()
    }

    return ranksList
}

export const pawnCaptureColumns = (column) =>
    columns.filter((c, i) => i === columns.indexOf(column) || i === columns.indexOf(column) - 1 || i === columns.indexOf(column) + 1)

export const pawnCaptureRanks = (rank, color) =>
    ranks.filter((r, i) => i === ranks.indexOf(rank) || i === ranks.indexOf(rank) + (color === "white" ? -1 : 1))

export const passantCapture = (square, color) => {

    let capture = []

    if (gameHistory[roundPerMove - 2] && !gameHistory[roundPerMove - 2].captured_piece) {

        let { moved_piece, piece_move, square_destination } = gameHistory[roundPerMove - 2]
        let [c, r] = square.split("")
        let [cDest, rDest] = square_destination.split("")

        if (((r === "5" && color === "white") || (r === "4" && color === "black"))
            && r === rDest
            && getPieceType(moved_piece) === "pawn" && piece_move - 1 === 0
            && (columns.indexOf(cDest) === columns.indexOf(c) - 1 || columns.indexOf(cDest) === columns.indexOf(c) + 1)) {
                capture.push(cDest + ranks[ranks.indexOf(r) + (color === "white" ? -1 : 1)])
                setPassant()
        }
    }

    return capture
}

export function PawnCapture(piece) {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    return {
        moves: [
            ...getMoves(square, pawnCaptureDirection1(color), pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
            ...getMoves(square, pawnCaptureDirection2(color), pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
        ],

        captures: [
            ...getCaptures(square, pawnCaptureDirection1(color), pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
            ...getCaptures(square, pawnCaptureDirection2(color), pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
        ]
    }
}

export default function PawnMove(piece) {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    passantCapture(square, color)

    return {
        moves: getMoves(square, pawnMoveDirection(color), [], pawnMoveRanks(r, color, piece)),

        captures: [
            ...getCaptures(square, pawnCaptureDirection1(color), pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
            ...getCaptures(square, pawnCaptureDirection2(color), pawnCaptureColumns(c), pawnCaptureRanks(r, color)),
            ...passantCapture(square, color),
        ]
    }
}