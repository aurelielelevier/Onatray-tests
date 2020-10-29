const mongoose = require('mongoose')

const whishListTalentSchema = mongoose.Schema({
    name: String,
    email : String,
    website : String,
    phone: String,
    adress:String,
    clientele:Array,
    pricing:Number,
    typeOfRestaurant:Array,
    typeOfFood:Array,
})

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
    wishlistTalent:[whishListTalentSchema],
    experience: [{type: mongoose.Schema.Types.ObjectId, ref: 'experience' }],
    formation: [{type: mongoose.Schema.Types.ObjectId, ref: 'formation'}],
})

const talentModel = mongoose.model('talent', talentSchema)


module.exports = talentModel