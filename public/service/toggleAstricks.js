const toggleAstricks = (inputElements, astrickElements) => {
    //test
    console.log(astrickElements)
    console.log(inputElements)

    if (astrickElements.length > 1){
        //if we get many astricks
        for (x = 0; x < inputElements.length; x++){
            if (inputElements[x].value == ''){
                addClass(astrickElements[x], 'inline')
                removeClass(astrickElements[x], 'hide')
            } else {
                addClass(astrickElements[x], 'hide')
                removeClass(astrickElements[x], 'inline')
            }
        }
    } else {
        if (inputElements[x].value == ''){
            addClass(astrickElements, 'inline')
            removeClass(astrickElements, 'hide')
        } else {
            addClass(astrickElements, 'hide')
            removeClass(astrickElements, 'inline')
        }
    }

    
}