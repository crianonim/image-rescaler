var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tracker.db');
db.run("CREATE TABLE IF NOT EXISTS pageview_events (id INTEGER PRIMARY KEY, user_id TEXT NOT NULL, timestamp INTEGER NOT NULL, title TEX)");
router.post('/',(req,res)=>{
    console.log("BODY",req.body);
    const {id,title,timestamp}=req.body;
    db.run(`INSERT INTO pageview_events(user_id,timestamp,title) VALUES ('${id}',${timestamp},'${title}')`)
    res.json(req.body);
})

module.exports = router;
