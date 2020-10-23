const mongoose = require('mongoose')

const formationSchema = mongoose.Schema({
        talent: { type: mongoose.Schema.Types.ObjectId, ref: 'talent'} ,
		name:String,
		city:String,
		diplomaTitle:String,
		startingDate:Date,
		endingDate:Date,
		isHotelerie:Boolean,
})

const formationModel = mongoose.model('formation', formationSchema)

module.exports = formationModel