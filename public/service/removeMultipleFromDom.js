const removeMultipleFromDom = (elements) => {
    for (x = 0; x < elements.length; x++){
        elements[x].remove()
    }
}