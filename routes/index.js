var express = require('express');
var router = express.Router();
var talentModel = require('../model/talents')
var restaurantModel = require ('../model/restaurants')
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var chatRoomModel = require('../model/chatRoom')
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


router.post('/createChatRoom', async function(req,res,next){


  var expediteur = await restaurantModel.findOne(
    { token : req.body.expediteur }
 )
  var destinataire = await talentModel.findOne(
    {token : req.body.desti}
  )

   // console.log('expe ID', expediteur )
   // console.log('DESTI ID', destinataire)

    var chatRoomTocheck = await chatRoomModel.findOne({
      name : `chatRoomOf${req.body.expediteur}and${req.body.desti}`
    })
    if (chatRoomTocheck){
      res.json({result:`chat room déja existante entre ${req.body.expediteur} et ${req.body.desti} id : ${chatRoomTocheck.id}`, chatRoomId : chatRoomTocheck.id})

    }else{
      var newRoom = await new chatRoomModel({
        name : `chatRoomOf${req.body.expediteur}and${req.body.desti}`
      })
      await newRoom.save()
      await restaurantModel.updateOne({token : req.body.expediteur},{$addToSet:{chatRoom : newRoom.id}})
      await talentModel.updateOne({token : req.body.desti},{$addToSet:{chatRoom : newRoom.id}})
      res.json({result : ` création de chatRoomOf${req.body.expediteur}and${req.body.desti} id : ${newRoom.id}`, chatRoomId : newRoom.id})
    }


})

router.post('/getOldMessage',async function(req,res,next){
  var talentToFind = await talentModel.findOne({token:req.body.token})
 

  let chatRoomId = req.body.chatRoomId
  var chatRoomToFind = await chatRoomModel.findById(chatRoomId)
  if(chatRoomToFind){
    res.json({result : chatRoomToFind.message, card: talentToFind})
  }else {
    res.json({result : 'no old messages', card: talentToFind})
  }

//console.log('body',req.body.token)



})

router.post('/getMyChatRoom', async function(req,res,next){
  console.log(req.body.token)
  var talentToFind = await talentModel.findOne({token: req.body.token}).populate('chatRoom').exec()
  console.log(talentToFind)
  if(talentToFind){
    //console.log(talentToFind.chatRoom)
    res.json({result : talentToFind.chatRoom})
  }else{
    var restauToFind = await restaurantModel.findOne({token:req.body.token}).populate('chatRoom').exec()
    //console.log(restauToFind.chatRoom)
    res.json({result : restauToFind.chatRoom})
  }
})


module.exports = router;
