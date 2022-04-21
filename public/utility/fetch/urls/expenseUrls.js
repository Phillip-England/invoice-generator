

//fetch request to delete an expense
export const deleteExpenseUrl = (env, expense) => {
    let url //defining our variable
    if (env == 'developement'){
        url = 'http://localhost:5000/expense/deleteExpense/' + expense //dev url
    } else {
        //production url goes here
    }
    return url
}
