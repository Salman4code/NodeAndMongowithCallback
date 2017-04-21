var express=require('express');
var router=express();

router.post('/',function(request,response){
  console.log("logout");


  response.clearCookie("key");
  response.send("logout");
})


module.exports=router;
