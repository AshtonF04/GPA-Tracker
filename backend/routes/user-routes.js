const express = require('express')

const router = express.Router()

router.post('/login', (req, res) => {
    res.status(200).json({
        msg: 'Logged in'
    })
})

router.post('/signup', (req, res) => {
    res.status(200).json({
        msg: 'Signed up'
    })
})

module.exports = router