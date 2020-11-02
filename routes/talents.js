var express = require('express');
var router = express.Router();
var talentModel = require('../model/talents')
var formationModel = require('../model/formation')
var experienceModel = require('../model/experience')
const {request} = require('express');
var uid2 = require('uid2');
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");


var restaurantModel = require('../model/restaurants')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createAccount', async function(req,res,next){
//console.log('its body',req.body)
  var salt = uid2(32)
  var talentToCheck = await talentModel.findOne({email:req.body.talentEmail})

  if(talentToCheck === null){
    var newTalent = await new talentModel({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      salt : salt,
      password : SHA256(req.body.password + salt).toString(encBase64),
      token: uid2(32), 
      phone : req.body.phone,
    })
    var talentSaved = await newTalent.save();
    if(talentSaved){
      res.json({token : talentSaved.token, profil: talentSaved})
    }else{
      res.json(false)
    }
  }
})

router.post('/informations', async function(req,res,next){

  //console.log(req.body)
  var job = JSON.parse(req.body.job)
  var langage = JSON.parse(req.body.langage)

  await talentModel.updateOne({token:req.body.token},{speakLangage:langage, working:req.body.poste, lookingForJob: req.body.recherche, lookingJob:job})
  console.log(req.body.experience)
  
  //console.log('formation',req.body.formation)
  //console.log('experience',req.body.experience)
  
  var formation = JSON.parse(req.body.formation)
  var experience = JSON.parse(req.body.experience)
    
  for (let i=0;i<formation.length;i++){
  var newFormation = await new formationModel({
  school : formation[i].school,
  diploma : formation[i].diploma,
  endingDate : formation[i].year,
  city : formation[i].city
  })
  await newFormation.save();
  await talentModel.updateOne({token:req.body.token},{$addToSet:{formation:newFormation.id}})
  }
  
  for(let i=0; i<experience.length;i++){
  var newExperience = await new experienceModel({
  firm : experience[i].firm,
  city : experience[i].city,
  startingDate : experience[i].startDate,
  endingDate : experience[i].endDate
  })
  await newExperience.save();
  await talentModel.updateOne({token:req.body.token},{$addToSet:{experience:newExperience.id}})
  }
})


router.post('/envoi-secteur', async function(req, res, next){
  var lnglat = JSON.parse(req.body.lnglat)
  var listePoints = await JSON.parse(req.body.liste);
  listePoints.push(listePoints[0]);
  await talentModel.updateOne({ token: req.body.token }, {perimetre: listePoints,adress:req.body.adresse, adresselgtlat:lnglat })
})

router.post('/envoi-adresse', async function(req, res, next){
  var lnglat = JSON.parse(req.body.lnglat)
  console.log(req.body.adresse)
  await talentModel.updateOne({token: req.body.token}, {adress:req.body.adresse, adresselgtlat:lnglat})
})

// router.get(`/cherche-liste-restaurant/:token`, async function(req, res, next){
//   //console.log('requête reçue', req.params.token)
//   var liste = await restaurantModel.find()
//   var user = await talentModel.findOne({token:req.params.token})
//   var whishlist = user.wishlistTalent
//   console.log(user)
//   console.log(liste)
//   res.json({liste: liste, whishlist: whishlist} )
// })

router.post(`/recherche-liste-restaurants`, async function(req, res, next){
  var donnees = JSON.parse(req.body.restaurant)
  var responseAenvoyer = await restaurantModel.find(
     { 
      adresselgtlat: {
        $geoIntersects: {
           $geometry: {
              type: "Polygon" ,
              coordinates: [ donnees.zone ],
              // crs: {
              //    type: "name",
              //    properties: { name: "urn:x-mongodb:crs:strictwinding:EPSG:4326" }
              // }
           }
        }
      },
      typeOfFood : { $in: donnees.cuisine},
      typeOfRestaurant: { $in: donnees.ambiance},
      clientele: { $in: donnees.type},
      pricing :{ $in: donnees.prix} 
    }
  )
  var user = await talentModel.findOne({token:req.body.token})
  if (user.wishlistTalent){
    var whishlist = user.wishlistTalent
  } else{
   var whishlist = []
  } 
  res.json({liste : responseAenvoyer, whishlist: whishlist})
})

router.get('/detail-restaurant/:id', async function(req, res, next){
  var restaurant = await restaurantModel.findOne({_id:req.params.id})
  res.json(restaurant)
})

router.post('/whishlist', async function( req, res, next){
  var user = await talentModel.findOne({token: req.body.token})
  var restaurant = await restaurantModel.findOne({_id: req.body.restaurant})
  console.log(user)
  if(user.wishlistTalent.includes(restaurant._id)){
    await talentModel.updateOne({token: req.body.token}, { $pull: { wishlistTalent: { $in:  `${req.body.restaurant}` }} })
    console.log('retrait whishlist')
  } else {
    await talentModel.updateOne({token: req.body.token}, {$addToSet:{ wishlistTalent: req.body.restaurant}})
    console.log('ajout whishlist')
  }
  
  var response = await restaurantModel.find()
  var userAjour = await talentModel.findOne({token: req.body.token})
  res.json({liste :response, whishlist: userAjour.wishlistTalent})
})

router.get('/affiche-whishlist/:token', async function( req, res, next){
  console.log(req.params)
  var user = await talentModel.findOne({token: req.params.token}).populate('wishlistTalent').exec()
  res.json(user.wishlistTalent)
})

module.exports = router;
