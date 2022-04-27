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
    }



}