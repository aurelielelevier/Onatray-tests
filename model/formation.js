const mongoose = require('mongoose')

const formationSchema = mongoose.Schema({
        talent: { type: mongoose.Schema.Types.ObjectId, ref: 'talent'} ,
		school:String,
		city:String,
		diploma:String,
		endingDate:String,
		
})

const formationModel = mongoose.model('formation', formationSchema)

module.exports = formationModel