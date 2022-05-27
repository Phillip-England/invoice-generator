const getFormValues = (formContainer, inputClass) => {
    let formObject = {}
    let name
    let value
    let inputs = formContainer.getElementsByClassName(inputClass)
    for (x = 0; x < inputs.length; x++){
        name = inputs[x].getAttribute('name')
        value = inputs[x].value
        formObject[name] = value
    }
    return JSON.stringify(formObject)
}