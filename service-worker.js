if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const f=e=>n(e,t),l={module:{uri:t},exports:o,require:f};i[t]=Promise.all(r.map((e=>l[e]||f(e)))).then((e=>(s(...e),o)))}}define(["./workbox-bfdce93d"],(function(e){"use strict";self.skipWaiting(),e.precacheAndRoute([{url:"index.html",revision:"b98613f6e92fd85b7119923517aec0b8"},{url:"main-ef55048.js",revision:null},{url:"main-ef55048.js.LICENSE.txt",revision:"c35e22b64561fb696bff8e857aed82c5"},{url:"main.ef55048.css",revision:null},{url:"manifest.json",revision:"b709d5164fd2fe26237e0fd2af2c8657"},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"}],{})}));
