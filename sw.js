if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const c=e=>i(e,t),o={module:{uri:t},exports:l,require:c};s[t]=Promise.all(n.map((e=>o[e]||c(e)))).then((e=>(r(...e),l)))}}define(["./workbox-e0782b83"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/Auth-27fcba47.css",revision:null},{url:"assets/Auth-3a24401e.js",revision:null},{url:"assets/Grid-70f1e324.css",revision:null},{url:"assets/Grid-7ddd2aec.js",revision:null},{url:"assets/index-2519bcd6.js",revision:null},{url:"assets/index-e2b9b13e.css",revision:null},{url:"index.html",revision:"efd39856452556e48f08c47ca93e2398"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"manifest.webmanifest",revision:"c317ccb8bccf90bcbb5f0c301cd898cd"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
