// voice.js — напарник озвучивает свои реплики; официант не выпадает из роли
(function(){
  var WL=[
    {en:"Of course! Would you like to start with something to drink?",ru:"Конечно! Не желаете ли что-нибудь из напитков?",es:"¡Claro! ¿Empiezan con algo de beber?",esMX:"¡Claro! ¿Empiezan con algo de tomar?",vi:"Vâng! Quý khách bắt đầu với đồ uống nhé?"},
    {en:"Certainly. And what would you like to eat?",ru:"Разумеется. А что будете есть?",es:"Por supuesto. ¿Y qué van a comer?",esMX:"Por supuesto. ¿Y qué van a comer?",vi:"Vâng. Quý khách muốn dùng món gì?"},
    {en:"Very good. Shall I bring the menu while you decide?",ru:"Хорошо. Принести меню, пока вы выбираете?",es:"Muy bien. ¿Les traigo la carta mientras deciden?",esMX:"Muy bien. ¿Les traigo el menú mientras deciden?",vi:"Vâng ạ. Tôi mang thực đơn để quý khách chọn nhé?"}
  ];
  function pick(){var o=WL[Math.floor(Math.random()*WL.length)];return o[target]||o.en;}
  if(typeof sceneNext==="function"){var _sn=sceneNext;window.sceneNext=function(tid,said){var r=_sn(tid,said);if(tid==="restaurant"&&/Tell me more|Interesting|I see/.test(r))return pick();return r;};}
  if(!("speechSynthesis"in window))return;
  var last="";
  function say(t){if(!t||t===last)return;last=t;var u=new SpeechSynthesisUtterance(t);u.lang=(window.LANGS&&LANGS[target])?LANGS[target][2]:"en-US";u.rate=.95;speechSynthesis.cancel();speechSynthesis.speak(u);}
  var chat=document.getElementById("chat");
  if(chat&&window.MutationObserver){new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1&&n.classList&&n.classList.contains("client")){var who=n.querySelector(".who");say((n.textContent||"").replace(who?who.textContent:"","").trim());}});});}).observe(chat,{childList:true});}
})();