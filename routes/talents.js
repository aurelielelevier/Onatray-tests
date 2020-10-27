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
      res.json({token : talentSaved.token})
    }else{
      res.json(false)
    }
  }
})

router.post('/informations', async function(req,res,next){

    
 
 
await talentModel.updateOne({token:req.body.token},{speakLangage:req.body.langage, working:req.body.poste, lookingForJob: req.body.recherche})

    var talentToSearch = await talentModel.findOne({token : req.body.token})
    var formation = JSON.parse(req.body.formation)
    var experience = JSON.parse(req.body.experience)
    console.log(formation) 
    console.log(experience) 
    

  for (let i=0;i<formation.length;i++){
    var newFormation = await new formationModel({
    talent : talentToSearch.id,
    school : formation[i].school,
    diploma : formation[i].diploma,
    endingDate : formation[i].year,
    city : formation[i].city
  })
      await newFormation.save();
  }

  for(let i=0; i<experience.length;i++){
    var newExperience = await new experienceModel({
      talent  : talentToSearch.id,
      firm : experience[i].firm,
      city : experience[i].city,
      startingDate : experience[i].startDate,
      endingDate : experience[i].endDate
    })
    await newExperience.save();
  }
 })



router.post('/envoi-secteur', async function(req, res, next){
  console.log('requete reçue par le back')
  var listePoints = await JSON.parse(req.body.liste)
  listePoints.push(listePoints[0]) 
  console.log(listePoints)


  // var result = await userModel.find(
  //   {
  //     adresseLatLng: {
  //        $geoIntersects: {
  //           $geometry: {
  //              type: "Polygon" ,
  //              coordinates: [ listePoints ],
  //              crs: {
  //                 type: "name",
  //                 properties: { name: "urn:x-mongodb:crs:strictwinding:EPSG:4326" }
  //              }
  //           }
  //        }
  //     }
  //   }
  // )
  res.json([[48.866667, 2.333333], [48.830745, 2.2135133588867095], [48.807913541763654, 2.4624223554687408]])
})

router.get(`/cherche-liste-restaurant`, async function(req, res, next){
  console.log('requête reçue')
  var response = await restaurantModel.find()
  console.log(response)
  res.json(response)
})

router.post(`/recherche-liste-restaurants`, async function(req, res, next){
  var restaurant = JSON.parse(req.body.restaurant)
  console.log(restaurant)
  var responseAenvoyer = await restaurantModel.find(
    {
          // adresseLngLat: {
          //    $geoIntersects: {
          //       $geometry: {
          //          type: "Polygon" ,
          //          coordinates: [ zone ],
          //          crs: {
          //             type: "name",
          //             properties: { name: "urn:x-mongodb:crs:strictwinding:EPSG:4326" }
          //          }
          //       }
          //    }
          // },
          typeOfFood : { $in: restaurant.cuisine},
          //cuisine : { $in: restaurant.cuisine} ,
          //typeOfRestaurant : { $in: restaurant.type} ,
          //clientele: { $in: restaurant.ambiance} ,
          // prix :{ $in: [restaurant.prix]} 
        }
  )
  
  console.log(responseAenvoyer, 'réponse !!!!!')
  res.json(responseAenvoyer)
})

module.exports = router;
