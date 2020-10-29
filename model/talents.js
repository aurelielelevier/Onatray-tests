const mongoose = require('mongoose')

// const whishListTalentSchema = mongoose.Schema({
//     name : String,
//     streetName : String,
//     city : String,
//     zipCode : String,
//     pricing : String,
//     typeOfRestaurant : String,
//     TypeOfFood : String
// })



const talentSchema = mongoose.Schema({
    firstName: String,
    lastName:String,
    email: String,
    password: String,
    token: String,
    salt: String, 
    phone: String,
    avatar: String,
    lookingForJob:Boolean,
    working:Boolean,
    speakLangage : Array,
    adress : String,
    adresselgtlat:Array,
    perimetre:Array,
    countFave:Number,
    lookingJob : Array,
    wishlistTalent:[{type: mongoose.Schema.Types.ObjectId, ref: 'restaurants'}],
    experience: [{type: mongoose.Schema.Types.ObjectId, ref: 'experience' }],
    formation: [{type: mongoose.Schema.Types.ObjectId, ref: 'formation'}],
})

const talentModel = mongoose.model('talent', talentSchema)


module.exports = talentModel