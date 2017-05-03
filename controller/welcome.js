var express = require('express');
var router = express.Router();



router.get("/",function(request,response){
  if(request.headers.cookie===undefined)
  {
    response.send({"status":false})
  }
  else
  response.send({"status":true})
})































module.exports=router;
