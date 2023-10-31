import { columns, indicatorColumns, indicatorRanks, ranks } from "./variables.js";

export default function Board() {
    columns.forEach((column, columnIndex) => {
        indicatorColumns.innerHTML += `<span>${column}</span>`
        indicatorRanks.innerHTML += `<span>${ranks[columnIndex]}</span>`
    })
}