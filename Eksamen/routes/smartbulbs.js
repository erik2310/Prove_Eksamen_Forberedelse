var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET smart bulbs page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ikea_traadfri");
    dbo.collection("smart_bulbs").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.render('smartbulbs', result);
    });
  });
  
});

/* GET smart bulbs as JSON. */
router.get('/getsmartbulbs', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ikea_traadfri");
    dbo.collection("smart_bulbs").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.json(result);
    });
  });
  
});

router.post('/insertsmartbulbs', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ikea_traadfri");

    var object = { 
      isTurnedOn: req.body.isTurnedOn,
      nominalPowerUsage: req.body.nominalPowerUsage,
      currentPowerUsage: req.body.currentPowerUsage,
      canAdjustLightIntensity: req.body.canAdjustLightIntensity,
      lightIntensity: req.body.lightIntensity,
      canChangeColor: req.body.canChangeColor,
      color: req.body.color,
      uID: req.body.uID,
      hardwareTypeNumber: req.body.hardwareTypeNumber,
      softwareVersion: req.body.softwareVersion
    };
    
    dbo.collection("smart_bulbs").insertOne(object, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    res.redirect('/smartbulbs');
  });
})

module.exports = router;
