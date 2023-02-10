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
  mobile = true
}else{ mobile = false}
// Scroll
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

  if(titre_projets.style.display != "none"){
    position_projets = titre_projets.offsetTop - windowY - 16.5 ;
    if (position_projets <= (mobile ? 30 : 10)) {
      sectionHeight = home.offsetHeight + 100;
      titre_projets.style.display = "none";
      nav_projets.style.opacity = 1;
      nav_projets.style.paddingBottom = "1px";
      nav_home.style.paddingBottom = "0";
      home.style.display = "none";
      window.scrollBy(0, - sectionHeight);
      // setTimeout(function(){ window.scroll( { top : 50 , behavior : "smooth"}) }, 2);
      if (mobile) {
        setTimeout(function(){ window.scroll( { top : 50 , behavior : "smooth"}) }, 2);
      }

    }
  }

  if(titre_formations.style.display != "none" ){
    position_formations = titre_formations.offsetTop - windowY - 16.5 ;
    if (position_formations <= (mobile ? 30 : 10)) {
      sectionHeight = projets.offsetHeight + 100;
      titre_formations.style.display = "none";
      nav_formations.style.opacity = 1;
      nav_formations.style.paddingBottom = "1px";
      nav_projets.style.paddingBottom = "0";
      projets.style.display = "none";
      window.scrollBy(0, - sectionHeight);
      setTimeout(function(){ hobbies_aparition = true }, 50);
      if (mobile) {
        setTimeout(function(){ window.scroll( { top : 50 , behavior : "smooth"}) }, 2);
      }
    }
  }
  
  if(titre_hobbies.style.display != "none"){
    position_hobbies = titre_hobbies.offsetTop - windowY - 16.5 ;
    if (position_hobbies <= (mobile ? 30 : 10)) {
      if(hobbies_aparition != true){ return;}
      sectionHeight = formation.offsetHeight + 100;
      titre_hobbies.style.display = "none";
      nav_hobbies.style.opacity = 1;
      nav_hobbies.style.paddingBottom = "1px";
      nav_formations.style.paddingBottom = "0";
      formation.style.display = "none";
      window.scrollBy(0, - sectionHeight);
      setTimeout(function(){ contact_aparition = true }, 50);
      if (mobile) {
        setTimeout(function(){ window.scroll( { top : 50 , behavior : "smooth"}) }, 2);
      }
      
    }
  }
  
  if(titre_contact.style.display != "none"){
    position_contact = titre_contact.offsetTop - windowY - 16.5 ;
    if (position_contact <= (mobile ? 30 : 10)) {
      if(contact_aparition != true){ return;}
      sectionHeight = hobbies.offsetHeight + 100;
      titre_contact.style.display = "none";
      nav_contact.style.opacity = 1;
      nav_contact.style.paddingBottom = "1px";
      nav_hobbies.style.paddingBottom = "0";
      hobbies.style.display = "none";
      window.scrollBy(0, - sectionHeight);
      if (mobile) {
        setTimeout(function(){ window.scroll( { top : 50 , behavior : "smooth"}) }, 2);
      }
    }
  }
}

// console.log(document.getElementById('nav-projets').offsetLeft)
// console.log('titre offet', document.getElementById('titre-projets').offsetLeft)

// console.log('titre offet', document.getElementById('titre-projets').style.left)

// passer en switch case btn on clickou juste foreack selectoption changesection
// opt_home.addEventListener("click", changeSection);
// opt_projets.addEventListener("click", changeSection);
// opt_formation.addEventListener("click", changeSection);
// opt_hobbies.addEventListener("click", changeSection);
// opt_contact.addEventListener("click", changeSection);

// function changeSection(event) {
//   console.log(event.target.value);
//   idSection = document.getElementById(event.target.value);
  

//   var ctr = 1;
//   idSection.className = idSection.className !== 'show' ? 'show' : 'hide';
//   if (idSection.className === 'show') {
//     idSection.style.display = 'block';
//     window.setTimeout(function(){
//       idSection.style.opacity = 1;
//       idSection.style.transform = 'scale(1)';
//     },0);
//   }
//   if (idSection.className === 'hide') {
//     idSection.style.opacity = 0;
//     idSection.style.transform = 'scale(0)';
//     window.setTimeout(function(){
//       idSection.style.display = 'none';
//     },700); // timed to match animation-duration
//   }
  
  
// }
