const activateSubmitButton = (inputs, styles) => {
    if (formIsComplete(inputs)){
        Object.values(styles).forEach(style => {
            style()
        })
    }
}