const jsForm = {

    //returns all the data from a given form
    getData: (formElement) => {
        let formData = new FormData(formElement)
        return new URLSearchParams(formData)
    },

    //if any form fields are empty, it will return the empty fields in an array
    //will dig 2 generations deep into all form children
    getEmptyFields: (formElement) => {
        //setting up variables
        let emptyFields = []
        let elements = []
        let tagNames = [
            'INPUT',
            'TEXTAREA',
            'SELECT'
        ]
        //running a loop on all 1st gen children
        for (x = 0; x < formElement.children.length; x++){
            //pushing all the 1st gen children into an array
            elements.push(formElement.children[x])
            //running a loop on the 1st generation children
            for (y = 0; y < formElement.children[x].children.length; y++){
                //pushing all 2nd gen children into an array
                elements.push(formElement.children[x].children[y])
            }
        }
        //running a loop on all our elements
        for (x = 0; x < elements.length; x++){
            //running a loop on our tag names for each element
            for (y = 0; y < tagNames.length; y++){
                if (elements[x].tagName == tagNames[y] && elements[x].value == ''){
                    emptyFields.push(elements[x])
                }
            }
        }
        return emptyFields
    },

    //takes in a form element and POSTS it via fetch
    postForm: async (e, url) => {
        //setting up variables
        let astrick
        let emptyFields = jsForm.getEmptyFields(e)
        //toggling the astricks of the empty fields
        if (emptyFields.length > 0){
            for (x = 0; x < emptyFields.length; x++){
                astrick = emptyFields[x].previousElementSibling.firstElementChild
                console.log(astrick)
                toggle.oneWay('inline', astrick)
            }
        }
        //making our fetch request
        const response = await fetch(url, {
            method: 'post',
            body: jsForm.getData(e)
        })
    },

    //========================================================//
    //VALIDATION METHODS
    //========================================================//

    whiteList: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','-','_','!','\''],

    checkForIllegalCharaters: (input) => {
        //boolean to track for illegal characters
        let isLegal
        //looping through our input character by character
        for (x = 0; x < input.length; x++){
            //we always assume the character is illegal until proven otherwise
            isLegal = false
            //comparing each character to our whitelist
            for (y = 0; y < jsForm.whiteList.length; y++){
                //checking if the character matches a whitelist
                if (input[x] == jsForm.whiteList[y] || input[x] == jsForm.whiteList[y].toUpperCase()){
                    //if it matches, make the character legal
                    isLegal = true
                }
            }
            //if the character is still illegal after the check, break the loop and return illegal
            if (isLegal == false) {
                break
            }
        }
        //returning the illegal status
        return isLegal
    },

    validateUsername: (e) => {
        //setting as invalid until certain criteria is met
        e.validity.valid = false
        jsForm.errorMessage.inputName = 'Username'
        //checking for illegal characters
        console.log(jsForm.checkForIllegalCharaters(e.value))



    },

    errorMessage: {
        inputName: "",
        toShort: "must contain more than 5 characters",
        toLong: "must contain less than 12 characters",
        containsIllegalCharacters: 'must only contain the following characters: ("a-z" "0-9" "-" "_" "!" "\'")'

    },


}