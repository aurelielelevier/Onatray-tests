const mongoose = require('mongoose')

const whishListRestaurantSchema = mongoose.Schema({
    name : String,
    streetName : String,
    city : String,
    zipCode : String,
    pricing : String,
    typeOfRestaurant : String,
    TypeOfFood : String
})

const restaurantSchema = mongoose.Schema({
    name: String,
		streetName:String,
		city:String,
		zipCode:String,
		clientele:Array,
		pricing:Number,
		typeOfRestaurant:Array,
		typeOfFood:Array,
		salt:String,
		password:String,
		wishlistRestaurant:[whishListRestaurantSchema],
    
})

const restaurantModel = mongoose.model('restaurant', restaurantSchema)

module.exports = restaurantModel