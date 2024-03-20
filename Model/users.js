const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    }, lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }, password: {
        type: String,
        required: true
    }, feedback: {
        type: Array,
        required: false
    }, dateCreated: {
        type: String,
        required: true
    },
    timeCreated: {
        type: String,
        required: true
    },userType:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User',userSchema)
