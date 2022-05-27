const removeClassMultiple = (elements, className) => {
    for (x = 0; x < elements.length; x++){
        elements[x].classList.remove(className)
    }
}