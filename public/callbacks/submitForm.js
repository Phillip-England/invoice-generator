const submitForm = async (formElement, method, url) => {
    //getting our error message (if an error exists)
    let errorMessage = validateInputs(formElement)
    let inputs = formElement.getElementsByClassName('form-control')
    let astricks = formElement.getElementsByClassName('astrick')
    let errorElement = formElement.getElementsByClassName('error-message')[0]
    let loadingIcon = formElement.getElementsByClassName('loading-icon')[0]
    let submitButton = formElement.getElementsByClassName('submit-button')[0]

    //testing
    console.log(errorMessage)
    console.log(inputs)
    console.log(astricks)
    console.log(errorElement)
    console.log(loadingIcon)
    console.log(submitButton)

    //checking if the form is complete and if the error message is empty
    if (formIsComplete(inputs) && errorMessage.length == 0){
        //performing POST request
        let data = await fetchSimple({
            url: url,
            method: method,
            body: getFormValues(formElement, 'form-control')
        })
        if (data.error){
            errorElement.style.display = 'block'
            errorElement.innerText = data.error
        } else {
            //hiding the error message
            errorElement.style.display = 'none'
            //showing the loading icon
            loadingIcon.style.display = 'block'
            //hiding the submit button
            submitButton.style.display = 'none'
            //hiding astricks
            for (x = 0; x < astricks.length; x++){
                astricks[x].style.display = ''
            }
            console.log(data)
            if (data.url){
                window.location.pathname = data.url
            } else {
                location.reload()
            }
        }
    } else {
        //hiding all astricks
        for (x = 0; x < astricks.length; x++){
            astricks[x].style.display = ''
        }
        //showing astricks
        for (x = 0; x < astricks.length; x++){
            if (inputs[x].value == ''){
                astricks[x].style.display = 'inline'
            }
        }
        //showing error message
        errorElement.style.display = 'block'
        errorElement.innerText = errorMessage
    }
}