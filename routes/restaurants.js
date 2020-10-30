var express = require('express');
var router = express.Router();
var restaurantModel = require('../model/restaurants')
var talentModel = require('../model/talents')
var formationModel = require('../model/formation')
var experienceModel = require('../model/experience')

const {request} = require('express');
var uid2 = require('uid2');
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createAccount', async function(req,res,next){
  console.log(JSON.parse(req.body.lnglat))
  
  var salt = uid2(32)
  var restauToCheck = await restaurantModel.findOne({email:req.body.restaurantEmail})
  if(restauToCheck === null){
    var newRestau = await new restaurantModel({
      name : req.body.restaurantName,
      email : req.body.restaurantEmail,
      salt : salt,
      password : SHA256(req.body.restaurantPassword + salt).toString(encBase64),
      token: uid2(32), 
      siret : req.body.restaurantSiret,
      website : req.body.restaurantWebsite,
      phone : req.body.phoneRestaurant,
      adress : req.body.restaurantAdress,
      adresselgtlat: JSON.parse(req.body.lnglat),
    })
    var restauSaved = await newRestau.save();
    if(restauSaved){
      res.json({token:restauSaved.token})
    }else{
      res.json(false)
    }
  }

})

router.get('/getinformation', async function(req,res,next){
  let talentlist = await talentModel.find().populate('formation').populate('experience').exec()
  console.log("hole")
  res.json({talentlist:talentlist})
 })

 
  router.get('/getwishlist', async function(req,res,next){
   let restaurantwishlistexpand = await restaurantModel.findOne({token:'Kz2Y0noPWgcRu7N8NRoA7gGaPvZnocxR'}).populate('wishlistRestaurant').exec()
   let restaurantwishlistid = await restaurantModel.findOne({token:'Kz2Y0noPWgcRu7N8NRoA7gGaPvZnocxR'})
   res.json({restaurantwishlist:restaurantwishlistexpand,restaurantwishlistid:restaurantwishlistid.wishlistRestaurant})
  
  })

 router.post('/addToWishList', async function (req,res,next){
  
console.log(req.body.isinWishlist)
if(req.body.isinWishlist == 'false'){

await restaurantModel.updateOne({token:req.body.token},{$addToSet:{wishlistRestaurant:req.body.talent}})
}else{
  console.log('route true')
  await restaurantModel.updateOne({token:req.body.token},{ $pull:{wishlistRestaurant:{$in:`${req.body.talent}`}}}
  )
}

var wishlist=restaurantModel.findOne({token:req.body.token})

 res.json({wishlist:wishlist.wishlistRestaurant})
 })


router.put('/informations', async function(req,res,next){
  console.log('its body', req.body)
  await restaurantModel.updateOne({token:req.body.token},{clientele: JSON.parse(req.body.clientele), typeOfRestaurant : JSON.parse(req.body.restaurantOption), typeOfFood: JSON.parse(req.body.foodOption), pricing : JSON.parse(req.body.pricing)})
})

module.exports = router;
