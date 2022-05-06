
const form = {


    //returns an array of all the empty fields in a form
    getEmptyFields: (formElement) => {
        let children = formElement.children
        let emptyFields = []
        let tagNames = [
            'INPUT',
            'TEXTAREA',
            'SELECT'
        ]

        //looping through our forms children
        for (x = 0; x < children.length; x++){
            //looping through our tag names to check if the current child is a match
            for (y = 0; y < tagNames.length; y++){
                //if the current child is a match, check to see if it has an empty value
                if (children[x].tagName == tagNames[y]){
                    if (children[x].value == '') {
                        emptyFields.push(children[x])
                    }
                }
            }
        }
        return emptyFields
    },

    //takes in uncompleted form fields as an array and displays their astricks
    //this assumes the form label is the previous element of our input tag
    //it also assumes the astrick is embedded as a child of the label tag
    showAstricks: (uncompletedFields) => {

        //looping through our uncompleted fields
        for (x = 0; x < uncompletedFields.length; x++){
            uncompletedFields[x].previousElementSibling.firstElementChild.style.display = 'inline'
        }

        //alerting the user
        alert('please fill out all the form fields')

    },

    //gets the data from a form in a way which can be passed through a fetch request
    getData: (formElement) => {
        let formData = new FormData(formElement)
        return new URLSearchParams(formData)
    },

    //this assumse the loader is the next element sibling of the button
    displayLoader: (button, loader, container) => {

        //toggling our button off
        toggle.simple({
            button: button,
        })
        
        //toggling our loader on
        toggle.pickStyle(loader, 'block')

        //toggling our container on
        if (container){
            toggle.pickStyle(container, 'flex')

        }
    },

    //gets todays date and formats it a specific way then places the value into a hidden input
    hiddenDate: (hiddenDateInput) => {
        let date = new Date()
        let todaysDate = String( Number(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear())
        hiddenDateInput.value = todaysDate
    }

}