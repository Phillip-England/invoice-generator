const formIsComplete = (inputElements) => {
    let formIsComplete = true
    for (x = 0; x < inputElements.length; x++){
        if (inputElements[x].value == ''){
            formIsComplete = false
            break
        }
    }
    return formIsComplete
}