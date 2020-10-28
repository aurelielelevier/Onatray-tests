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
        firstName: String,
		lastName:String,
        email: String,
        password: String,
        token: String,
        salt: String, 
		phone: String,
        adress : String,
		avatar: String,
		countFave:Number,
		lookingForJob:Boolean,
        working:Boolean,
        speakLangage : Array,
        adresselgtlat:Array,
        perimetre:Array,
        wishlistTalent:[whishListTalentSchema],
        experience: [{type: mongoose.Schema.Types.ObjectId, ref: 'experience' }],
        formation: [{type: mongoose.Schema.Types.ObjectId, ref: 'formation'}],        
})

const talentModel = mongoose.model('talent', talentSchema)

module.exports = talentModel