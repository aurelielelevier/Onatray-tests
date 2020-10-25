var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createAccount', function(req,res,next){
console.log('its body',req.body)
})

module.exports = router;
