const jtw = require('jsonwebtoken')

const authUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null){
            res.status(401)
            throw new Error('Not authorized')
        }
        jtw.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                res.status(403)
                throw new Error('User does not have access')
            } else {
                req.user = user
            }
        })
        next()
    } catch (error) {
        next(error)
    }
    
}

module.exports = authUser