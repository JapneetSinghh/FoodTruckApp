const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodTruckSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // GIVING REFERENCE TO USER SCHEMA
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    priceForTwo: {
        type: String,
        required: true
    },
    openingHours: {
        type: Array,
        required: true
    },
    cusinesOffered: {
        type: String,
        required: true
    },
    threeSpecialDishes: {
        type: Array,
        required: true
    },
    famousFor:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    servingSince:{
        type: Number,
        required: true
    },
    discountToday:{
        type: String,
        required: true
    },
    bogoOn:{
        type:Array,
        required: false
    },
    customDiscount1:{
        type: String,
        required:false
    },
    customDiscount2:{
        type: String,
        required:false
    },
    customDiscount3:{
        type: String,
        required:false
    },
    images:{
        type:Array,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNumbers:{
        type:String,
        required:true
    },    
    website:{
        type:String,
        required:false
    },
    rating:{
        type:Number,
        required:false
    },
    testimonials:{
        type:Array,
        required:false
    }
})

module.exports = mongoose.model('FoodTruck',foodTruckSchema);
