const id=localStorage.getItem('zd_tracker_id')||Date.now();
localStorage.setItem('zd_tracker_id',id);
const title=(document.querySelector('meta[property*="og:title"]')||{content:'not article'}).content
console.log(`User id: ${id} visited page:${title}`)
const timestamp=Date.now()
fetch("/api/zdtracker?"+timestamp,{method:"POST",headers: {
    'Content-Type': 'application/json'
    
  },body:JSON.stringify({id,title,timestamp})}).then(res=>res.json()).then(console.log)