const getCheckedRows = (tableRows, checkboxes) => {
    let checkedRows = []
    for (x = 0; x < tableRows.length; x++){
        if (checkboxes[x].checked == true){
            checkedRows.push(tableRows[x])
        }
    }
    return checkedRows
}