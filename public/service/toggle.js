const toggle = {

    //takes in an object of singular elements and reverses their style from none to default
    simple: (elements) => {
        Object.values(elements).forEach(val => {
            if (val.style.display == 'none'){
                val.style.display = ''
            } else {
                val.style.display = 'none'
            }
        })    
    },

    //toggles elements display but will not allow it to toggle back
    oneWay: (display, elements) => {
        Object.values(elements).forEach(val => {
            val.style.display = display
        }) 
    },

    //takes in a display style and a condition (boolean returned from a function)
    //if the condition is met, will toggle the element to a given style
    //if the condition is not met, will toggle the element to 'none'
    /*
        CURRENT OPTIONS
        display: string,
        element: HTML Element,
        condition: Boolean (can be boolean returned from function)
    */
    condition: (options) => {
        console.log(options)
        if (options.condition == true){
            options.element.style.display = options.display
        } else {
            options.element.style.display = 'none'
        }
    },

    /*
        CURRENT OPTIONS
        display: String
        element1: HTML Element
        element2: HTML Element
        test: boolean
    */
    swap: (options) => {
        //testing incoming options
        if (options.test == true){
            console.log(options.element1)
            console.log(options.element2)
        }
        //what do to on first run
        if (options.element1.style.display == undefined && options.element2.style.display == undefined){
            options.element1.style.display = 'none'
            options.element2.style.display = options.display
            //testing styles of both elements
            if (options.test == true){
                console.log('Display undefined: swapping element 2 to none')
                console.log(options.element1.style.display)
                console.log(options.element2.style.display)
            }
            return
        }
        //every run after the first run
        if (options.element1.style.display == 'none'){
            options.element1.style.display = options.display
            options.element2.style.display = 'none'
            //testing styles of both elements
            if (options.test == true){
                console.log('swapping element 2 to none')
                console.log(options.element1.style.display)
                console.log(options.element2.style.display)
            }
        } else {
            options.element1.style.display = 'none'
            options.element2.style.display = options.display
            //testing styles of both elements
            if (options.test == true){
                console.log('Swapping element1 to none')
                console.log(options.element1.style.display)
                console.log(options.element2.style.display)
            }
        }
    },

    /* 
        CURRENT OPTIONS
        group: OBJECT {
            style: String,
            elements: {
                elementName: HTML Element
            }
        }
    */

    swapGroups: (options) => {
        //looping through all the groups provided
        Object.values(options).forEach(group => {
            
            //looping through each individual group provided
            Object.values(group).forEach(property => {
                console.log(property)
            })

        })
    },

    /*
        CURRENT OPTIONS
        style: String
        showClassName: HTML Class Name
        hideClassName: HTML Class Name
    */

    hideAndShowByClassName: (options) => {
        let showElements = document.getElementsByClassName(options.showClassName)
        let hideElements = document.getElementsByClassName(options.hideClassName)
        for (x = 0; x < showElements.length; x++){
            showElements[x].style.display = options.style
        }
        for (x = 0; x < hideElements.length; x++){
            hideElements[x].style.display = 'none'
        }
    },
    
    /*
        IMPORTANT USAGE NOTES
            - the fetch request urls are pulled from the passed in element
              these elements must have a attribute of 'url'
              attached to this attribute must be the url for where the request will be routed to

        CURRENT OPTIONS
        elements: array,
        fetch: boolean,
        tableElement: HTML Element, (if the last row of a table is pulled, we have to pull the table too)
        removeEventElement: boolean, (will remove the element clicked by default, we to false if you dont want it removed)
    */
    removeElements: async (e, options) => {
        //initializing our variables
        let url
        let response
        //checking to see if we need to hide the button clicked
        //we will hide it by default
        if (options.removeEventElement == undefined){
            e.style.display = 'none'
        } else {
            //do nothing
        }
        console.log(options.elements)
        //looping through out elements
        if (options.fetch == true){
            for (x = 0; x < options.elements.length; x++){
                //calling our fetch request if option is given
                    url = options.elements[x].getAttribute('url')
                    response = await fetch(url, {
                        method: 'DELETE'
                    })
            }
        }  
        //pullling the elements from the dom
        for (x = 0; x < options.elements.length; x++){
            options.elements[x].remove()
        }
        //checking if we are working with an HTML table
        if (options.tableElement){
            if (options.tableElement.rows.length <= 1){
                options.tableElement.remove()
            }
        }  
    },

    //toggles a single element from the given display and back
    pickStyle: (element, display) => {
        if (element.style.display != display){
            element.style.display = display
        } else {
            element.style.display = 'none'
        }
    },

    //takes in an array and toggles their display from none to default
    simpleArray: (elements) => {
        for (x = 0; x < elements.length; x++){
            if (elements[x].style.display == 'none'){
                elements[x].style.display = ''
            } else {
                elements[x].style.display = 'none'
            }
        }
    },

    //toggles a given object of elements background color
    backgroundColor: (firstColor, secondColor, elements) => {
        Object.values(elements).forEach(val => {
            if (val.style.backgroundColor == firstColor){
                val.style.backgroundColor = secondColor
            } else {
                val.style.backgroundColor = firstColor
            }
        }) 
    }



}