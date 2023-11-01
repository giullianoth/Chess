import { board, columns, indicatorColumns, indicatorRanks, isEven, isOdd, ranks, setSquare } from "./variables.js";

const squareElement = (square, columnIndex, rankIndex) => {
    let [c, r] = square.split("")
    let element = document.createElement("div")
    let castle = square === "c1" || square === "g1" || square === "c8" || square === "g8" ? " castle" : ""
    let passant = r === "4" || r === "5" ? " passant" : ""

    let squareColor = (isEven(columnIndex) && isEven(rankIndex)) || (isOdd(columnIndex) && isOdd(rankIndex))
        ? "light" : "dark"

    element.className = `square ${squareColor}${castle}${passant}`
    setSquare(element, square)

    return element
}

export default function Board() {
    ranks.forEach((rank, rankIndex) => {
        indicatorColumns.innerHTML += `<span>${columns[rankIndex]}</span>`
        indicatorRanks.innerHTML += `<span>${rank}</span>`

        columns.forEach((column, columnIndex) => board.append(squareElement(column + rank, columnIndex, rankIndex)))
    })
}