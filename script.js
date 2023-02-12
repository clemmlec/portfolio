//  SWIPER
const swiper = new Swiper('.swiper', {
  spaceBetween: 10,
  // loop: true,
  grabCursor: true,
  clickable: true,
  mousewheel:{
    forceToAxis: true,
  },
  
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
    if (position_projets <= (mobile ? 50 : 50)) {
      homeDisplay = false;
      scrollToSection(titre_projets,home,projets,nav_home,nav_projets);
    }
  }

  if(projetsDisplay){
    position_formations = titre_formations.offsetParent.offsetTop - windowY;
    if (position_formations <= (mobile ? 50 : 50)) {
      scrollToSection(titre_formations,projets,formation,nav_projets,nav_formations);
      setTimeout(function(){ hobbies_aparition = true }, 150);
      projetsDisplay = false;
    }
  }
  
  if(hobbies_aparition && formationDisplay){
    position_hobbies = titre_hobbies.offsetParent.offsetTop - windowY;
    if (position_hobbies <= (mobile ? 50 : 50)) {
      scrollToSection(titre_hobbies,formation,hobbies,nav_formations,nav_hobbies);
      setTimeout(function(){ contact_aparition = true }, 100);      
      formationDisplay = false;
    }
  }
  
  if(contact_aparition  && hobbiesDisplay){
    position_contact = titre_contact.offsetParent.offsetTop - windowY;
    if (position_contact <= (mobile ? 50 : 50)) {
      hobbiesDisplay = false;
      scrollToSection(titre_contact,hobbies,contact,nav_hobbies,nav_contact);
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
  idSection = document.getElementById(document.getElementById(event.target.id).id.split("-")[1]);

  if(hobbiesDisplay){
    homeDisplay = false;
    projetsDisplay = false;
    hobbiesDisplay = false;
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
  currentBackground =  "bg_purple";
  oldNav = nav_home;
  sections = document.querySelectorAll('section');
  sections.forEach(element => {
    if(element.classList.contains('show')){
      currentBackground =  element.classList.item(0);
      oldNav = document.getElementById("nav-"+element.id);
    }
    element.classList.add('hide');
    element.classList.remove('show');
    element.style.display = 'none';
    if(element.style.zIndex != 2){
      element.style.zIndex = 2;
    }
  });
  currentNav = document.getElementById("nav-"+idSection.id);

  currentNav.style.paddingBottom = "1px";
  currentNav.classList.remove('not_current');
  if(oldNav != currentNav){
    oldNav.style.paddingBottom = "0";
    oldNav.classList.add('not_current');
  }

  idSection.style.opacity = 0;
  idSection.style.transform = 'translateY(-5000px)';
  idSection.classList.add('show');
  idSection.classList.remove('hide');



  if(  idSection.id == 'home'){
    idSection.style.display = 'flex';
  }else{
    idSection.style.display = 'block';
  }

  window.setTimeout(function(){
    idSection.style.opacity = 1;
    idSection.style.transform = 'translateY(0px)';
    if( !homeDisplay && idSection.classList.item(0) != currentBackground){
      main.classList.toggle("bg_gray");
      main.classList.toggle("bg_purple");
      paddingNavGeneral.classList.toggle("bg_gray");
      paddingNavGeneral.classList.toggle("bg_purple");
      if (!mobile) {
        site.classList.toggle("bg_gray");
        site.classList.toggle("bg_purple");
      }
  
    }
    window.scrollBy( { top : -window.scrollY , behavior : "smooth"})
    setTimeout(function(){ 
      window.scroll( { top : 100 , behavior : "smooth"})
    }, 550);
    
  },0);
  

}
