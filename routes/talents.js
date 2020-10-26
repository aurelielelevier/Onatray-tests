var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createAccount', function(req,res,next){
console.log('its body',req.body)
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
