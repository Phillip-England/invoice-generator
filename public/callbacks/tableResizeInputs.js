//will take in an object
//the object will contain the classnames
//each classname will represent a column in the table
//we will find the longest input in each column
//then we will set the entire column to match the width of the longest input in the column
//the HTML setup will look like this
//<div>
//  <input class='name-for-this-column'>
//<div>
const tableResizeInputs = (columns) => {
    //stores our inputs width which is the shortest
    let shortestWidth
    //stores the width of the header of our current column
    let headerWidth
    //looping through each collection of inputs to shrink them
    Object.values(columns).forEach(column => {
        //each time we start looping through a new column, reset our longest value
        shortestWidth = 100000
        //loop through each input in the columns to shrink them
        //we start the loop on 1 because 0 is the header
        for (x = 1; x < column.length; x++){
            //shrinking each input to fit its value width
            if (column[x].tagName == 'INPUT'){
                column[x].parentElement.style.width = String(column[x].value.length+'ch')
            }
            //shrinking each select to fit its value
            if (column[x].tagName == 'SELECT'){
                column[x].parentElement.style.width = String((3+column[x].value.length)+'ch')
            }
        }
        //looping back through to find the element with the shortest width
        for (x = 0; x < column.length; x++){
            //collecting the header width
            if (x == 0){
                headerWidth = column[x].offsetWidth
            }
            //finding the largest width of our inputs
            if (x !== 0 && column[x].offsetWidth < shortestWidth){
                shortestWidth = column[x].offsetWidth
            }
        }
        //looping back through a final time to apply widths to inputs shorter than the header
        for (x = 1; x < column.length; x++){
            //applying width to inputs shorter than the header
            if (headerWidth > shortestWidth && column[x].tagName == 'INPUT') {
                column[x].parentElement.style.width = String(headerWidth+'px')
            }
            //appliying width to selects shorter than the header
            if (headerWidth > shortestWidth && column[x].tagName == 'SELECT') {
                column[x].parentElement.style.width = String((3+headerWidth)+'px')
            }
        }
    })
}