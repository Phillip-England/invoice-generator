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