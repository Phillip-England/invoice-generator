const jsDom = {

    /*
        CURRENT OPTIONS
        element: HTML element,
        className: String,
        test: boolean
    */
    //checks an element to see if any direct children have a given class name
    containsClass: (options) => {
        let containsClass = false
        for (x = 0; x < options.element.children.length; x++){
            //testing all children
            if (options.test == true){
                console.log(options.element.children[x], options.element.children[x].className)
            }
            if (options.element.children[x].className.includes(options.className)){
                containsClass = true
                break
            }
        }
        //testing final result
        if (options.test == true){
            console.log(`Final Result: ${containsClass}`)
        }
        return containsClass
    }

}