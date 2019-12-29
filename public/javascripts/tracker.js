const id=localStorage.getItem('zd_tracker_id')||Date.now();
localStorage.setItem('zd_tracker_id',id);
const title=(document.querySelector('meta[property*="og:title"]')||{content:'not article'}).content
console.log(`User id: ${id} visited page:${title}`)
const timestamp=Date.now()
fetch("https://permutator.jans.site/api/zdtracker?"+timestamp,{method:"POST",body:{id,title,timestamp}}).then(console.log)