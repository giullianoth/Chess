import { Modal } from "./modal.js";
import Moves, { botMovement } from "./moves.js";
import { addClass, board, botColor, getElement, getElements, modal, playingAgainst, removeClass, setPlayerColor, setPlayingAgainst } from "./variables.js";

const chooseElement = (
    elementClassName,
    buttonConfirmClassName,
    optionName,
    title,
    option1Id,
    option2Id,
    option1Value,
    option2Value,
    option1Label,
    option2Label,
) => {

    const element = document.createElement("div")
    const titleElement = document.createElement("h2")
    const bodyElement = document.createElement("div")
    const contentElement = document.createElement("div")
    const labelElement = document.createElement("label")
    const optionElement = document.createElement("input")
    const buttonConfirmElement = document.createElement("button")

    element.className = "modal-content"
    optionElement.className = elementClassName
    buttonConfirmElement.className = `button ${buttonConfirmClassName}`

    optionElement.setAttribute("type", "radio")
    optionElement.setAttribute("name", optionName)

    titleElement.innerText = title
    buttonConfirmElement.innerText = "OK"

    const labelElement2 = labelElement.cloneNode(true)
    const optionElement2 = optionElement.cloneNode(true)

    optionElement.setAttribute("checked", "")
    optionElement.id = option1Id
    optionElement2.id = option2Id
    optionElement.value = option1Value
    optionElement2.value = option2Value

    labelElement.innerHTML = optionElement.outerHTML + option1Label
    labelElement2.innerHTML = optionElement2.outerHTML + option2Label

    contentElement.append(labelElement, labelElement2)
    element.append(titleElement, contentElement, buttonConfirmElement)

    return element
}

const chooseModeElement = () => {
    return chooseElement(
        "choose-mode",
        "confirm-mode",
        "choose-mode",
        "Selecionar modo:",
        "select-1-player",
        "select-2-player",
        "bot",
        "player",
        " 1 jogador",
        " 2 jogadores"
    )
}

const chooseColorElement = () => {
    return chooseElement(
        "choose-color",
        "confirm-color",
        "choose-color",
        "Selecionar cor:",
        "select-white",
        "select-black",
        "white",
        "black",
        " Brancas",
        " Pretas"
    )
}

const buttonConfirmMode = () => getElement(".confirm-mode")
const buttonConfirmColor = () => getElement(".confirm-color")

const definePlayerColor = () => {
    const colorOption = getElements(".choose-color").find(option => option.checked)
    setPlayerColor(colorOption.value)
    modal().remove()

    if (playingAgainst === "bot") {
        if (botColor() === "white") {
            addClass(board, "spinned")
            botMovement()
        }

        if (botColor() === "black") {
            removeClass(board, "spinned")
        }
    }
}

const setMode = () => {
    const modeOption = getElements(".choose-mode").find(option => option.checked)
    setPlayingAgainst(modeOption.value)

    if (modeOption.value === "bot") {
        Modal(chooseColorElement())

        if (buttonConfirmColor()) {
            buttonConfirmColor().addEventListener("click", definePlayerColor)
        }
    } else {
        removeClass(board, "spinned")
        modal().remove()
    }
}

export function ChooseGameMode() {
    Modal(chooseModeElement())

    if (buttonConfirmMode()) {
        buttonConfirmMode().addEventListener("click", setMode)
    }

    if (playingAgainst === "bot") {
        if (botColor() === "white") {
            addClass(board, "spinned")
        }
    }
}