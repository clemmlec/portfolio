const swiper = new Swiper('.swiper', {
    spaceBetween: 10,
    // loop: true,
    clickable: true,
    mousewheel:{
      forceToAxis: true,
    },
    
    breakpoints: {
        "@0.00": {
          slidesPerView: 1,
        },
        "@0.75": {
          slidesPerView: 2,
        },
        "@1.00": {
          slidesPerView: 3,
        },
        "@1.50": {
          slidesPerView: 4,
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
  