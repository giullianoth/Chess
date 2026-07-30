import { getElement, modal, modalBody } from "./variables.js"

/**
 * The modal element to be included in the viewport
 * @param {HTMLElement} content 
 * @returns {HTMLElement}
 */
const modalElement = content => {
    const element = document.createElement("section")
    const containerElement = document.createElement("div")
    const bodyElement = document.createElement("div")

    element.className = "modal"
    containerElement.className = "modal-container"
    bodyElement.className = "modal-body"

    bodyElement.append(content)
    containerElement.append(bodyElement)
    element.append(containerElement)

    return element
}

/**
 * Shows a modal element in viewport
 * @param {HTMLElement} content 
 */
export function Modal(content) {
    if (!modal()) {
        document.body.append(modalElement(content))
    } else {
        modalBody().innerHTML = content.outerHTML
    }

    const closeButton = getElement(".close-modal", modal())
    
    if (closeButton) {
        closeButton.addEventListener("click", () => modal().remove())
    }
}