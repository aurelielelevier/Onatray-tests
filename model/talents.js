const mongoose = require('mongoose')

const whishListTalentSchema = mongoose.Schema({
    name : String,
    streetName : String,
    city : String,
    zipCode : String,
    pricing : String,
    typeOfRestaurant : String,
    TypeOfFood : String
})


const talentSchema = mongoose.Schema({
        name: String,
		lastName:String,
        email: String,
        password: String,
        token: String,
        salt: String, 
        city: String,
		streetName: String,
		zipCode:String,
		phone: String,
		avatar: String,
		countFave:Number,
		filterZipCode: Array,
		lookingForJob:Boolean,
		working:Boolean,
		wishlistTalent:[whishListTalentSchema],
})

const talentModel = mongoose.model('talent', talentSchema)

module.exports = talentModel