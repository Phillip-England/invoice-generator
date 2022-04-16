const errorHandler = (err, req, res, next) => {
    if (res.statusCode == 200){
        res.status(500)
    }
    console.log(`Running Error Handler with a statuscode ${res.statusCode}`)
    res.render('error.ejs', {
        errorMessage: err.message,
        errorStack: err.stack,
        NODE_ENV: process.env.NODE_ENV
    })
}

module.exports = errorHandler