(()=>{"use strict";const e=new class{images;game;current;firstCard;secondCard;constructor(e,s){this.game=document.querySelector(s),this.images=document.querySelectorAll(e),this.firstCard="",this.secondCard="",this.current=0,this.setClass=this.setClass.bind(this)}buildCard(e){const s=[0,1,2,3,4,5,6,7],t=[...s,...s].sort((()=>Math.random()-.5));for(let s=0;s<16;s++){const i=document.createElement("div");i.classList.add("img"),i.style.backgroundImage=`url(/images/${t[s]}.png)`,e.appendChild(i)}this.images=document.querySelectorAll(".img"),this.addEvents(this.images)}setClass(e){e.currentTarget instanceof HTMLElement&&(e.currentTarget.classList.add("active"),""===this.firstCard?(this.firstCard=e.currentTarget,this.firstCard.removeEventListener("click",this.setClass)):""===this.secondCard&&(this.secondCard=e.currentTarget,this.images.forEach((e=>{e.removeEventListener("click",this.setClass)})),setTimeout((()=>{this.firstCard instanceof HTMLDivElement&&this.secondCard instanceof HTMLDivElement&&(this.firstCard.style.backgroundImage===this.secondCard.style.backgroundImage?(this.images.forEach((e=>{e.classList.remove("active"),e.addEventListener("click",this.setClass),this.current++})),this.secondCard.classList.add("sucess","active"),this.firstCard.classList.add("sucess","active"),this.firstCard.removeEventListener("click",this.setClass),this.secondCard.removeEventListener("click",this.setClass),this.secondCard.classList.remove("img"),this.firstCard.classList.remove("img"),this.firstCard="",this.secondCard="",setTimeout((()=>{this.resetGame()}),2e3)):(this.images.forEach((e=>e.addEventListener("click",this.setClass))),this.secondCard.classList.remove("active"),this.firstCard.classList.remove("active"),this.firstCard.addEventListener("click",this.setClass),this.firstCard="",this.secondCard="",this.images.forEach((e=>{e.classList.remove("active")}))))}),600)))}addEvents(e){e.forEach((e=>e.addEventListener("click",this.setClass)))}resetGame(){if(128===this.current){const e=document.querySelector(".reset");this.game.innerHTML="",this.current=0,e instanceof HTMLElement&&(e.style.display="flex")}}init(){return this.buildCard(this.game),this}}(".img",".game"),s=document.querySelector(".init p");s?.addEventListener("click",(function(){e.init(),s?.parentElement?.remove()}));const t=document.querySelector(".reset");t?.addEventListener("click",(function(){t instanceof HTMLElement&&(t.style.display="none");const s=document.querySelector("main");s instanceof HTMLElement&&(s.innerHTML=""),setTimeout((()=>{e.init()}),500)}))})();