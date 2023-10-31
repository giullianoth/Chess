import { board, columns, indicatorColumns, indicatorRanks, isEven, isOdd, ranks, setSquare } from "./variables.js";

const squareElement = (square, columnIndex, rankIndex) => {
    let element = document.createElement("div")
    let castle = square === "c1" || square === "g1" || square === "c8" || square === "g8" ? " castle" : ""

    let squareColor = (isEven(columnIndex) && isEven(rankIndex)) || (isOdd(columnIndex) && isOdd(rankIndex))
        ? "light" : "dark"

    element.className = `square ${squareColor}${castle}`
    setSquare(element, square)

    return element
}

export default function Board() {
    columns.forEach((column, columnIndex) => {
        indicatorColumns.innerHTML += `<span>${column}</span>`
        indicatorRanks.innerHTML += `<span>${ranks[columnIndex]}</span>`

        ranks.forEach((rank, rankIndex) => board.append(squareElement(column + rank, columnIndex, rankIndex)))
    })
}