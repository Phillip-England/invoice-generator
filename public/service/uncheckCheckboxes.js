const uncheckCheckboxes = (checkboxes) => {
    for (x = 0; x < checkboxes.length; x++){
        if (checkboxes[x].checked == true){
            checkboxes[x].checked = false
        }
    }
}