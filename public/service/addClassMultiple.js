const addClassMultiple = (elements, className) => {
    for (x = 0; x < elements.length; x++){
        elements[x].classList.add(className)
    }
}