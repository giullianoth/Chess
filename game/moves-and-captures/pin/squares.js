import { getColor, getPieceBySquare, getType, squareHasPiece } from "../../variables.js"
import AllMoveSquares from "../squares.js"

export default function PinSquares(square, direction) {
    let squares = AllMoveSquares(square, direction)
    let color = getColor(getPieceBySquare(square))
    let avaliableSquares = {}

    if (squares.length) {
        if (squares.some(s => squareHasPiece(s))) {
            squares.forEach(s => {
                let pieceInSquare = getPieceBySquare(s)

                if (pieceInSquare && getType(pieceInSquare) === "king" && getColor(pieceInSquare) !== color) {
                    let complement = []

                    switch (direction) {
                        case "up":
                            complement = AllMoveSquares(square, "down")
                            break;

                        case "right":
                            complement = AllMoveSquares(square, "left")
                            break;

                        case "down":
                            complement = AllMoveSquares(square, "up")
                            break;

                        case "left":
                            complement = AllMoveSquares(square, "right")
                            break;

                        case "up-left":
                            complement = AllMoveSquares(square, "down-right")
                            break;

                        case "up-right":
                            complement = AllMoveSquares(square, "down-left")
                            break;

                        case "down-right":
                            complement = AllMoveSquares(square, "up-left")
                            break;

                        case "down-left":
                            complement = AllMoveSquares(square, "up-right")
                            break;
                    }

                    avaliableSquares.entire = [...squares, ...complement, square].sort()

                    avaliableSquares.betweenPieces = avaliableSquares.entire.filter((ss, ii) =>
                        (ii >= avaliableSquares.entire.indexOf(s) && ii <= avaliableSquares.entire.indexOf(square))
                        || (ii <= avaliableSquares.entire.indexOf(s) && ii >= avaliableSquares.entire.indexOf(square)))
                }
            })
        }
    }

    return avaliableSquares
}