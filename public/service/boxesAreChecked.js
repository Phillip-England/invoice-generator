const boxesAreChecked = (checkboxElements) => {
    for (x = 0; x < checkboxElements.length; x++){
        if (checkboxElements[x].checked == true){
            return true
        }
    }
    return false
}