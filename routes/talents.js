var express = require('express');
var router = express.Router();
var talentModel = require('../model/talents')
const {request} = require('express');
var uid2 = require('uid2');
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createAccount', async function(req,res,next){
console.log('its body',req.body)
  var salt = uid2(32)
  var talentToCheck = await talentModel.findOne({email:req.body.talentEmail})

  if(talentToCheck === null){
    var newTalent = await new talentModel({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.talentEmail,
      salt : salt,
      password : SHA256(req.body.password + salt).toString(encBase64),
      token: uid2(32), 
      phone : req.body.phone,

    })
    var talentSaved = await newTalent.save();
    if(talentSaved){
      res.json(token)
    }else{
      res.json(false)
    }
  }
})

router.post('/envoi-secteur', function(req, res, next){
  console.log('requete reçue par le back')
  // var listePoints = await JSON.parse(req.body.liste)
  // listePoints.push(listePoints[0]) 
  // console.log(listePoints)

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

module.exports = router;
