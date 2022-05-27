const validateInputs = (formElement) => {

    let errorMessage
    let isValid
    const whitelist = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','-','_','!','@','\'',' ',"#"]
    const validNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let inputElements = formElement.getElementsByClassName('form-control')

    //checking if all the required fields are filled out
    for (x = 0; x < inputElements.length; x++){
        if (inputElements[x].value == ''){
            errorMessage = 'Please fill out all the form fields'
            return errorMessage
        }
    }

    //looping through each inputElement for whitelist validation
    for (x = 0; x < inputElements.length; x++) {
        //looping through each character in our value
        for (y = 0; y < inputElements[x].value.length; y++){
            //each loop, reset is valid to false
            isValid = false
            //looping through each character in our whitelist
            for (z = 0; z < whitelist.length; z++){
                if (inputElements[x].value[y] == whitelist[z] || inputElements[x].value[y] == whitelist[z].toUpperCase()){
                    //setting is valid to true if we find a match
                    isValid = true
                }
                if (whitelist[z] == whitelist[whitelist.length-1] && isValid == false){
                    isValid = false
                    errorMessage = `Only use characters a-z, 0-9, and - _ ! @ ' #`
                    return errorMessage
                }
            }
        }
    }

    //validating based off of the 'type' of input
    for (x = 0; x < inputElements.length; x++){

        //validating dates
        if (inputElements[x].getAttribute('type') == 'date'){
            //all dates should have 10 characters
            if (inputElements[x].value.length != 10){
                errorMessage = 'Enter date in the following format: MM/DD/YYYY'
                return errorMessage
            }
        }

        //validating text
        if (inputElements[x].getAttribute('type') == 'text'){
            //text should only have 30 characters
            if (inputElements[x].value.length > 30){
                errorMessage = `${inputElements[x].getAttribute('label')} cannot contain more than 30 characters`
                return errorMessage
            }
        }

        //validating numbers
        if (inputElements[x].getAttribute('type') == 'number'){
            //making sure only numbers exist in our input
            //looping through each character in our value
            for (y = 0; y < inputElements[x].value.length; y++){
                //now comparing each character in our value to each number in our valid number list
                for (z = 0; z < validNumbers.length; z++){
                    //assuming the input is false
                    isValid = false
                    //if we find a match, make isValid true
                    if (inputElements[x].value[y] == validNumbers[z]){
                        isValid = true
                    }
                    //if we get to the last loop and we do not find a match, return an error message
                    if (inputElements[x].value[y] == inputElements[x].value[inputElements[x].value.length-1] && isValid == false){
                        errorMessage = `${inputElements[x].getAttribute('label')} must only contain numbers`
                    }
                }
            }
        }

    }



    //if our validation makes it this far, return an empty string as our error message
    errorMessage = ''
    return errorMessage

    
}