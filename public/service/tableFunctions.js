

//this function will loop through a set of given checkboxes
//it will check to see if any of the checkboxes are checked
//if any are checked it will toggle the given buttons style
//the style it will change it to is determined by the style we pass in
//if none of the checkboxes are checked
//then it will detoggled the button and change the style to 'none'
const toggleCheckboxButton = (checkboxes, button, style) => {
    let isChecked // this will help us determine if the button needs to be toggled or not
    //looping through our buttons to see if any are checked
    for (x = 0; x < checkboxes.length; x++){
        if (checkboxes[x].checked == true){
            isChecked = true
            button.style.display = style
            break //breaking the loop because if one is check, there is no need to move forward and check the rest
        } else {
            isChecked = false
        }
    }
    if (isChecked == false){
        //remove delete button
        button.style.display = 'none'
    }
}

//this function will loop through table rows
//it will check each <tr> and <td> element in the table
//it is seeking for checked checkboxes
//if it finds a checkbox, it will then check its classname
//if the classname matches the one provided, it will push the row into an array
//finally, it will return an array of all the rows with checkboxes which are checked and match the given classname
const getCheckedRows = (rows, className) => {
    const checkedRows = []
    //looping through the rows (the <tr> elements) to get the children elements
    for (x = 0; x < rows.length; x++){
        //now looping through the children of that row (the <td> elements)
        for (y = 0; y < rows[x].children.length; y++){
            //if the child (the <td>) has children, check to see if it is a checkbox, if it is a checkbox which is checked, check the classname
            // if all three criteria are met, push into our array
            if (rows[x].children[y].children.length > 0) {
                //finally, if the <td> has children, we need to loop through all of the children
                    for (z = 0; z < rows[x].children[y].children.length; z++){
                        //now checking if the chldren of our <td> are checked and match a given classname
                        if (rows[x].children[y].children[z].checked == true && rows[x].children[y].children[z].getAttribute('class') == className){
                            checkedRows.push(rows[x]) //pushing the row into our array to collect them
                        }
                    }
            }
        }
    }
    return checkedRows
}

//this function is used to remove specific rows from a table
//if the last row is removed, it will remove the entire table as well
//it also checks to see if and hidden rows (display:none;) still exist in the table
//if ONLY hidden rows exists, the table is still removed
const removeRowsAndTable = (rows, table) => {
    let removeTable //will determine if we remove our table or not
    //looping through and removing the specified rows
    for (x = 0; x < rows.length; x++){
        rows[x].remove() //removing the row from the document
    }
    //checking if the table has any informative rows left
    //table.children[0] contains the <tbody> element
    //so we are checking the rows by getting the length of the <tbody> element
    //if the tbody length is equal to 1, we remove the table
    //this is becuase the last row is headers, and they are not needed if there is no information in the table
    //if only one row remains, remove the table
    if (table.children[0].children.length <= 1) {
        removeTable = true
    }
    //checking the table body for rows
    //if all the rows after the header row are display:none; then remove the table
    for (x = 1; x < table.children[0].children.length; x++){
        if (table.children[0].children[x].style.display != 'none'){
            removeTable = false
            break //we break the loop because if we find one row which is not display:none; we keep the table
        } else {
            removeTable = true
        }
    }
    //checking to see if we need to remove the table
    if (removeTable == true){
        table.remove()
    }
}

//this function will take in a class of table cells and will toggle their display
const toggleTableCells = (elements) => {
    for (x = 0; x < elements.length; x++){
        if (elements[x].style.display == '') {
            elements[x].style.display = 'none'
        } else {
            elements[x].style.display = ''
        }
    }
}