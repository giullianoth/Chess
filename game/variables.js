export const getElement = (selector, parent = null) => (parent ?? document).querySelector(selector)
export const getElements = (selector, parent = null) => (parent ?? document).querySelectorAll(selector)

export const indicatorColumns = getElement(".indicator.columns")
export const indicatorRanks = getElement(".indicator.ranks")

export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
export const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()