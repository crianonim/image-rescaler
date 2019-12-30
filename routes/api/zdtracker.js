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
router.get('/events',(req,res)=>{
    const timeRestrictions=[];
    if (req.query.before) timeRestrictions.push("timestamp<"+req.query.before);
    if (req.query.after) timeRestrictions.push("timestamp>"+req.query.after);

    const before=timeRestrictions.length?"WHERE " +timeRestrictions.join(" AND "):"";
    const sql=`SELECT * FROM pageview_events ${before} order by timestamp DESC`
    console.log("SQL",sql)
    db.all(sql,(err,rows)=>{
        if (err) {console.log(err);
            res.json(err);
        }
        if (rows) {
            const now=Date.now();
            console.log(rows);
            rows.map(row=>{
                row.date=new Date(row.timestamp).toUTCString()   
                row.ago=(now-row.timestamp)/1000/60
            });
            const sorted=[];
            rows.map(row=>{
                const user=sorted.find(user=>user.user_id===row.user_id);
                console.log("USER",user);
                if (!user){
                    sorted.push({user_id:row.user_id,events:[row]})
                } else {
                    user.events.push(row);
                }
                console.log("Sorted",sorted)
            })
            if (req.query.groupByUser) res.json(sorted);
            else res.json(rows)
        }
    })
})

router.get('/users',(req,res)=>{
    db.all("select distinct user_id from pageview_events ",(err,rows)=>{
        if (err) {console.log(err);
            res.json(err);
        }
        if (rows) {
            const now=Date.now();
            console.log(rows);
           
            res.json(rows);

        }
    })
})
router.get('/user/:id',(req,res)=>{
    console.log(req.params.id)
    db.all(`SELECT * FROM pageview_events WHERE user_id='${req.params.id}' order by timestamp DESC`,(err,rows)=>{
        if (err) {console.log(err);
            res.json(err);
        }
        if (rows) {
            const now=Date.now();
            console.log(rows);
            rows.map(row=>{
                row.date=new Date(row.timestamp).toUTCString()   
                row.ago=(now-row.timestamp)/1000/60
            });
            res.json(rows);

        }
    })
})
module.exports = router;
