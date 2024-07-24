const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

// schema defining a user document
const userSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// method to signup user
userSchema.statics.signup = async function(email, password) {
    if (!email | !password){
        throw Error('Must enter email and password.')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid.')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password is too weak.')
    }
    
    const exists = await this.findOne({ email })
    if (exists){
        throw Error('Email is already taken.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}


// method to login user from database
userSchema.statics.login = async function (email, password){
    if (!email || !password){
        throw Error('Must enter all fields.')
    }

    const user = await this.findOne({ email })

    if (!user){
        throw Error('Incorrect email.')
    }

    const passwordCorrect = await bcrypt.compare(password, user.password)

    if (!passwordCorrect){
        throw Error('Incorrect password.')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)