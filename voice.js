// voice.js v5 — рация + официант + разблокировка голоса + умные гипотезы
(function(){
var HINT={ru:"🎙 слушаю… нажми 🎙 ещё раз, когда закончишь",en:"🎙 listening… tap 🎙 again when done",es:"🎙 escuchando… toca 🎙 otra vez al terminar",esMX:"🎙 escuchando… toca 🎙 otra vez al terminar",fr:"🎙 j'écoute… touche 🎙 à la fin",zh:"🎙 在听…说完再按🎙",vi:"🎙 đang nghe… hết ý bấm 🎙 lần nữa"};
document.addEventListener("click",function(e){
var b=e.target&&e.target.closest?e.target.closest("#micBtn"):null;if(!b)return;
if("speechSynthesis"in window)speechSynthesis.cancel();
setTimeout(function(){if(window.recording&&window.status)window.status(HINT[window.native]||HINT.en);},0);
},true);
if("speechSynthesis"in window){
var un=function(){try{speechSynthesis.resume();}catch(e){}var s=new SpeechSynthesisUtterance(" ");s.volume=0.01;try{speechSynthesis.speak(s);}catch(e){}document.removeEventListener("pointerdown",un);};
document.addEventListener("pointerdown",un);
}
var R={
greet:{en:"Good evening! What can I get you today?",ru:"Добрый вечер! Что будете заказывать?",es:"¡Buenas tardes! ¿Qué les traigo?",vi:"Chào buổi tối! Quý khách dùng gì?"},
drinks:{en:"It is a hot day — a jug of cold lemonade?",ru:"Сегодня жарко — не хотите ли графин холодного лимонада?",es:"Hace calor — ¿les traigo una jarra de limonada fría?",vi:"Trời nóng — quý khách có muốn một bình nước chanh mát không?"},
water:{en:"Cold water, of course — right away.",ru:"Холодную воду, конечно — сейчас принесу.",es:"Agua fría, por supuesto — enseguida.",vi:"Nước lạnh, vâng — ngay ạ."},
menu:{en:"Of course — here is the menu. Take your time.",ru:"Конечно — вот меню. Выбирайте не спеша.",es:"Claro — aquí tienen la carta.",vi:"Vâng — thực đơn đây ạ."},
food:{en:"Excellent — I'll pass it to the kitchen.",ru:"Отлично — передам на кухню.",es:"Estupendo — lo paso a la cocina.",vi:"Tuyệt — tôi báo bếp nhé."},
bill:{en:"Of course — the bill, right away.",ru:"Конечно — сейчас принесу счёт.",es:"Por supuesto — enseguida les traigo la cuenta.",vi:"Vâng — tôi mang hóa đơn ra ngay."},
bye:{en:"Thank you! Come back soon.",ru:"Спасибо! Возвращайтесь скорее.",es:"¡Gracias! Vuelvan pronto.",vi:"Cảm ơn! Hẹn gặp lại."},
repeat:{en:"Sorry! Let me say it slowly: we have drinks, food, or the bill.",ru:"Простите! Скажу медленно: напитки, еда или счёт.",es:"¡Perdón! Despacio: bebidas, comida o la cuenta.",vi:"Xin lỗi! Nói chậm nhé: đồ uống, đồ ăn hoặc hóa đơn."},
clarify:{en:"I didn't catch that. I can bring drinks, food, or the bill.",ru:"Не расслышал. Могу принести напитки, еду или счёт.",es:"No lo capté. Puedo traer bebidas, comida o la cuenta.",vi:"Tôi chưa nghe rõ. Tôi mang được đồ uống, đồ ăn hoặc hóa đơn."}
};
var ROUTES=[
[/repeat|again|slowly|pardon|sorry|understand|comprend|entiendo|повтор|медлен|не понимаю|прости|извин|lặp|chậm|不懂|再说/,"repeat"],
[/water|agua|eau|вода|вод|nước|水|cold|frí|froid|холод|lạnh|冷/,"water"],
[/hot|heat|calor|chaud|жар|nóng|热|lemonad|limonad/,"drinks"],
[/menu|carta|меню|thực đơn|菜单/,"menu"],
[/bill|cuenta|addition|счёт|счет|hóa đơn|结/,"bill"],
[/thank|gracias|merci|спасиб|cảm ơn|谢/,"bye"],
[/order|ready|food|eat|comer|pedir|ordenar|manger|want|хочу|quiero|voudrais|muốn|есть|еду|заказ|ăn|吃|点/,"food"],
[/\bhi\b|hello|hola|bonjour|привет|здравств|chào|你好/,"greet"]
];
function L(o){return o[window.target]||o.es||o.en;}
function route(said){var low=(said||"").toLowerCase();for(var i=0;i<ROUTES.length;i++){if(ROUTES[i][0].test(low))return L(R[ROUTES[i][1]]);}return L(R.clarify);}
window.pickBestAlt=function(alts){for(var i=0;i<alts.length;i++){var low=(alts[i]||"").toLowerCase();for(var r=0;r<ROUTES.length;r++){if(ROUTES[r][0].test(low))return alts[i];}}return alts[0];};
if(typeof window.sceneNext==="function"){var _sn=window.sceneNext;window.sceneNext=function(tid,said){if(tid==="restaurant")return route(said);return _sn(tid,said);};}
if("speechSynthesis"in window){
var chat=document.getElementById("chat");
if(chat&&window.MutationObserver){
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){
if(n.nodeType===1&&n.classList&&n.classList.contains("client")){
var who=n.querySelector(".who");var txt=(n.textContent||"").replace(who?who.textContent:"","").trim();
if(txt){var u=new SpeechSynthesisUtterance(txt);u.lang=(window.LANGS&&LANGS[window.target])?LANGS[window.target][2]:"en-US";u.rate=.95;speechSynthesis.speak(u);}
}
});});}).observe(chat,{childList:true});
}
}
})();
