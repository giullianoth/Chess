import { board, getCoordinateBySquare, setColor, setMove, setName, setSquare, setStyle, setType } from "./variables.js"

/**
 * The pieces list of each player
 */
const piecesList = ["pawn1", "pawn2", "pawn3", "pawn4", "pawn5", "pawn6", "pawn7", "pawn8", "rook1", "rook2", "knight1", "knight2", "bishop1", "bishop2", "queen", "king"]

/**
 * Returns the initial square of every piece
 * @param {string} color 
 * @param {string} pieceName 
 * @returns {string}
 */
const initialSquare = (color, pieceName) => {
    let square = ""

    switch (pieceName) {
        case "pawn1":
            square = color === "white" ? "a2" : "a7"
            break;

        case "pawn2":
            square = color === "white" ? "b2" : "b7"
            break;

        case "pawn3":
            square = color === "white" ? "c2" : "c7"
            break;

        case "pawn4":
            square = color === "white" ? "d2" : "d7"
            break;

        case "pawn5":
            square = color === "white" ? "e2" : "e7"
            break;

        case "pawn6":
            square = color === "white" ? "f2" : "f7"
            break;

        case "pawn7":
            square = color === "white" ? "g2" : "g7"
            break;

        case "pawn8":
            square = color === "white" ? "h2" : "h7"
            break;

        case "rook1":
            square = color === "white" ? "a1" : "a8"
            break;

        case "rook2":
            square = color === "white" ? "h1" : "h8"
            break;

        case "knight1":
            square = color === "white" ? "b1" : "b8"
            break;

        case "knight2":
            square = color === "white" ? "g1" : "g8"
            break;

        case "bishop1":
            square = color === "white" ? "c1" : "c8"
            break;

        case "bishop2":
            square = color === "white" ? "f1" : "f8"
            break;

        case "queen":
            square = color === "white" ? "d1" : "d8"
            break;

        case "king":
            square = color === "white" ? "e1" : "e8"
            break;
    }

    return square
}

/**
 * Returns the HTML element of a piece
 * @param {string} pieceName 
 * @param {string} color 
 * @returns {HTMLElement}
 */
const pieceElement = (pieceName, color) => {
    let element = document.createElement("i")
    let pieceType = pieceName !== "queen" && pieceName !== "king" ? pieceName.substring(0, pieceName.length - 1) : pieceName
    let square = initialSquare(color, pieceName)
    let { top, left } = getCoordinateBySquare(square)

    element.className = `fa-solid fa-chess-${pieceType} piece ${color}`
    setType(element, pieceType)
    setName(element, pieceName)
    setColor(element, color)
    setSquare(element, square)
    setMove(element, 0)

    setStyle(element, "top", `${top}px`)
    setStyle(element, "left", `${left}px`)

    return element
}

export default function Pieces() {
    piecesList.forEach(pieceName => {
        board.append(pieceElement(pieceName, "white"))
        board.append(pieceElement(pieceName, "black"))
    })
}