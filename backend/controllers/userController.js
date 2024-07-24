const user = require('../models/User')

const login = async(req, res) => {
    const { email, password } = req.body
    try{
        res.status(200).json({msg: 'LOGIN'})
    } catch (err) {
        console.log(err)
    }
}

const signup = async(req, res) => {
    const { email, password } = req.body
    try{
        res.status(200).json({msg: 'SIGNUP'})
    } catch (err) {
        console.log(err)
    }
}

module.exports = { login, signup }