const mongoose = require('mongoose')

const whishListRestaurantSchema = mongoose.Schema({
	firstName: String,
    lastName:String,
    email: String,
    phone: String,
    avatar: String,
    lookingForJob:Boolean,
    working:Boolean,
    speakLangage : Array,
    adress : String,
    perimetre:Array,
    countFave:Number,
    lookingJob : Array,
})

const restaurantSchema = mongoose.Schema({
		name: String,
		email : String,
		salt:String,
		password:String,
		token :String,
		siret : String,
		website : String,
		phone: String,
		adress:String,
		clientele:Array,
		pricing:Number,
		typeOfRestaurant:Array,
		typeOfFood:Array,
		wishlistRestaurant:{ type: mongoose.Schema.Types.ObjectId, ref: 'talent' },
		experience: { type: mongoose.Schema.Types.ObjectId, ref: 'experience' },
		adresselgtlat:Array
    
})

const restaurantModel = mongoose.model('restaurant', restaurantSchema)

module.exports = restaurantModel