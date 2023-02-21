//  SWIPER
const swiper = new Swiper('.swiper', {
  spaceBetween: 10,
  // loop: true,
  grabCursor: true,
  clickable: true,
  // mousewheel:{
  //   forceToAxis: true,
  // },
  
  breakpoints: {
      "@0.00": {
        slidesPerView: 1.5,
      },
      "@0.75": {
        slidesPerView: 2.5,
      },
      "@1.00": {
        slidesPerView: 3.5,
      },
      "@1.50": {
        slidesPerView: 4.5,
      },
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

// Responcive nav onglet
// adaptNavGeneral();

// function adaptNavGeneral(){
//   document.getElementById('titre-projets').style.left = ((document.getElementById('nav-projets').offsetLeft - 20) + "px");
//   document.getElementById('titre-formation').style.left = ((document.getElementById('nav-formations').offsetLeft - 20) + "px");
//   document.getElementById('titre-hobbies').style.left = ((document.getElementById('nav-hobbies').offsetLeft - 20) + "px");
//   document.getElementById('titre-contact').style.left = ((document.getElementById('nav-contact').offsetLeft - 20) + "px");
// };

// window.onresize = function(){
//   adaptNavGeneral();
// }


// Scroll

// titre_projets = document.getElementById('titre-projets');
// titre_formations = document.getElementById('titre-formation');
// titre_hobbies = document.getElementById('titre-hobbies');
// titre_contact = document.getElementById('titre-contact');

nav_home = document.getElementById('nav-home');
nav_projets = document.getElementById('nav-projets');
nav_formations = document.getElementById('nav-formations');
nav_hobbies = document.getElementById('nav-hobbies');
nav_contact = document.getElementById('nav-contact');
contact_aparition = false;
hobbies_aparition = false;
currentBackground =  "bg_purple";
oldNav = nav_home;
oldSection = home;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  mobile = true;
  site.classList.toggle("bg_purple");
  site.classList.toggle("bg_purpleDark");
}else{ mobile = false}

route = [
  ["home",
  "projets",
  "formations",
  "hobbies",
  "contact"],
  [
    "fedhubs",
    "devin"
  ]
];

historique = [];
currentHistorique = 0;
nav_home.addEventListener("click", changeSection);
nav_projets.addEventListener("click", changeSection);
nav_formations.addEventListener("click", changeSection);
nav_hobbies.addEventListener("click", changeSection);
nav_contact.addEventListener("click", changeSection);

// Change section
function changeSection(event, elem, hist) {
  if(event){
    currentSection = document.getElementById(document.getElementById(event.target.id).id.split("-")[1]);
    currentNav = event.target;
    hist = true;
  }else{
    currentSection = elem;
    // console.log("nav-"+elem.id)
    currentNav = document.getElementById("nav-"+elem.id);
  }

  historiqueScroll = 0;

  projets_detail.style.opacity = 0;
  projets_detail.classList.remove("show")
  projets_detail.classList.add("hide")

  oldSection.style.opacity = 0;
  oldSection.classList.add('hide');
  oldSection.classList.remove('show');
  oldSection.classList.remove('showFlex');
  oldSection.style.transform = 'translate(+200px)';
  // oldSection.style.display="none";


  currentNav.style.paddingBottom = "1px";
  currentNav.classList.remove('not_current');
  if(oldNav != currentNav){
    oldNav.style.paddingBottom = "0";
    oldNav.classList.add('not_current');
  }

  currentSection.style.opacity = 0;
  currentSection.style.transform = 'translateX(50px)';
  currentSection.classList.remove('hide');
  currentSection.classList.add('show');

  if(  currentSection.id == 'home'){
    currentSection.classList.remove('hide');
    currentSection.classList.add('showFlex');
  }else{
    currentSection.classList.remove('hide');
    currentSection.classList.add('show');
  }
  saveScroll = window.scrollY;
  // currentSection.insertBefore(document.getElementById('particles-js'),js);
  window.setTimeout(function(){
    
    currentSection.style.opacity = 1;
    currentSection.style.transform = 'translateX(-20px)';
    window.scrollBy( { top : -window.scrollY+historiqueScroll })
    setTimeout(function(){ 
      currentSection.style.transform = 'translateX(0px)';

    }, 550);
    
  },10);
  
  oldNav = currentNav;
  oldSection = currentSection;
  if(hist){
    li_hist = document.querySelectorAll('.li_historique');
    btn_suivant.classList.add('not_current')
    btn_precedent.classList.remove('not_current')

    if (li_hist[currentHistorique]) {
      li_hist[currentHistorique].style.color = "white";
    }
    historique.push([currentSection.id,saveScroll])
    lst_historique.innerHTML = "<li class='li_historique' value='"+(historique.length-1)+"'>/" + currentSection.id +"</li>" + lst_historique.innerHTML;
    currentHistorique = 0;
    // console.log(currentHistorique , " current historique")
  }
  // console.log(historique)
}

changeSection.apply(null,[null,home,true])

// Search barre
search.addEventListener("focus", function(event) {
  console.log(search.value)
  if(search.value==""){
    search.value = "\/";
  }
  document.addEventListener("keydown", enterSearch);
});
search.addEventListener("blur", function(event) {
  if(search.value=="\/"){
    search.value = "";
  }
  document.removeEventListener("keydown", enterSearch);
});
function enterSearch(event) {
  // console.log(event.target.value, 'eventttttttt')
  
  if (event.key === "Enter") {
    event.preventDefault();
    goToRoute(event.target.value, true)
    // console.log("ok",request,request.length);
  }
}

function goToRoute(adresse, hist) {
  console.log(adresse + " adresse")
  request = adresse.toLowerCase().split("/");
  request = request.filter(function(f) { return f !== '' })
  if(route[0].includes(request[0])){
    if(request.length == 1){
      changeSection.apply(null,[null,document.getElementById(request[0]),hist])
    }
    // console.log(route[0].indexOf(request[0]))
    switch (route[0].indexOf(request[0])) {
      case 1:
        if(request.length == 2 && route[1].includes(request[1])){
          // changeSection.apply(null,[null,document.getElementById(request[0])])
          changeDetails.apply(null,[null,request[1],hist])
        }
      break;
    
      default:
      break;
    }
  }
}


lst_historique.addEventListener("click", function(event) {
  console.log(event.target)
  if(event.target.tagName == "UL"){return;}
  goToRoute(event.target.innerHTML)
  li_hist = document.querySelectorAll('.li_historique');
  // console.log(currentHistorique, li_hist[currentHistorique].innerHTML, event.target.value,-(event.target.value - historique.length-1)-2)
  li_hist[currentHistorique].style.color = "white";
  event.target.style.color = "#00fe08";
  currentHistorique = -(event.target.value - historique.length-1)-2;
  if(currentHistorique == 0){
    btn_suivant.classList.add('not_current')
  }else{
    btn_suivant.classList.remove('not_current')
  }
  if(currentHistorique == li_hist.length - 1){
    btn_precedent.classList.add('not_current')
  }else{
    btn_precedent.classList.remove('not_current')
  }
  // console.log(event.target.innerHTML,event.target.value, "okkkkkk")
});

btn_precedent.addEventListener("click", function(event) {
  
  li_hist = document.querySelectorAll('.li_historique');
  if(currentHistorique == 0){
    btn_suivant.classList.remove('not_current')
  }
  if (currentHistorique < li_hist.length - 1) {
    li_hist[currentHistorique].style.color = "white";
    currentHistorique++;
    console.log(historique[li_hist[currentHistorique].value][0])
    goToRoute(historique[li_hist[currentHistorique].value][0])
    console.log(historique)
    li_hist[currentHistorique].style.color = "#00fe08";
    if(currentHistorique == li_hist.length - 1){
      btn_precedent.classList.add('not_current')
    }
  }
  
});

btn_suivant.addEventListener("click", function(event) {
  
  li_hist = document.querySelectorAll('.li_historique');
  if(currentHistorique == li_hist.length - 1){
    btn_precedent.classList.remove('not_current')
  }
  if (currentHistorique > 0) {
    li_hist[currentHistorique].style.color = "white";
    currentHistorique--;
    console.log(historique[li_hist[currentHistorique].value][0])
    goToRoute(historique[li_hist[currentHistorique].value][0])
    console.log(historique)
    li_hist[currentHistorique].style.color = "#00fe08";
    if(currentHistorique == 0){
      btn_suivant.classList.add('not_current')
    }
  }
  
});


// Historique
btn_historique.addEventListener("click", function(event) {
  if(lst_historique.classList.contains('hide')){
    lst_historique.classList.add('show');
    lst_historique.classList.remove('hide');
    lst_historique.style.opacity = 0;
    lst_historique.focus();
    window.setTimeout(function(){
      lst_historique.style.opacity = 1;
    },20);
  }else{
    lst_historique.style.opacity = 0;
    window.setTimeout(function(){
      lst_historique.classList.remove('show');
      lst_historique.classList.add('hide');

    },200);
  }
});

// close 
document.addEventListener('click', (event) => {
  if (!lst_historique.contains(event.target) && !btn_historique.contains(event.target) && lst_historique.classList.contains('show')) {
    lst_historique.style.opacity = 0;
    window.setTimeout(function(){
      lst_historique.classList.remove('show');
      lst_historique.classList.add('hide');
    },200);
  }
});

// btn_tools

btn_tools = document.querySelectorAll('.btn_tool');
p_tools = document.querySelectorAll('.p_tools');
btn_tools.forEach(element => {
  element.addEventListener("click", changeTools);
});

p_tools.forEach(element => {
  if(element.id != "p1"){
    element.style.opacity = "0";
  }
});

height = tool.offsetHeight;
contact_home.style.height = height + "px";
function changeTools(event) {
  width = tool.offsetWidth + "px";


  current_tool = document.getElementById(event.target.value);
  btn_tools.forEach(element => {
    element.classList.add('not_current')
  });
  p_tools.forEach(element => {
    if(element.style.opacity !== "0" ){
      old_elem = element;
      element.classList.add('hide');
      element.classList.remove('show');
    }
  });

  current_tool.classList.toggle('hide');
  current_tool.classList.toggle('show');
  current_tool.parentNode.parentNode.style.width = width;
  
  window.setTimeout(function(){
    old_elem.style.opacity = 0;
    setTimeout(function(){ 
      current_tool.style.opacity = 1;

    }, 70);
    event.target.classList.remove("not_current")
  },20);
}

btn_details = document.querySelectorAll('.button_detail');
btn_details.forEach(element => {
  element.addEventListener("click", changeDetails);
});

sections = document.querySelectorAll('section');
function changeDetails(event, elem, hist) {
  currentSection = projets;
  currentNav = nav_projets;
  currentNav.style.paddingBottom = "1px";
  currentNav.classList.remove('not_current');
  if(oldNav != currentNav){
    oldNav.style.paddingBottom = "0";
    oldNav.classList.add('not_current');
  }
  oldNav=nav_projets;
  
  sections.forEach(element => {
    if(element.classList.contains('show')){
      element.classList.remove('show');
      element.classList.add('hide');
    }
  });
  if(event){
    adresse = event.target.value;
  }else{
    adresse = elem;
  }
  projets_detail.classList.remove("hide")
  projets_detail.style.opacity = 0;
  projets_detail.classList.add("show")
  projets.classList.add('hide')

  // Création de l'objet XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // Configuration de la requête
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Le contenu HTML a été chargé avec succès
      document.getElementById("projets_detail").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "html/projet/"+adresse+".html", true);

  // Envoi de la requête
  xhttp.send();
 
  if(hist){
    // console.log(currentSection.id+"/"+adresse)
    btn_suivant.classList.add('not_current')
    btn_precedent.classList.remove('not_current')

    li_hist = document.querySelectorAll('.li_historique');
    if (li_hist[currentHistorique]) {
      li_hist[currentHistorique].style.color = "white";
    }
    historique.push([currentSection.id+"/"+adresse])
    lst_historique.innerHTML ="<li class='li_historique' value='"+(historique.length-1)+"'>/" + currentSection.id+"/"+adresse +"</li>" +lst_historique.innerHTML;  
    currentHistorique = 0;
  }

  window.setTimeout(function(){

    projets_detail.style.opacity = 1;
    projets.style.opacity = 0;
    window.setTimeout(function(){
        projets.classList.remove('show')
    },400);

  },50);
}
