const getFormValuesMultiple = (formContainers, inputClass) => {
    let formObject = {}
    let allFormObjects = []
    let name
    let value
    let inputs
    for (x = 0; x < formContainers.length; x++){
        formObject = {}
        inputs = formContainers[x].getElementsByClassName(inputClass)
        for (y = 0; y < inputs.length; y++){
            name = inputs[y].getAttribute('name')
            value = inputs[y].value
            formObject[name] = value
        }
        allFormObjects.push(JSON.stringify(formObject))
    }
    
    return allFormObjects
}