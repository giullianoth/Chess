import { board, columns, indicatorColumns, indicatorRanks, isEven, isOdd, ranks, setSquare } from "./variables.js"

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

export default function Board() {
    ranks.forEach((rank, rankIndex) => {
        indicatorColumns.innerHTML += `<span>${columns[rankIndex]}</span>`
        indicatorRanks.innerHTML += `<span>${rank}</span>`

        columns.forEach((column, columnIndex) => board.append(squareElement(column + rank, columnIndex, rankIndex)))
    })
}