import { board, boardDimension, buttonRotate, columns, endGameIcons, getCoordinateBySquare, getMoveSquares, getPieces, getSquare, indicatorColumns, indicatorRanks, isEven, isOdd, ranks, setSquare, setStyle, squareDimension, toggleClass } from "./variables.js"

/**
 * Returns an HTML element of a square
 * @param {string} square 
 * @param {string} columnIndex 
 * @param {string} rankIndex 
 * @returns {HTMLDivElement}
 */
const squareElement = (square, columnIndex, rankIndex) => {
    let element = document.createElement("div")

    let castle = square === "c1" || square === "g1" || square === "c8" || square === "g8" ? " castle" : ""
    let passant = ranks[rankIndex] === "4" || ranks[rankIndex] === "5" ? " passant" : ""
    let squareColor = (isEven(columnIndex) && isEven(rankIndex) || isOdd(columnIndex) && isOdd(rankIndex)) ? "light" : "dark"
    let promotion = ranks[rankIndex] === "1" || ranks[rankIndex] === "8" ? " promotion" : ""

    setSquare(element, square)
    element.className = `square ${squareColor + castle + passant + promotion}`

    return element
}

/**
 * Sets the board and square dimensions in CSS variables
 */
export const setBoardDimensions = () => {
    const rootElement = document.documentElement

    rootElement.style.setProperty("--board-dimension", `${boardDimension()}px`)
    rootElement.style.setProperty("--square-dimension", `${squareDimension()}px`)

    getPieces().forEach(piece => {
        let square = getSquare(piece)
        let { top, left } = getCoordinateBySquare(square)

        setStyle(piece, "top", `${top}px`)
        setStyle(piece, "left", `${left}px`)
    })

    if (getMoveSquares() && getMoveSquares().length) {
        getMoveSquares().forEach(moveSquare => {
            let square = getSquare(moveSquare)
            let { top, left } = getCoordinateBySquare(square)

            setStyle(icon, "top", `${top}px`)
            setStyle(icon, "left", `${left}px`)
        })
    }

    if (endGameIcons() && endGameIcons().length) {
        endGameIcons().forEach(icon => {
            let square = getSquare(icon)
            let { top, left } = getCoordinateBySquare(square)

            setStyle(icon, "top", `${top}px`)
            setStyle(icon, "left", `${left}px`)
        })
    }
}

export default function Board() {
    ranks.forEach((rank, rankIndex) => {
        indicatorColumns.innerHTML += `<span>${columns[rankIndex]}</span>`
        indicatorRanks.innerHTML += `<span>${rank}</span>`

        columns.forEach((column, columnIndex) => board.append(squareElement(column + rank, columnIndex, rankIndex)))
    })

    setBoardDimensions()
    buttonRotate.addEventListener("click", () => toggleClass(board, "spinned"))
}