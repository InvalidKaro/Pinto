const packageHeader=document.getElementById("package-option"),packageButtons=packageHeader.getElementsByClassName("package-button"),periodHeader=document.getElementById("period-option"),periodButtons=periodHeader.getElementsByClassName("package-button"),stripeButton=document.getElementById("stripe-button"),paypalButton=document.getElementById("paypal-button"),checkBox=document.getElementById("terms"),modal=document.getElementById("myModal"),span=document.getElementsByClassName("close")[0];let packageValue=document.getElementsByClassName("package-active")[0],periodValue=document.getElementsByClassName("period-active")[0]
const saleMode=false
if(saleMode)document.getElementById("top-banner").getElementsByTagName('h2')[0].innerHTML=`<h4>🎉 VoiceMaster's 5 year anniversary sale, 25% off all lifetime packages! 🎉</h4>`
else document.getElementById("top-banner").innerHTML=`<h2>We now offer a <u>free 7 day trial</u> to new customers when subscribing via card!</h2>`
const countDownDate=new Date("Aug 8, 2023 00:00:00").getTime();if(saleMode){const x=setInterval(function(){const now=new Date().getTime();const distance=countDownDate-now;const days=Math.floor(distance/(1000*60*60*24));const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));const minutes=Math.floor((distance%(1000*60*60))/(1000*60));const seconds=Math.floor((distance%(1000*60))/1000);document.getElementById("top-banner").getElementsByTagName('h3')[0].innerHTML=`<h3>${days}d ${hours}h ${minutes}m ${seconds}s</h3>`;if(distance<0){clearInterval(x);document.getElementById("demo").innerHTML="EXPIRED";}},1000);}
function updateTitle(){document.getElementById("option-title").innerHTML=`<h1>${packageValue.getAttribute("value")} - ${periodValue.getAttribute("value")}</h1>`}
function checkPackage(packageValue,periodValue){let price,salePrice
if(packageValue==="VoiceMaster+"){if(periodValue==="Monthly"){price="£3.99"}else if(periodValue==="Annually"){price="£39.99"}else if(periodValue==="Lifetime"){price="£69.99"
salePrice="£49.99"}}else if(packageValue==="VoiceMaster++"){if(periodValue==="Monthly"){price="£7.99"}else if(periodValue==="Annually"){price="£69.99"}else if(periodValue==="Lifetime"){price="£99.99"
salePrice="£69.99"}}else if(packageValue==="VoiceMaster+++"){if(periodValue==="Monthly"){price="£15.99"}else if(periodValue==="Annually"){price="£129.99"}else if(periodValue==="Lifetime"){price="£199.99"
salePrice="£149.99"}}
return[price,salePrice]}
function updatePrice(){const[price,salePrice]=checkPackage(packageValue.getAttribute("value"),periodValue.getAttribute("value"))
if(saleMode&&periodValue.getAttribute("value")==="Lifetime")return document.getElementById("total").innerHTML=`<h1><s>${price}</s>  ${salePrice}</h1>`
document.getElementById("total").innerHTML=`<h1>${price}</h1>`}
for(const element of packageButtons){element.addEventListener("click",function(){packageValue.className=packageValue.className.replace(" package-active","")
this.className+=" package-active"
packageValue=document.getElementsByClassName("package-active")[0]
updateTitle()
updatePrice()})}
for(const element of periodButtons){element.addEventListener("click",function(){periodValue.className=periodValue.className.replace(" period-active","")
this.className+=" period-active"
periodValue=document.getElementsByClassName("period-active")[0]
updateTitle()
updatePrice()})}
span.onclick=function(){modal.style.display="none";}
window.onclick=function(event){if(event.target===modal){modal.style.display="none";}}
stripeButton.addEventListener("click",function(){if(checkBox.checked){window.location.href=`/package-handler/?processor=stripe&plan=${periodValue.getAttribute("value")}&package=${(packageValue.getAttribute("value").replaceAll("+","P"))}`}else{modal.style.display="block";}})
paypalButton.addEventListener("click",function(){if(checkBox.checked){window.location.href=`/package-handler/?processor=paypal&plan=${periodValue.getAttribute("value")}&package=${(packageValue.getAttribute("value").replaceAll("+","P"))}`}else{modal.style.display="block";}})