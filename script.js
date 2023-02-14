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
adaptNavGeneral();

function adaptNavGeneral(){
  document.getElementById('titre-projets').style.left = ((document.getElementById('nav-projets').offsetLeft - 20) + "px");
  document.getElementById('titre-formation').style.left = ((document.getElementById('nav-formation').offsetLeft - 20) + "px");
  document.getElementById('titre-hobbies').style.left = ((document.getElementById('nav-hobbies').offsetLeft - 20) + "px");
  document.getElementById('titre-contact').style.left = ((document.getElementById('nav-contact').offsetLeft - 20) + "px");
};

window.onresize = function(){
  adaptNavGeneral();
}


// Scroll

homeDisplay = true;
projetsDisplay = true;
formationDisplay = true;
hobbiesDisplay = true;



titre_projets = document.getElementById('titre-projets');
titre_formations = document.getElementById('titre-formation');
titre_hobbies = document.getElementById('titre-hobbies');
titre_contact = document.getElementById('titre-contact');

nav_home = document.getElementById('nav-home');
nav_projets = document.getElementById('nav-projets');
nav_formations = document.getElementById('nav-formation');
nav_hobbies = document.getElementById('nav-hobbies');
nav_contact = document.getElementById('nav-contact');
contact_aparition = false;
hobbies_aparition = false;
currentBackground =  "bg_purple";
oldNav = nav_home;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  mobile = true;
  site.classList.toggle("bg_purple");
  site.classList.toggle("bg_purpleDark");
}else{ mobile = false}

function scrollToSection(titreSectionCourante,oldSection,currentSection,oldNav,currentNav){


  sectionHeight = oldSection.offsetHeight + 150;
  window.scrollTo(0, - sectionHeight);
  titreSectionCourante.style.display = "none";

  currentSection.style.zIndex = 1;
  currentNav.style.opacity = 1;
  currentNav.style.paddingBottom = "1px";
  main.classList.toggle("bg_gray");
  main.classList.toggle("bg_purple");
  paddingNavGeneral.animationPlayState = 'paused'
  paddingNavGeneral.style.transition = "none";
  paddingNavGeneral.classList.toggle("bg_gray");
  paddingNavGeneral.classList.toggle("bg_purple");

  oldNav.style.paddingBottom = "0";
  oldNav.classList.add('not_current');

  oldSection.style.display = "none";

  setTimeout(function(){ 
    paddingNavGeneral.style.transition = "";
  }, 50);
  if (mobile) {
    setTimeout(function(){ 
      window.scroll( { top : 50 , behavior : "smooth"})
    }, 10);
  }
}

  // var checkScrollSpeed = (function(settings){
    //   settings = settings || {};

    //   var lastPos, newPos, timer, delta, 
    //       delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    //   function clear() {
    //     lastPos = null;
    //     delta = 0;
    //   }

    //   clear();
      
    //   return function(){
    //     newPos = window.scrollY;
    //     if ( lastPos != null ){ // && newPos < maxScroll 
    //       delta = newPos -  lastPos;
    //     }
    //     lastPos = newPos;
    //     clearTimeout(timer);
    //     timer = setTimeout(clear, delay);
    //     return delta;
    //   };
  // })();
window.onscroll = function(e) {
  windowY = window.scrollY;
  
  if(homeDisplay){
    position_projets = titre_projets.offsetParent.offsetTop - windowY;
    if (position_projets <= (mobile ? 80 : 80)) {
      homeDisplay = false;
      scrollToSection(titre_projets,home,projets,nav_home,nav_projets);
      currentBackground =  "bg_gray";
      oldNav = nav_home;
    }
  }

  if(projetsDisplay){
    position_formations = titre_formations.offsetParent.offsetTop - windowY;
    if (position_formations <= (mobile ? 80 : 80)) {
      scrollToSection(titre_formations,projets,formation,nav_projets,nav_formations);
      setTimeout(function(){ hobbies_aparition = true }, 150);
      projetsDisplay = false;
      currentBackground =  "bg_purple";
      oldNav = nav_projets;
    }
  }
  
  if(hobbies_aparition && formationDisplay){
    position_hobbies = titre_hobbies.offsetParent.offsetTop - windowY;
    if (position_hobbies <= (mobile ? 80 : 80)) {
      scrollToSection(titre_hobbies,formation,hobbies,nav_formations,nav_hobbies);
      setTimeout(function(){ contact_aparition = true }, 100);      
      formationDisplay = false;
      currentBackground =  "bg_gray";
      oldNav = nav_formations;
    }
  }
  
  if(contact_aparition  && hobbiesDisplay){
    position_contact = titre_contact.offsetParent.offsetTop - windowY;
    if (position_contact <= (mobile ? 80 : 80)) {
      hobbiesDisplay = false;
      scrollToSection(titre_contact,hobbies,contact,nav_hobbies,nav_contact);
      currentBackground =  "bg_purple";
      oldNav = nav_hobbies;
    }
  }
}

