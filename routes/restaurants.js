var express = require('express');
var router = express.Router();
var restaurantModel = require('../model/restaurants')

const {request} = require('express');
var uid2 = require('uid2');
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createAccount', async function(req,res,next){
  var salt = uid2(32)
  var restauToCheck = await restaurantModel.findOne({email:req.body.restaurantEmail})
  if(restauToCheck === null){
    var newRestau = await new restaurantModel({
      name : req.body.restaurantName,
      email : req.body.restaurantEmail,
      salt : salt,
      password : SHA256(req.body.password + salt).toString(encBase64),
      token: uid2(32), 
      siret : req.body.restaurantSiret,
      website : req.body.restaurantWebsite,
      phone : req.body.phoneRestaurant,
      adress : req.body.restaurantAdresss

    })
    var restauSaved = await newRestau.save();
    if(restauSaved){
      res.json(token)
    }else{
      res.json(false)
    }
  }
  console.log('its body',req.body)
})



router.put('/informations', async function(req,res,next){
  console.log('its body', req.body)
  await restaurantModel.updateOne({token:req.body.token},{clientele: req.body.clienteleOption, typeOfRestaurant : req.body.restaurantOption, typeOfFood:req.body.foodOption})
})

module.exports = router;
