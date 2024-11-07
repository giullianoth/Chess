import { getColor, getSquare, isFirstMove, ranks } from "../../variables.js"
import MoveSquares from "./squares.js"

const direction = (color) => color === "white" ? "up" : "down"

export const pawnRanks = (rank, color, piece) => {
    let ranksList = color === "white"
        ? ranks.filter((r, i) => i <= ranks.indexOf(rank) && i >= ranks.indexOf(rank) - 2)
        : ranks.filter((r, i) => i >= ranks.indexOf(rank) && i <= ranks.indexOf(rank) + 2)

    if (!isFirstMove(piece)) {
        color === "white" && rank !== "7" && ranksList.shift()
        color === "black" && rank !== "2" && ranksList.pop()
    }

    return ranksList
}

export default function PawnMoves(piece) {
    let square = getSquare(piece)
    let color = getColor(piece)
    let [c, r] = square.split("")

    let squares = MoveSquares(square, direction(color), [], pawnRanks(r, color, piece))

    return squares
}