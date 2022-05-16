const jsDom = {

    //will shrink all inputs with the given classname
    shrinkInputsInCell: (className, buffer) => {
        let elements = document.getElementsByClassName(className)
        for (x = 0; x < elements.length; x++){
            elements[x].style.width = elements[x].value.length + buffer + 'ch'
        }
    },

    resizeColumnToLargest: (buffer, classesOfElements) => {
        let largestWidth
        //looping through all each of our passed in class names
        Object.values(classesOfElements).forEach(classOfElements => {
            largestWidth = 0
            //looping through to find the largest width
            for (x = 0; x < classOfElements.length; x++){
                if (classOfElements[x].offsetWidth > largestWidth){
                    largestWidth = classOfElements[x].offsetWidth
                }
            }
            //looping through to set all elements width to the largest width
            for (x = 0; x < classOfElements.length; x++){
                //if we get an input, we have to set the size, not width
                if (classOfElements[x].tagName == 'INPUT'){
                    classOfElements[x].style.width = String(Number(largestWidth+buffer)) + 'px'
                    continue
                }
                classOfElements[x].style.width = String(largestWidth+'px')
            }
        }) 
    }

    

}