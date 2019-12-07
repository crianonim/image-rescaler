var express = require('express');
var router = express.Router();
const path= require('path')
const fs=require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',(req,res)=>{
  console.log("FILES",req.files)
  console.log("body",req.body)
  const filePath=path.join(__dirname,'..',req.files.upl.tempFilePath)
  console.log(filePath)
  console.log(fs.readFile(filePath,(err,data)=>{
    console.log("Err",err);
    console.log("Data",data);
    res.download(filePath,(err)=>{
      fs.unlinkSync(filePath);

    });
  }))
})

module.exports = router;
