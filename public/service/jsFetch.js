const jsFetch = {

    /*
        CURRENT OPTIONS
        url: String,
        method: String,
        jsonExtension: String,
        renderTarget: HTML Element,
    */
    simple: async (options) => {
        let data
        const repsonse = await fetch(options.url, {
            method: options.method
        })
        data = await repsonse.json()
        //if a renderTarget is provided, render the data
        if (options.renderTarget){
            options.renderTarget.innerText = data[options.jsonExtension]
        }
        return data
    },

    /*
        CURRENT OPTIONS
        url: String,
        renderTarget: HTML Element,
    */
    putAndRender: async (options) => {
        const repsonse = await fetch(options.url, {
            method: "PUT",
        })
        let data = await repsonse.json()
        options.renderTarget.innerText =  String(data.cost)
    },

    /*
        CURRENT OPTIONS
        method: HTTP Method
        jsonExtention: String (this is the name of the value we want to access in the json response from the server)
        elements: {HTML Elements} or [HTML Elements] (if we get a DELETE request, we will pull these elements from the DOM), 
        container: HTML Element (this container element will be removed if our container does not contain a given class of elements),
        containerElements: HTML class (if the length of the array returned is 0, remove the container)
        renderTarget: HTML Element (this is where we will render any json data coming from server)
        loadingIcon: HTML Element
        attributeID: HTML attribute (this can be uysed to sift out values from input fields not included in a form)
    */
    multiple: async (options) => {

        let response
        let data
        let containerElements
        let formInputs = []
        let formObject

        //displaying our loading icon if it is provided
        if (options.loadingIcon){
            options.loadingIcon.style.visibility = 'visible'
        }


        switch (options.method) {
            case 'DELETE':
                //stripping elements from DOM
                for (x = 0; x < options.elements.length; x++){
                    options.elements[x].remove()
                }
                //checking if we need to remove our container
                if (options.container){
                    containerElements = document.getElementsByClassName(options.containerElements)
                    if (containerElements.length == 0){
                        options.container.remove()
                    }
                }
                //making our fetch requests
                for (x = 0; x < options.elements.length; x++){
                    console.log(options.elements[x])
                    response = jsFetch.simple({
                        url: options.elements[x].getAttribute('url-delete'), 
                        method: options.method
                    })
                    //on the last fetch request, if data exists, render it
                    if (options.elements[x] == options.elements[options.elements.length-1] && options.renderTarget){
                        data = await response
                        options.renderTarget.innerText = data[options.jsonExtension]
                    }
                }
                break
            case 'UPDATE':
                for (x = 0; x < options.elements.length; x++){
                    formInputs.push(options.elements[x].getElementsByClassName('form-control'))
                }
                //looping through each form input
                for (x = 0; x < formInputs.length; x++){
                    //now looping through each value in each form element
                    formObject = {}
                        for (y = 0; y < formInputs[x].length; y++){
                            //collecting all our form names and values
                            formObject.assign(formInputs[x][y].getAttribute('name'), formInputs[x][y].value)
                        }
                    console.log(formObject)
                }
                
                
                break
        }

        //hiding our loading icon if it is provided
        if (options.loadingIcon){
            options.loadingIcon.style.visibility = 'hidden'
        }
        
    }

}