// function base(){
//   home.style.display = "flex";
//   projets.style.display = "block";
//   formation.style.display = "block";
//   hobbies.style.display = "block";
//   titre_projets.style.display = "inline";
//   titre_formations.style.display = "inline";
//   titre_hobbies.style.display = "inline";
//   titre_contact.style.display = "inline";
//   contact_aparition = false;
//   hobbies_aparition = false;
//   nav_contact.style.opacity = 0;
//   nav_formations.style.opacity = 0;
//   nav_hobbies.style.opacity = 0;
//   nav_projets.style.opacity = 0;
//   window.scrollTo( { top : 50 , behavior : "smooth"}) 

//   setTimeout(function(){
//     homeDisplay = true;
//     projetsDisplay = true;
//     formationDisplay = true;
//     hobbiesDisplay = true;
//     }, 300);
// }

nav_home.addEventListener("click", changeSection);
nav_projets.addEventListener("click", changeSection);
nav_formations.addEventListener("click", changeSection);
nav_hobbies.addEventListener("click", changeSection);
nav_contact.addEventListener("click", changeSection);

function changeSection(event) {
  currentSection = document.getElementById(document.getElementById(event.target.id).id.split("-")[1]);
  currentNav = event.target;

  if(hobbiesDisplay){
    homeDisplay = false;
    projetsDisplay = false;
    formationDisplay = false;
    nav_contact.style.opacity = 1;
    nav_formations.style.opacity = 1;
    nav_hobbies.style.opacity = 1;
    nav_projets.style.opacity = 1;
    nav_contact.classList.add('not_current');
    nav_formations.classList.add('not_current');
    nav_hobbies.classList.add('not_current');
    nav_home.classList.add('not_current');
    nav_projets.classList.add('not_current');
    titre_contact.style.display = "none";
    titre_formations.style.display = "none";
    titre_hobbies.style.display = "none";
    titre_projets.style.display = "none";
    
  }

  sections = document.querySelectorAll('section');
  sections.forEach(element => {
    if(element.classList.contains('show')){
      currentBackground =  element.classList.item(0);
      oldNav = document.getElementById("nav-"+element.id);
      element.style.opacity = 0;
      element.classList.add('hide');
      element.classList.remove('show');
      element.style.display = 'none';
      element.style.transform = 'translateX(+200px)';
    }  
    if(hobbiesDisplay){
      element.style.opacity = 0;
      element.classList.add('hide');
      element.classList.remove('show');
      element.style.display = 'none';
      element.style.transform = 'translateX(+200px)';
      element.style.zIndex = 2;

    }
  });
  hobbiesDisplay = false;

  currentNav.style.paddingBottom = "1px";
  currentNav.classList.remove('not_current');
  if(oldNav != currentNav){
    oldNav.style.paddingBottom = "0";
    oldNav.classList.add('not_current');
  }

  currentSection.style.opacity = 0;
  currentSection.style.transform = 'translateX(+100px)';
  currentSection.classList.remove('hide');
  currentSection.classList.add('show');

  if(  currentSection.id == 'home'){
    currentSection.style.display = 'flex';
  }else{
    currentSection.style.display = 'block';
  }

  window.setTimeout(function(){
    
    currentSection.style.opacity = 1;
    currentSection.style.transform = 'translateX(-20px)';
    
    if( !homeDisplay && currentSection.classList.item(0) != currentBackground){
      main.classList.toggle("bg_gray");
      main.classList.toggle("bg_purple");
      paddingNavGeneral.classList.toggle("bg_gray");
      paddingNavGeneral.classList.toggle("bg_purple");
      if (!mobile) {
        site.classList.toggle("bg_gray");
        site.classList.toggle("bg_purple");
      }
    }
    window.scrollBy( { top : -window.scrollY })
    setTimeout(function(){ 
      currentSection.style.transform = 'translateX(0px)';

    }, 550);
    
  },0);
  

}


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