var express = require('express');
var router = express.Router();
var talentModel = require('../model/talents')
var restaurantModel = require ('../model/restaurants')
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uniqid = require('uniqid');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign_in', async function(req,res,next){
  console.log(req.body.password)
  console.log(req.body.email)
  
  var talentToSearch = await talentModel.findOne({email : req.body.email})
  if(talentToSearch){
    var hash = SHA256(req.body.password + talentToSearch.salt).toString(encBase64)
    if (talentToSearch.password == hash){
      console.log(talentToSearch.adresselgtlat, 'ADRESSE LGTLAT')
      res.json({result:true, type:'talent', token : talentToSearch.token, adresse: talentToSearch.adresselgtlat, zone: talentToSearch.perimetre, profil: talentToSearch})
    }else{
      res.json({result : 'Error'})
    }
  }
  else{
    var restauToSearch = await restaurantModel.findOne({email : req.body.email})
    if(restauToSearch){
      var hashh = SHA256(req.body.password + restauToSearch.salt).toString(encBase64)
      if (restauToSearch.password == hashh){
        res.json({result : true, type:'restaurant', token : restauToSearch.token, adresse: restauToSearch.adresselgtlat, profil: restauToSearch})
      }else{
        res.json({result : 'Error'})
      }
    }else{
      res.json({result : 'Error'})
    }
  }
})

// router.post('/sign_in',async function(req,res,next){
//   //code erreur 1:réussi 2:champ vide 3:email déja utilisé
//   if(req.body.email===''|| req.body.password===''){
//     res.json({result:2})
//   }else{
//     var userToSearch = await usersModel.findOne({email:req.body.email })
//     var hash = SHA256(req.body.password + userToSearch.salt).toString(encBase64);
//     if(userToSearch.password === hash){
//       res.json({result:1,token:userToSearch.token})
//     }else{
//       res.json({result:3})
//     }
//   }
// })

router.post('/upload', async function(req, res, next) {
  console.log(req.files.photo)

  // var uniqidPhoto = uniqid()
  // var resultCopy = await req.files.photo.mv(`./tmp/photo${uniqidPhoto}.jpg`);
  // var resultCloudinary = await cloudinary.uploader.upload(`./tmp/photo${uniqidPhoto}.jpg`);
  // if(!resultCopy && resultCloudinary) {
  //   res.json({result: true, message: 'File uploaded!', cloudinary: resultCloudinary} );
  //   fs.unlinkSync(`./tmp/photo${uniqidPhoto}.jpg`)     
  // } else {
  //   res.json({result: false, message:resultCopy});
  // }
});

module.exports = router;
