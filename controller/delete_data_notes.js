var express = require('express');
var router = express.Router();
var UserData = require('../model/data_notes');



router.post('/', function(request, response) {

  console.log("delete Api call");

  UserData.deletes_data_notes(request.body, function(err, result) {
    console.log(result);
    if (err) {
      response.send({
        "status": false,
        "message": err
      });
    } else {
      response.send({
        "status": true,
        "message": result
      });
    }

  })

})

module.exports = router;
