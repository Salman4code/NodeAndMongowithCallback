var express=require('express');
var router=express.Router();

router.use('/signup',require('./signup'));
router.use('/login',require('./login'));
router.use('/userprofile',require('./authentication'),require('./userprofile'));
router.use('/logout',require('./logout'));

module.exports=router;
