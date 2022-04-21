import deleteExpenseUrl from "../utility/fetch/urls/expenseUrls"
import fetchWrapper from "../utility/fetch/wrappers/wrapper"

const toggleEditForm = async (e) => {

    //initializing our variables
    let editFormRow
    let expenseInfoRow

    //using a switch statement to identify the editFormRow and expenseInfoRow based off of the e.getAttribute('name')
    switch(e.getAttribute('name')){
        case 'edit_button':
            //relative routes for our edit button
            editFormRow = e.parentElement.parentElement.nextElementSibling
            expenseInfoRow = e.parentElement.parentElement
            break
        default:
            //relative routes for our save and cancel button (may need to modify if we move location of buttons)
            editFormRow = e.parentElement.parentElement
            expenseInfoRow = e.parentElement.parentElement.previousElementSibling
            break
    }

    //using a switch statement to change the display of the rows identified above (toggled functionality)
    switch (editFormRow.toggled){
        case undefined:
            editFormRow.toggled = true
            editFormRow.style.display = 'table-row'
            expenseInfoRow.style.display = 'none'
            break
        case true:
            editFormRow.toggled = false
            editFormRow.style.display = 'none'
            expenseInfoRow.style.display = 'table-row'
            break
        case false:
            editFormRow.toggled = true
            editFormRow.style.display = 'table-row'
            expenseInfoRow.style.display = 'none'
            break
    }
}

const deleteExpense = async (e, env, expense, invoice) => {

    //setting up our variables
    let url
    const expenseInfoRow = e.parentElement.parentElement
    const expenseFormRow = e.parentElement.parentElement.previousElementSibling
    const expenseTable = document.getElementById('expense_table')

    console.log(expenseTable.firstElementChild.children.length)
    
    //deleting the row from the DOM | if it is the last row, deleting the table
    if (expenseTable.firstElementChild.children.length <= 3) {
        expenseTable.remove()
    } else {
        expenseInfoRow.remove()
        expenseFormRow.remove()
    }
    
    // //establishing our URL (dev or production)
    // if (e.getAttribute('env') == 'development'){
    //     url = 'http://localhost:5000/expense/deleteExpense/' + expense
    // } else {
    //     //production url goes here
    // }

    // //doing our fetch request
    // try {
    //     const response = await fetch(url, {
    //     method: 'delete',
    //     })
    // } catch (error) {
    //     console.log(error)
    // }

    fetchWrapper(deleteExpense(env, expense), 'delete')

    //defining our url based off of the NODE_ENV
    if (env == 'development'){
        url = 'http://localhost:5000/invoice/getTotal/' + invoice
    } else {
        //enter production url here
    }

    //calling our fetch request to pull in the updated cost
    try {
        const response = await fetch(url, {
            method: 'get'
        })
        let cost = await response.json()
        console.log(cost)
        //grabbing our element which contains our total cost
        const invoiceTotal = document.getElementById('cost')
        //updating the cost
        invoiceTotal.innerText = cost
    } catch (error) {
        console.log(error.message)
    }
}

const completeExpense = async (e, env, expense, invoice) => {
    
    //setting up our variables
    let url

    //defining our url based off of the NODE_ENV
    if (env == 'development'){
        url = 'http://localhost:5000/expense/completeExpense/' + expense
    } else {
        //enter production url here
    }

    //calling our fetch statement
    try {
        const response = await fetch(url, {
        method: 'put'
        })
    } catch (error) {
       console.log(error.message) 
    }

    //defining our url based off of the NODE_ENV
    if (env == 'development'){
        url = 'http://localhost:5000/invoice/getTotal/' + invoice
    } else {
        //enter production url here
    }

    //calling our fetch request to pull in the updated cost
    try {
        const response = await fetch(url, {
            method: 'get'
        })
        let cost = await response.json()
        //grabbing our element which contains our total cost
        const invoiceTotal = document.getElementById('cost')
        //updating the cost
        invoiceTotal.innerText = cost //rounding the cost to the 100ths place
    } catch (error) {
        console.log(error.message)
    }
    
}