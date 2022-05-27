const swapClasses = (element, class1, class2) => {
    if (element.classList.contains(class1)){
        element.classList.remove(class1)
        element.classList.add(class2)
    } else {
        element.classList.add(class1)
        element.classList.remove(class2)
    }
    
}