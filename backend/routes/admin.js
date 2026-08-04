const { Router } = require ("express")
const adminRouter = Router()
const { adminModel } = require ("../db")

adminRouter.post('/signup', (req, res) => {
    res.json({
        message : "admin signup endpoint"
    })
})

adminRouter.post('/signin', (req, res) => {
    res.json({
        message : "admin signin endpoint"
    })
})

adminRouter.post('/signin', (req, res) => {
    res.json({
        message : "admin signin endpoint"
    })
})

adminRouter.post('/', (req, res) => {
    res.json({
        message : "admin signin endpoint"
    })
})

adminRouter.put('/', (req, res) => {
    res.json({
        message : "admin signin endpoint"
    })
})

adminRouter.get('/bulk', (req, res) => {
    res.json({
        message : "admin signin endpoint"
    })
})

module.exports = {
    adminRouter : adminRouter
}

