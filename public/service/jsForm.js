const jsForm = {

<<<<<<< HEAD
=======
    /*

    IMPORTANT NOTES

        1. Buttons must have type=submit on them. When displaying the loading icon, buttons are located by their tagName and type.
        This is to help avoid pulling in any other potential buttons the form may contain.

        2. Astricks will be attached to the labels of empty fields upon submission. These astricks must be the first child of all label tags in your HTML.
        This is to avoid dynamically placing HTML into the document, which is a potential security risk.

        3. Loading icons must have name='loading-icon'. This is how they are searched for. If the form is complete, the submit button and the loaidng icon
        Will swap displays. We assume the button and loading icon are loacted inside of a flex container. the loading Icon will default to 'block', but other styles
        can be potentially added later by providing options to the postForm method.


    AVAILABLE OPTIONS{
        options will be added when edge cases arrise in current code-base
        these options will allow us to take different paths based on different circumstances
    }
    
    */
    postForm: async (e, url, options) => {
        //what to do if we have empty form fields
        if (jsForm.checkForEmptyFields(e) == true){
            //astrick will be displayed and an error message will be populated
            //this is all handled on the validation section of this document
            return
        }
        //what to do if the form is completed
        if (jsForm.checkForEmptyFields(e) == false){
            //showing our loading icon
            jsForm.displayLoadingIcon(e)
            //making our fetch request
            const response = await fetch(url, {
                method: 'POST',
                body: jsForm.getData(e)
            })
            //reloading page
            window.location.reload()
        }
    },

>>>>>>> jsform
    //returns all the data from a given form
    getData: (formElement) => {
        let formData = new FormData(formElement)
        return new URLSearchParams(formData)
    },

<<<<<<< HEAD
=======
    //returns an object containing all listed fields inside a form
    getAllFields: (formElement) => {
        return {
            label: formElement.getElementsByTagName('LABEL'),
            input: formElement.getElementsByTagName('INPUT'),
            select: formElement.getElementsByTagName('SELECT'),
            textarea: formElement.getElementsByTagName('TEXTAREA'),
        }
    },

    //get all form elements (including fields and everything else)
    getAllElements: (formElement) => {
        return formElement.getElementsByTagName('*')
    },

    //finds and returns the loading icon of the form
    displayLoadingIcon: (formElement) => {
        let allFormElements = jsForm.getAllElements(formElement)
        let loadingIcon
        let button
        for (x = 0; x < allFormElements.length; x++){
            //pinning down the loading icon
            if (allFormElements[x].getAttribute('name') == 'loading-icon'){
                loadingIcon = allFormElements[x]
            }
            if (allFormElements[x].tagName == 'BUTTON' && allFormElements[x].getAttribute('type') == 'submit'){
                button = allFormElements[x]
            }
            
        }
        button.style.display = 'none'
        loadingIcon.style.display = 'block'
    },

>>>>>>> jsform
    //if any form fields are empty, it will return the empty fields in an array
    //will dig 2 generations deep into all form children
    getEmptyFields: (formElement) => {
        //setting up variables
        let emptyFields = []
<<<<<<< HEAD
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

=======
        let fields = jsForm.getAllFields(formElement)
        //looping through our object and its sub arrays
        //each array contains a different type of HTML field
        Object.values(fields).forEach(field => {
            for (x = 0; x < field.length; x++){
                //if the value is empty ('') then we push into our empty fields
                //buttons show a value of '', but other HTML tags show undefined
                //so we have to avoid grabbing buttons in the criteria
                if (field[x].value == '' && field[x].tagName != 'BUTTON'){
                    emptyFields.push(field[x])
                }
            }
        })
        return emptyFields
    },

    //this is dependant upon the user having an astick as the first child of a HTML label tag
    showAstrick: (emptyFormFields) => {
        for (x = 0; x < emptyFormFields.length; x++){
            label = emptyFormFields[x].previousElementSibling
            label.children[0].style.display = 'inline'
        }
    },


>>>>>>> jsform
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

<<<<<<< HEAD
=======
    checkForEmptyFields: (formElement) => {
        let emptyFields = jsForm.getEmptyFields(formElement)
        //if we have empty fields, we need to didplay our astrick and showcase an error message
        if (emptyFields.length > 0){
            jsForm.showAstrick(emptyFields)
            return true
        } else {
            return false
        }
    },

>>>>>>> jsform
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