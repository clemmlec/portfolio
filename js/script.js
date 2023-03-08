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

// function adaptNavGeneral(){
//   document.getElementById('titre-projets').style.left = ((document.getElementById('nav-projets').offsetLeft - 20) + "px");
//   document.getElementById('titre-formation').style.left = ((document.getElementById('nav-formations').offsetLeft - 20) + "px");
//   document.getElementById('titre-hobbies').style.left = ((document.getElementById('nav-hobbies').offsetLeft - 20) + "px");
//   document.getElementById('titre-contact').style.left = ((document.getElementById('nav-contact').offsetLeft - 20) + "px");
// };

// window.onresize = function(){
//   adaptNavGeneral();
// }

nav_home = document.getElementById('nav-home');
nav_projets = document.getElementById('nav-projets');
nav_formations = document.getElementById('nav-formations');
nav_hobbies = document.getElementById('nav-hobbies');
nav_contact = document.getElementById('nav-contact');
contact_aparition = false;
hobbies_aparition = false;
currentSection = home;
currentBackground =  "bg_purple";
oldNav = nav_home;
oldSection = home;
currentApp = "";
current_projets_detail = "";
calculetteCharger = false

// console.log(navigator)
// console.log(navigator.userAgent)

// L'utilisateur préfère le mode sombre
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  light = false;
}
// console.log(window.matchMedia('(prefers-color-scheme: light)'))
// L'utilisateur préfère le mode clair
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  light = true;
  var pJS = window.pJSDom[0].pJS;
  // console.log(pJS)
  // console.log(pJS.particles.color)
  pJS.particles.color.rgb =  { r: 6, g: 15, b: 156 } 
  pJS.particles.line_linked.color_rgb_line = { r: 6, g: 15, b: 156 }
  pJS.particles.line_linked.color = "#000000"
  pJS.particles.shape.stroke = { width: 1, color: "#000000" }

  // Pour changer propriété CSS
  // document.documentElement.style.setProperty('--bg-color', 'blue');
}
main_color = "white";
primary = "#08af0d";
if(light){
  main_color = "black";
  primary = "#3c3fde";
}
// L'utilisateur est sur mobile
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  mobile = true;
  // site.classList.toggle("bg_purple");
  // site.classList.toggle("bg_purpleDark");
}else{ mobile = false}

route = [
  ["home",
  "projets",
  "formations",
  "hobbies",
  "contact"],
  [
    "portfolio",
    "fedhubs",
    "devin",
    "apimages",
    "saveworld",
  ]
];
widowLoad = true;
foo =0;
historique = [];
currentHistorique = 0;
nav_home.addEventListener("click", changeSection);
nav_projets.addEventListener("click", changeSection);
nav_formations.addEventListener("click", changeSection);
nav_hobbies.addEventListener("click", changeSection);
nav_contact.addEventListener("click", changeSection);
// Premiere lettre ne majuscule
function strUcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}
// Change section
function changeSection(event, elem, hist) {
  if(event){
    currentSection = document.getElementById(document.getElementById(event.target.id).id.split("-")[1]);
    currentNav = event.target;
    hist = true;
  }else{
    currentSection = elem;
    currentNav = document.getElementById("nav-"+elem.id);
  }
  historiqueScroll = 0;

  hide(projets_detail);
  hide(oldSection,'translate(+200px)');
  hide(nav_detail)

  switchNav(oldNav,currentNav);
  show(currentSection,'translateX(50px)')

  saveScroll = window.scrollY;

  window.setTimeout(function(){
    currentSection.style.opacity = 1;
    currentSection.style.transform = 'translateX(-20px)';
    window.scrollBy( { top : -window.scrollY+historiqueScroll })
    setTimeout(function(){ 
      currentSection.style.transform = 'translateX(0px)';
    }, 550);
  },10);
  
  oldNav = currentNav;
  document.title = strUcFirst(currentSection.id) +" | Clem-web";
  document.querySelector('meta[name="description"]').setAttribute("content", "_desc");
  
  if(hist){
    addHistorique()
  }
  oldSection = currentSection;
  search.value = "/"+window.location.href.split('#')[1];

}
// Hide section
function hide(section,transform) {
  section.style.opacity = 0;
  section.classList.remove("show")
  section.classList.add("hide")
  section.classList.remove('showFlex');
  section.style.transform = transform;
}
// Switch nav
function switchNav(oldNav,currentNav) {
  currentNav.style.paddingBottom = "1px";
  currentNav.classList.remove('not_current');
  if(oldNav != currentNav){
    oldNav.style.paddingBottom = "0";
    oldNav.classList.add('not_current');
  }
}
// Show section
function show(currentSection,transform) {
  currentSection.style.opacity = 0;
  currentSection.style.transform = transform;
  currentSection.classList.remove('hide');
  if(  currentSection.classList.contains('flex')){
    currentSection.classList.add('showFlex');
  }else if(currentSection.classList.contains('grid')){
    currentSection.classList.add('showGrid');
  }else{
    currentSection.classList.add('show');
  }
  window.setTimeout(function(){
    currentSection.style.opacity = 1;
  },10);
}

