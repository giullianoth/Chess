// DOM
export const getElement = (selector, parent = null) => (parent ?? document).querySelector(selector)
export const getElements = (selector, parent = null) => (parent ?? document).querySelectorAll(selector)

// SOME OPERATIONS
export const isEven = (number) => number % 2 === 0
export const isOdd = (number) => !isEven(number)

// BOARD
export const board = getElement(".board")
export const indicatorColumns = getElement(".indicator.columns", board)
export const indicatorRanks = getElement(".indicator.ranks", board)

// SQUARES
export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
export const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()

// GAME OPERATIONS
export const setSquare = (element, square) => element.setAttribute("data-square", square)