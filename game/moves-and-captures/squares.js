import { columns, ranks } from "../variables.js"

const moveUp = (square, ranksSet) => {
    let [c, r] = square.split("")
    return ranksSet.filter((rank, index) => index < ranksSet.indexOf(r)).map(rank => c + rank).reverse()
}

const moveDown = (square, ranksSet) => {
    let [c, r] = square.split("")
    return ranksSet.filter((rank, index) => index > ranksSet.indexOf(r)).map(rank => c + rank)
}

const moveLeft = (square, columnsSet) => {
    let [c, r] = square.split("")
    return columnsSet.filter((column, index) => index < columnsSet.indexOf(c)).map(column => column + r).reverse()
}

const moveRight = (square, columnsSet) => {
    let [c, r] = square.split("")
    return columnsSet.filter((column, index) => index > columnsSet.indexOf(c)).map(column => column + r)
}

const moveUpLeft = (square, columnsSet, ranksSet) => {
    let [c, r] = square.split("")
    columnsSet = columnsSet.filter((column, index) => index < columnsSet.indexOf(c)).reverse()
    ranksSet = ranksSet.filter((rank, index) => index < ranksSet.indexOf(r)).reverse()

    if (columnsSet.length > ranksSet.length) {
        return columnsSet.filter((column, index) => index < ranksSet.length)
            .map((column, index) => column + ranksSet[index])
    }

    if (ranksSet.length > columnsSet.length) {
        return ranksSet.filter((rank, index) => index < columnsSet.length)
            .map((rank, index) => columnsSet[index] + rank)
    }

    return columnsSet.map((column, index) => column + ranksSet[index])
}

const moveUpRight = (square, columnsSet, ranksSet) => {
    let [c, r] = square.split("")
    columnsSet = columnsSet.filter((column, index) => index > columnsSet.indexOf(c))
    ranksSet = ranksSet.filter((rank, index) => index < ranksSet.indexOf(r)).reverse()

    if (columnsSet.length > ranksSet.length) {
        return columnsSet.filter((column, index) => index < ranksSet.length)
            .map((column, index) => column + ranksSet[index])
    }

    if (ranksSet.length > columnsSet.length) {
        return ranksSet.filter((rank, index) => index < columnsSet.length)
            .map((rank, index) => columnsSet[index] + rank)
    }

    return columnsSet.map((column, index) => column + ranksSet[index])
}

const moveDownRight = (square, columnsSet, ranksSet) => {
    let [c, r] = square.split("")
    columnsSet = columnsSet.filter((column, index) => index < columnsSet.indexOf(c)).reverse()
    ranksSet = ranksSet.filter((rank, index) => index > ranksSet.indexOf(r))

    if (columnsSet.length > ranksSet.length) {
        return columnsSet.filter((column, index) => index < ranksSet.length)
            .map((column, index) => column + ranksSet[index])
    }

    if (ranksSet.length > columnsSet.length) {
        return ranksSet.filter((rank, index) => index < columnsSet.length)
            .map((rank, index) => columnsSet[index] + rank)
    }

    return columnsSet.map((column, index) => column + ranksSet[index])
}

const moveDownLeft = (square, columnsSet, ranksSet) => {
    let [c, r] = square.split("")
    columnsSet = columnsSet.filter((column, index) => index > columnsSet.indexOf(c))
    ranksSet = ranksSet.filter((rank, index) => index > ranksSet.indexOf(r))

    if (columnsSet.length > ranksSet.length) {
        return columnsSet.filter((column, index) => index < ranksSet.length)
            .map((column, index) => column + ranksSet[index])
    }

    if (ranksSet.length > columnsSet.length) {
        return ranksSet.filter((rank, index) => index < columnsSet.length)
            .map((rank, index) => columnsSet[index] + rank)
    }

    return columnsSet.map((column, index) => column + ranksSet[index])
}

export default function AllMoveSquares(square, direction, columnsSet = columns, ranksSet = ranks) {
    let squares = []

    switch (direction) {
        case "up":
            squares = moveUp(square, ranksSet)
            break;

        case "right":
            squares = moveRight(square, columnsSet)
            break;

        case "down":
            squares = moveDown(square, ranksSet)
            break;

        case "left":
            squares = moveLeft(square, columnsSet)
            break;

        case "up-left":
            squares = moveUpLeft(square, columnsSet, ranksSet)
            break;

        case "up-right":
            squares = moveUpRight(square, columnsSet, ranksSet)
            break;

        case "down-right":
            squares = moveDownRight(square, columnsSet, ranksSet)
            break;

        case "down-left":
            squares = moveDownLeft(square, columnsSet, ranksSet)
            break;
    }

    return squares
}