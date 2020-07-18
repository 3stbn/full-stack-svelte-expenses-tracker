const mongoose = require('mongoose')
const { Schema } = mongoose
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', User)
