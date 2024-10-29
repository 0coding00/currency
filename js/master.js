let colorList=document.querySelectorAll(".setting .setting_content .color_list li");
// get color from local storage
if(window.localStorage.getItem("main_color")!=null){
    document.documentElement.style.setProperty("--main-color",window.localStorage.getItem("main_color"))   
    colorList.forEach((li)=>{li.classList.remove("active")});
    colorList.forEach((li)=>{
        if(li.getAttribute("data-color")===window.localStorage.getItem("main_color"))
            li.classList.add("active")
    })
}
//get color changing from local storage 
let activebg=true;
let changebagractiv=document.querySelectorAll(".setting .setting_content .chbgactive span");
if(window.localStorage.getItem("change_bg")!=null){
    changebagractiv.forEach((span)=>{span.classList.remove("active")});
    changebagractiv.forEach(span=>{
        if(span.getAttribute("data-background")===window.localStorage.getItem("change_bg"))
            span.classList.add("active");
    })
    if(window.localStorage.getItem("change_bg")==="yes")
        activebg=true;
    else activebg=false;
 }

// Open setting bar
let setting=document.querySelector(".setting");
let gear_big=document.querySelector(".setting .gear");
let gear=document.querySelector(".setting .gear .fa-gear");
gear_big.onclick=function(){
    setting.classList.toggle("open");
    gear.classList.toggle("fa-spin")
}


    //change colors

colorList.forEach((li)=>{
    li.addEventListener("click",function(e){
        handle_active(e);
         let mycolor=e.target.dataset.color;
      document.documentElement.style.setProperty("--main-color",mycolor)
      window.localStorage.setItem("main_color",mycolor)
    }   
)
})
//sliding the landing photo
let interval
function chnaging_bg(){
   let slider=document.querySelector(".landing");
let album=[];
for(let i=0;i<5;i++){
    album[i]=`../img/0${i+1}.jpg`;
}
interval=setInterval(function(){
    let rannum=Math.floor(Math.random() * album.length);
slider.style.backgroundImage=`url(${album[rannum]})`;
},10000)  
}
if(activebg){
    chnaging_bg();

}

 
// change photo activation
changebagractiv.forEach((span)=>{
    span.addEventListener("click",function(e){
        if(e.target.dataset.background=="yes"){
            chnaging_bg();
        }
        else{
            clearInterval(interval);
        }
        handle_active(e);
      window.localStorage.setItem("change_bg",e.target.dataset.background);
    }   
)
})
//bullet bar setting
let bbullet=document.querySelector(".nav_bullet");
let bbspan=document.querySelectorAll(".bbar span");
//get from local storage
if(window.localStorage.getItem("bbullet")!==null){
    if(window.localStorage.getItem("bbullet")==="yes"){
        bbullet.style.display="block";
    }
    else{
        bbullet.style.display="none";
    }
}
bbspan.forEach((span)=>{
    span.addEventListener("click",function(e){
        window.localStorage.setItem("bbullet",e.target.dataset.bbar);
        if(e.target.dataset.bbar==="yes"){
            bbullet.style.display="block";
        }
        else{
            bbullet.style.display="none";
        }
        handle_active(e);
    })
})
//reset button
let resetb=document.querySelector(".setting .setting_option .reset");
resetb.addEventListener("click",function(){
    window.localStorage.clear();
    window.location.reload();

})



// skills animation
let skillPercent=document.querySelector(".skills");
window.onscroll=function(){
    //height of element
let skiloffsettop=skillPercent.offsetTop;
//height of above element
let skiloffsetheight=skillPercent.offsetHeight;
//height of screen
let skilinerheight=this.innerHeight;
//height of scrolling 
let scrolloffset=this.scrollY;
let skillPercentspan=document.querySelectorAll(".skills .progress_box .progress_percent span");
if(scrolloffset>(skiloffsettop+skiloffsetheight-skilinerheight)){
skillPercentspan.forEach(span=>{
    span.style.width=span.dataset.progress;
})
}
else if(scrolloffset<(skiloffsettop-skilinerheight)){
    skillPercentspan.forEach(span=>{
        span.style.width="0%";
    })
}
}
// pop up photo
let galleryImgs=document.querySelectorAll(".gallery .images_box img")
let div=document.createElement("div");
let imgtxt=document.createElement("h4");
let img=document.createElement("img");
let cnclBtn=document.createElement("span");
div.classList.add("img_popup")
cnclBtn.textContent="X";
cnclBtn.onclick=function(){
    cnclBtn.parentElement.remove();
}
div.appendChild(imgtxt);
div.appendChild(img);
div.appendChild(cnclBtn);
galleryImgs.forEach((ele)=>{
  ele.addEventListener("click",function(e){
     img.src=this.src;
     if(this.alt!==null){
        imgtxt.textContent=this.alt;
     }
    document.body.appendChild(div);
});  
})
    