// Pour acceder aux sous page directement
if(window.location.href.split('#').length > 2){
  locations = window.location.href.split('#')[1] + "/" +  window.location.href.split('#')[2];
  homeDetail = window.location.href.split('#')[2]
}else if(window.location.href.split('#').length > 1){
  locations = window.location.href.split('#')[1] ;
}else{
  locations = ""
}

if(locations != ""){
  goToRoute(locations, true)
}else{
  goToRoute("home", true)
  // quitWindow()
  // setTimeout(() => {
  //   chargeApp('meteo')
  // }, 1800);
}


window.onpopstate = function(event) {
  // console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  locations = window.location.href.split('#')[1]+(window.location.href.split('#')[2]?'/'+window.location.href.split('#')[2]:'');
  // console.log(history.state)
  if (event.state !== null) {
    // Le changement provient de l'historique
    // console.log("Code à exécuter pour une navigation dans l'historique'", event)
    // console.log(event.state.foo,li_hist.length)
    goToRoute(locations,false)
    li_hist = document.querySelectorAll('.li_historique');
    li_hist[-(history.state.foo - historique.length-1)-2].style.color = primary;
    li_hist[-(foo - historique.length-1)-2].style.color = main_color;
    // console.table(li_hist[currentHistorique])
    if(history.state.foo == li_hist.length-1 ){
      btn_suivant.classList.add('not_current')
    }else{
      btn_suivant.classList.remove('not_current')
    }
    if(history.state.foo == 0 ){
      btn_precedent.classList.add('not_current')
    }else{
      btn_precedent.classList.remove('not_current')
    }
    foo = event.state.foo;

  } else {
    // console.log('bien par la barre de search')
    widowLoad = true;
    goToRoute(locations,true)

  }
};
// window.addEventListener('hashchange', (event) => {
//   console.log(window.onpopstate)
//   console.log(event.type)
//   locations = window.location.href.split('#')[1];
//   changeSection.apply(null,[null,document.getElementById(locations),false])
// }, false);
// Search barre
search.addEventListener("focus", function(event) {
  // console.log(search.value)
  search.value = "\/";
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

// Go To Route
function goToRoute(adresse, hist) {
  request = adresse.toLowerCase().split("/");
  request = request.filter(function(f) { return f !== '' })
  if(route[0].includes(request[0])){
    if(request.length == 1){
      changeSection.apply(null,[null,document.getElementById(request[0]),hist])
    }else if(request.length == 2){
      changeSection.apply(null,[null,document.getElementById(request[0])])
      switch (route[0].indexOf(request[0])) {
        case 1:
          if(route[1].includes(request[1])){
            changeDetails.apply(null,[null,request[1],hist])
          }
        break;
      
        default:
        break;
      }
    }
  }
}


function addHistorique(adresse) {
  li_hist = document.querySelectorAll('.li_historique');
  btn_suivant.classList.add('not_current')
  btn_precedent.classList.remove('not_current')
  li_hist.forEach(element => {
    element.style.color = main_color;
    if (element.value > foo) {
        // console.log(element.value)
        element.remove()
        historique.splice(foo+1,historique.length-1)

    }
  });
  historique.push([currentSection.id+(adresse?'/'+adresse:''),saveScroll])
  lst_historique.innerHTML = "<li class='li_historique' value='"+(historique.length-1)+"'>/" + currentSection.id + (adresse?'/'+adresse:'')+"</li>" + lst_historique.innerHTML;
  currentHistorique = 0;
  foo = (historique.length-1);
  var stateObj = { foo: (historique.length-1)};

  if(!widowLoad){
    history.pushState(stateObj,"", "index.html#"+currentSection.id+(adresse?'#'+adresse:''));
  }else{
    history.replaceState(stateObj,"", "index.html#"+currentSection.id+(adresse?'#'+adresse:''));
  }
  widowLoad = false;
}

// Historique
lst_historique.addEventListener("click", function(event) {

  // console.log(event.target)
  if(event.target.tagName == "UL"){return;}
  x = foo - event.target.value
  window.history.go(-x); 

});
// <- page précedente
btn_precedent.addEventListener("click", pagePrecedente);
// -> page suivante
btn_suivant.addEventListener("click", pageSuivante);
function pagePrecedente() {
  if (li_hist.length > 0 && foo != 0) {
  window.history.go(-1); 
  }
}
function pageSuivante(){
  window.history.go(1); 
}
// btn list historique
btn_historique.addEventListener("click", function(event) {
  console.log(event)
  if(lst_historique.classList.contains('hide')){
    show(lst_historique)
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
  if(document.getElementById('calculette') && calculetteCharger){
    if(!calculette.contains(event.target)){
      document.removeEventListener("keydown", clavierCalculette);
    }else{
      document.addEventListener("keydown", clavierCalculette);
    }
  }
  if(document.getElementById('alert').classList.contains("show")){
    hide(document.getElementById('alert'))
  }
});

btn_liens = document.querySelectorAll('.lien_contact');
btn_liens.forEach(element => {
  element.addEventListener("click", goToAdress);
});

function goToAdress(event) {
  if(event.clientX == 0){
    if(event.target.children[1].target == "_blank"){
      window.open(event.target.children[1].href);
    }else{
      window.location.href=event.target.children[1].href
    }
  }
}
// btn_tools
btn_tools = document.querySelectorAll('.btn_tool');
p_tools = document.querySelectorAll('.p_tools');
btn_tools.forEach(element => {
  element.addEventListener("click", changeTools);
});
// height = tool.offsetHeight;
// contact_home.style.height = height + "px";
old_elem = p1;

function changeTools(event) {
  // width = tool.offsetWidth + "px";
  current_tool = document.getElementById(event.target.value);

  btn_tools.forEach(element => {
    element.classList.add('not_current')
  });

  hide(old_elem)
  show(current_tool)

  // current_tool.parentNode.parentNode.style.width = width;
  
  window.setTimeout(function(){
    old_elem.style.opacity = 0;
    setTimeout(function(){ 
      current_tool.style.opacity = 1;

    }, 70);
    event.target.classList.remove("not_current")
  },20);

  old_elem = current_tool;

}

// app
button_app = document.querySelectorAll('.button_app');
button_app.forEach(element => {
  element.addEventListener("click", chargeApp);
});

function chargeBureauApp(app){
    requetteXhttp(app,"bureau")
    setTimeout(() => {
      var e = document.createElement('script');
      e.src = "js/"+app+'.js';
      document.body.appendChild(e);
    }, 250);
    console.log( ' on charge une app ' + app)
}

function chargeApp(event) {
  if(event.target){
    app = event.target.value
    if(event.target.type != "submit"){
      app = event.target.parentNode.value
    }
  }else{
    app = event
  }
  
  if(currentApp != ""){
    hide(document.getElementById(currentApp))
  }
  currentApp = app

  show(document.getElementById(app))
  window.setTimeout(function(){
    document.getElementById(app).style.opacity = 1;
    
  },50);
  
}

// details
btn_details = document.querySelectorAll('.button_detail');
btn_details.forEach(element => {
  element.addEventListener("click", changeDetails);
});
// change section details
function changeDetails(event, elem, hist) {
  if(event){
    adresse = event.target.value;
    hist = true;
  }else{
    adresse = elem;
  }

  if(current_projets_detail != ""){
    
    current_projets_detail = document.getElementById(current_projets_detail)
    
    hide(current_projets_detail)
  }

  show(projets_detail)
  hide(projets)
  show(nav_detail)
  nav_detail.style.opacity =1;
  // console.log(document.getElementById(adresse))

  if (!document.getElementById(adresse)) {
    requetteXhttp(adresse,projets.id)
    window.setTimeout(function(){
      document.getElementById(adresse).style.opacity = 1;
      show(document.getElementById(adresse))
    },150);
  }else{
    show(document.getElementById(adresse))
    window.setTimeout(function(){
      document.getElementById(adresse).style.opacity = 1;
    },50);
  }
  
  if(hist){
    addHistorique(adresse)
  }
  search.value = "/"+window.location.href.split('#')[1]+"/"+window.location.href.split('#')[2];

  window.setTimeout(function(){
    projets_detail.style.opacity = 1;
    current_projets_detail = adresse;
    // console.log(current_projets_detail)
    // console.log(route[1].indexOf(current_projets_detail) , route[1].length)
    // console.log(route[1].indexOf("devin") , route[1].length)
    if(route[1].indexOf(current_projets_detail) < route[1].length-1){
      btn_suivant_detail.value = route[1][route[1].indexOf(current_projets_detail)+1]
      // console.log(btn_precedent_detail.value)
    }else{
      btn_suivant_detail.value = route[1][0]
    }
    if(route[1].indexOf(current_projets_detail) > 0){
      btn_precedent_detail.value = route[1][route[1].indexOf(current_projets_detail)-1]
      // console.log(btn_precedent_detail.value)
    }else{
      btn_precedent_detail.value = route[1][route[1].length-1]
    }
  },50);

}

btn_precedent_detail.addEventListener("click", changeDetails);
btn_suivant_detail.addEventListener("click", changeDetails);
btn_quit_detail.addEventListener("click", quitDetails);
btn_quit.addEventListener("click", quitWindow);
clem_web.addEventListener("click", openWindow);

function quitDetails(){
  changeSection.apply(null,[null,projets,true])
}

//  Bureau / Web
function quitWindow(){
  if(window.location.href.split('#').length > 2){
    locations = window.location.href.split('#')[1] + "/" +  window.location.href.split('#')[2];
    hide(document.getElementById(window.location.href.split('#')[2]))
    hide(nav_detail)
  }else if(window.location.href.split('#').length > 1){
    locations = window.location.href.split('#')[1] ;
  }
  hide(nav_search)
  hide(nav_general)
  hide(currentSection)
  hide(footer)
  hide(paddingNavGeneral)
  show(bureau)
  show(bureau_detail)
if(!document.getElementById('calculette')){
  chargeBureauApp('calculette')
  chargeBureauApp('meteo')
}
  // bureau.style.opacity =1;
}

function openWindow() {
  show(nav_search, 'translateX(50px)')
  show(nav_general, 'translateX(50px)')
  show(currentSection)
  goToRoute(locations, false)
  show(footer)
  show(paddingNavGeneral)
  hide(bureau)
  hide(bureau_detail)
  setTimeout(function(){ 
    nav_search.style.transform = 'translateX(0px)';
    nav_general.style.transform = 'translateX(0px)';
  }, 50);
}

// requette Xhttp
function requetteXhttp(adresse,emplacement) {
  // Création de l'objet XMLHttpRequest
  let xhttp = new XMLHttpRequest();
  // console.log('chargment de ' + adresse + ' dans ' + emplacement)
  // Configuration de la requête
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Le contenu HTML a été chargé avec succès
      document.getElementById(emplacement+"_detail").innerHTML += this.responseText;
    }
  };
  xhttp.open("GET", "html/"+emplacement+"/"+adresse+".html", true);

  // Envoi de la requête
  xhttp.send();
}

envoyer_mail.addEventListener("click", function() {
  var xhr = new XMLHttpRequest();
  var url = "php/mail.php";
  emails = email.value;
  message = contact_fin.value;
  var params = "email=" + emails + "&message=" + message;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // alert(xhr.responseText);
      email.value = ""
      contact_fin.value = ""
      if(xhr.responseText == "Votre message c'est bien envoyé"){
        document.getElementById('alert').classList.add('success')
        document.getElementById('alert').classList.remove('danger')
      }else{
        document.getElementById('alert').classList.remove('success')
        document.getElementById('alert').classList.add('danger')
      }
      document.getElementById('alert').innerHTML = xhr.responseText
      show(document.getElementById('alert'))
    }
  };

  xhr.send(params);
});

// changeSection.apply(null,[null,contact,true])
// changeDetails(event, "saveworld") 

// const url = 'https://api.github.com/repos/clemmlec/dev_in/contents/README.md';

// fetch(url)
// .then(response => response.json())
// .then(data => {
//     const markdownContent = atob(data.content); // décode le contenu en base64
//     const htmlContent = marked.parse(markdownContent);
//     // Ajoute le contenu HTML à un élément sur la page
//     const contentElement = document.getElementById('markdown-content');
//     contentElement.innerHTML = htmlContent;
// })
// .catch(error => console.error(error));
