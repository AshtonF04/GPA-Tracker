require('dotenv').config()

const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// calls user schema login metho
const login = async(req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)

        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// calls user schema signup method and generates jwt then sends back user and token 
const signup = async(req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.signup(email, password)
        const token = createToken(user._id)

        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = { login, signup }