// bullet click
let bullet=document.querySelectorAll(".nav_bullet .bullet");
let bullet_text=document.querySelectorAll(".nav_bullet .bullet .bultext");
bullet.forEach(bul=>{
  bul.addEventListener("click",function(e){
    bullet_text.forEach(butx=>{
        if(butx.parentElement===e.target){
            document.querySelector(`#${butx.dataset.text}`).scrollIntoView({
                behavior:'smooth'
            });
        }
    })
  })
})
// links activate
let ldlinks=document.querySelectorAll(".landing .header .links li a");
ldlinks.forEach(a=>{
    a.addEventListener("click",function(e){
        document.querySelector(e.target.dataset.title).scrollIntoView({
            behavior:'smooth'
        });
    })
});
// links activate
let ldlinkstog=document.querySelectorAll(".landing .header .toggle-menu .toggle-links li a");
ldlinkstog.forEach(li=>{
    li.addEventListener("click",function(e){
        document.querySelector(`#${e.target.dataset.title}`).scrollIntoView({
            behavior:'smooth'
        });
    })
})
//switch active
function handle_active(element){
    element.target.parentElement.querySelectorAll(".active").forEach(ele=>{
        ele.classList.remove("active")
    })
element.target.classList.add("active");
}
// toggle function
let tog_btn=document.querySelector(".landing .header .toggle-menu");
let tog_btn_list=document.querySelector(".landing .header .toggle-menu .toggle-links");
tog_btn.onclick=function(){
tog_btn_list.classList.toggle("open");
tog_btn.classList.toggle("open")
}
// get year for the footer
let history=new Date().getFullYear();
let footer=document.querySelector(".footer");
let quate=document.createElement("p");
quate.classList.add("quate");
quate.appendChild(document.createTextNode(`Made with Love By BlackCoder @${history}`));
footer.appendChild(quate);
 

// fix the header
  let fixhead=document.querySelector(".landing .header");
let landing=document.querySelector(".landing");
addEventListener("scroll",function(){if(window.scrollY>=100){
fixhead.style.cssText="position: fixed;left: 0;top: 0px;padding: 20px;background-color: #333;padding-left: 0px;color: aliceblue;z-index: 2;display: flex;width: 100%;padding-top: 10px;justify-content: space-between;z-index: 100000;transition:.4s"
landing.style.cssText="z-index:1000;";
}
else{
    fixhead.style.cssText="position: relative;color: aliceblue;z-index: 2;display: flex;width: 100%;padding-top: 10px;justify-content: space-between ;transition:.4s";
    landing.style.cssText="z-index:1;";
}
})
// change header active
let fixheadlinks=document.querySelectorAll(".landing .header .links li a");
addEventListener("scroll",function(e){
    if(window.scrollY < 700)
        {
            fixheadlinks.forEach(ele=>{ele.classList.remove("active")});
            fixheadlinks[0].classList.add("active")
        }
    if(window.scrollY > 700 && window.scrollY<1400)
    {
        fixheadlinks.forEach(ele=>{ele.classList.remove("active")});
        fixheadlinks[1].classList.add("active")
    }
    if(window.scrollY > 1422 && window.scrollY<2090)
        {
            fixheadlinks.forEach(ele=>{ele.classList.remove("active")});
            fixheadlinks[2].classList.add("active")
        } 
   if(window.scrollY > 2090 && window.scrollY<3300)
            {
        fixheadlinks.forEach(ele=>{ele.classList.remove("active")})
                fixheadlinks[3].classList.add("active")
      }
    if(window.scrollY > 3300 && window.scrollY<4100)
       {
    fixheadlinks.forEach(ele=>{ele.classList.remove("active")});
fixheadlinks[4].classList.add("active")
}
if(window.scrollY > 4100 && window.scrollY<5000)
{
fixheadlinks.forEach(ele=>{ele.classList.remove("active")});
fixheadlinks[5].classList.add("active")
}
if(window.scrollY > 5000 && window.scrollY<6870)
{
fixheadlinks.forEach(ele=>{ele.classList.remove("active")});
  fixheadlinks[6].classList.add("active")
}
})
