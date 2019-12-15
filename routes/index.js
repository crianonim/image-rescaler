var express = require('express');
var router = express.Router();
const path= require('path');
const im = require('imagemagick');
const fs=require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Permutator v4 updated 09-12-2019' });
});
router.post('/',(req,res)=>{
  console.log("FILES",req.files)
  console.log("body",req.body)
  const width=req.body.width||"928"; // todo make function that will not throw
  const unsharp="0x"+(req.body.unsharp||"0.3")
  const filePath=path.join(__dirname,'..',req.files.upl.tempFilePath)
  console.log(filePath)
  console.log(fs.readFile(filePath,(err,data)=>{
    console.log("Err",err);
    console.log("Data",data);
    const dstPath=(req.body.prefix||"Perm-")+req.files.upl.name;
    //im.convert([filePath,'-scale', '928', '-contrast-stretch', '0.1x0.2',  '-unsharp','0x0.3',dstPath],(err,stdout)=>{
    im.convert([filePath,'-scale', width,'-unsharp',unsharp,dstPath],(err,stdout)=>{
      console.log("IM error",err);
      console.log("IM out",stdout);
      res.download(dstPath,(err)=>{
        fs.unlinkSync(filePath);
        fs.unlinkSync(dstPath);

      });
    })
  }))
})

module.exports = router;
