var express = require('express');
var router = express.Router();
router.post('/',(req,res)=>{
    console.log("BODY",req.body);
    res.send("ok fetch");
})

module.exports = router;
