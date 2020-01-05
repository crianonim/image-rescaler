//uuid
// !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).uuid=e()}}(function(){return function(){return function e(n,r,o){function t(u,f){if(!r[u]){if(!n[u]){var a="function"==typeof require&&require;if(!f&&a)return a(u,!0);if(i)return i(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var s=r[u]={exports:{}};n[u][0].call(s.exports,function(e){return t(n[u][1][e]||e)},s,s.exports,e,n,r,o)}return r[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)t(o[u]);return t}}()({1:[function(e,n,r){var o=e("./v1"),t=e("./v4"),i=t;i.v1=o,i.v4=t,n.exports=i},{"./v1":4,"./v4":5}],2:[function(e,n,r){for(var o=[],t=0;t<256;++t)o[t]=(t+256).toString(16).substr(1);n.exports=function(e,n){var r=n||0,t=o;return[t[e[r++]],t[e[r++]],t[e[r++]],t[e[r++]],"-",t[e[r++]],t[e[r++]],"-",t[e[r++]],t[e[r++]],"-",t[e[r++]],t[e[r++]],"-",t[e[r++]],t[e[r++]],t[e[r++]],t[e[r++]],t[e[r++]],t[e[r++]]].join("")}},{}],3:[function(e,n,r){var o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(o){var t=new Uint8Array(16);n.exports=function(){return o(t),t}}else{var i=new Array(16);n.exports=function(){for(var e,n=0;n<16;n++)0==(3&n)&&(e=4294967296*Math.random()),i[n]=e>>>((3&n)<<3)&255;return i}}},{}],4:[function(e,n,r){var o,t,i=e("./lib/rng"),u=e("./lib/bytesToUuid"),f=0,a=0;n.exports=function(e,n,r){var c=n&&r||0,s=n||[],l=(e=e||{}).node||o,d=void 0!==e.clockseq?e.clockseq:t;if(null==l||null==d){var v=i();null==l&&(l=o=[1|v[0],v[1],v[2],v[3],v[4],v[5]]),null==d&&(d=t=16383&(v[6]<<8|v[7]))}var p=void 0!==e.msecs?e.msecs:(new Date).getTime(),y=void 0!==e.nsecs?e.nsecs:a+1,b=p-f+(y-a)/1e4;if(b<0&&void 0===e.clockseq&&(d=d+1&16383),(b<0||p>f)&&void 0===e.nsecs&&(y=0),y>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");f=p,a=y,t=d;var m=(1e4*(268435455&(p+=122192928e5))+y)%4294967296;s[c++]=m>>>24&255,s[c++]=m>>>16&255,s[c++]=m>>>8&255,s[c++]=255&m;var w=p/4294967296*1e4&268435455;s[c++]=w>>>8&255,s[c++]=255&w,s[c++]=w>>>24&15|16,s[c++]=w>>>16&255,s[c++]=d>>>8|128,s[c++]=255&d;for(var g=0;g<6;++g)s[c+g]=l[g];return n||u(s)}},{"./lib/bytesToUuid":2,"./lib/rng":3}],5:[function(e,n,r){var o=e("./lib/rng"),t=e("./lib/bytesToUuid");n.exports=function(e,n,r){var i=n&&r||0;"string"==typeof e&&(n="binary"===e?new Array(16):null,e=null);var u=(e=e||{}).random||(e.rng||o)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,n)for(var f=0;f<16;++f)n[i+f]=u[f];return n||t(u)}},{"./lib/bytesToUuid":2,"./lib/rng":3}]},{},[1])(1)});

const id=localStorage.getItem('zd_tracker_id')
// localStorage.setItem('zd_tracker_id',id);
const title=(document.querySelector('meta[property*="og:title"]')||{content:'not article'}).content
console.log(`User id: ${id} visited page:${title}`)
const timestamp=Date.now()
// const url="https://permutator.jans.site"
const url="http://perm.com:3003"
fetch(url+"/api/zdtracker?"+timestamp,{method:"POST",credentials:'include',headers: {
    'Content-Type': 'application/json'
    
  },body:JSON.stringify({user_id:id,title,timestamp})}).then(res=>res.json())
  .then((resJSON)=>{
    console.log("Server responded",resJSON);
    if (resJSON.user_id){
      localStorage.setItem('zd_tracker_id',resJSON.user_id);
    }
  })