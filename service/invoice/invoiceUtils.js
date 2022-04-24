
//takes in an array of expenses and returns the total value of only the completed expenses
const calculateTotalCost = (expenses) => {
    let cost = 0
    expenses.forEach(expenses => {
        if (expenses.completed === true){
            cost = cost + expenses.price
        }
    })
    return Math.round(100*cost)/100
}


module.exports = {
    calculateTotalCost,
}