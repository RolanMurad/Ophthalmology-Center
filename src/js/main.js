$(function () {
  // !Appendto
  if ($(window).width() < 1000) {
    $('.reviews-box__header-score').appendTo($('.reviews-box__header-decor'))
  };

  if ($(window).width() < 450) {
    $('.reviews-box__header-btn').appendTo($('.reviews-box'))
  };

  if ($(window).width() < 450) {
    $('.blog-box__btn').appendTo($('.blog-box'))
  };

  if ($(window).width() < 800) {
    $('.consultation__button').appendTo($('.consultation__form'))
  };

  if ($(window).width() < 665) {
    $('.header__menu-contacts').appendTo($('.navbar'))
  };

  // !Burger
  //!Vars
  const burger = document?.querySelector('[data-burger]');
  const navbar = document?.querySelector('[data-navbar]');
  const body = document.body;
  const navItems = document?.querySelectorAll('.nav__list-item');
  const header = document?.querySelector('.header');
  const headerHeight = header.offsetHeight;
  document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);

  //!Click on Burger 
  burger?.addEventListener('click', function () {
    body.classList.toggle('stop-scroll');
    burger?.classList.toggle('burger--active');
    navbar?.classList.toggle('navbar--visible');
  });

  //!Closed on menu Item
  navItems.forEach(function (e) {
    e.addEventListener('click', function () {
      body.classList.remove('stop-scroll');
      burger?.classList.remove('burger--active');
      navbar?.classList.remove('navbar--visible');
    });
  });

  //!Select
  //! NodeList.prototype.forEach() polyfill ( IE 11)
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  };

  //!Select 
  document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {

    //!Vars
    const dropDownButton = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItem = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownArrow = dropDownWrapper.querySelector('.dropdown__arrow')


    //!Looking for the button
    dropDownButton.addEventListener('click', function () {
      //!Swicth in;(none/block)
      dropDownList.classList.toggle('dropdown__list--visible');
      //!Turning the arrow 180 degrees
      dropDownArrow.classList.toggle('dropdown__arrow--open');
    });

    //!List Item
    dropDownListItem.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation()
        //!Closing the drop-down menu by clicking on a list item
        dropDownList.classList.remove('dropdown__list--visible');
        //!Turning the arrow 180 degrees
        dropDownArrow.classList.toggle('dropdown__arrow--open');
      });
    });

    //!Click outside dropdown. Close dropdown
    document.addEventListener('click', function (e) {
      if (e.target !== dropDownButton) {
        dropDownList.classList.remove('dropdown__list--visible');
        dropDownArrow.classList.remove('dropdown__arrow--open');
      };
    });

    //!Closing Dropdown by buttons
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownList.classList.remove('dropdown__list--visible')
      };
    });
  });

  //!About us Slider
  $('.about__slider').slick({
    //!Main settings
    arrows: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: "<img src='images/slider-left.svg' class='arrow-left' alt='arrow'>",
    nextArrow: "<img src='images/slider-rigth.svg' class='arrow-right' alt='arrow'>",
  });

  $(".about__slider").on('afterChange', function (event, slick, currentSlide) {
    $("#cp").text(currentSlide + 1);
  });

  //!Discounts Slider
  $('.discounts__slider').slick({
    //!Main settings
    arrows: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: "<img src='images/discounts-arrow-left.svg' class='discounts__slider-left' alt='arrow'>",
    nextArrow: "<img src='images/discounts-arrow-right.svg' class='discounts__slider-right' alt='arrow'>",
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      },
    ]
  });

  //!Reviews slider
  $('.reviews-box__slider').slick({
    //!Main settings
    arrows: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: "<img src='images/discounts-arrow-left.svg' class='discounts__slider-left' alt='arrow'>",
    nextArrow: "<img src='images/discounts-arrow-right.svg' class='discounts__slider-right' alt='arrow'>",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        }
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      },
    ]
  });

  //!Accordion
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach(function (item) {
    item.addEventListener('click', function () {
      //!Vars for screen reader
      const control = this.querySelector('[data-control]');
      const content = this.querySelector('[data-content]');
      //!Open/Close
      this.classList.toggle('open');

      //!For screen reader
      if (this.classList.contains('open')) {
        control.setAttribute('arria-expanded', true);
        content.setAttribute('arria-hidden', false);
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        control.setAttribute('arria-expanded', false);
        content.setAttribute('arria-hidden', true);
        content.style.maxHeight = null;
      };
    });
  });

  //!Blog-box slider
  $('.blog-box-slider').slick({
    //!Main settings
    arrows: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: "<img src='images/discounts-arrow-left.svg' class='discounts__slider-left' alt='arrow'>",
    nextArrow: "<img src='images/discounts-arrow-right.svg' class='discounts__slider-right' alt='arrow'>",
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        }
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      },
    ]
  });

  // //!Consultation-btn
  // //!Vars
  const consultAcc = document?.querySelectorAll('.consultation__accordion');
  const consultContent = document?.querySelectorAll('.consultation__accordion-content');

  consultAcc?.forEach(function (item) {
    item.addEventListener('click', function () {
      this.classList.toggle('open');
    });
  })

  consultContent?.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
    })
  });

  // //!ScrollToTop
  scrollToTopBtn = document?.querySelector('.scrolltotop');

  body.addEventListener('scroll', function () {
    if (body.scrollTop > 5500) {
      scrollToTopBtn?.classList.add("active");
    } else if (body.scrollTop < 3000) {
      scrollToTopBtn?.classList.remove("active");
    };
  });

  scrollToTopBtn?.addEventListener('click', function () {
    body.scrollTo(0, 0);
  });

  // //!Modal window
  //!Scroll off/on
  const scrollController = {
    scrollPosition: 0,
    disabledScroll() {
      //!For Windows scroll ban
      scrollController.scrollPosition = window.scrollY;
      document.body.style.cssText = `
   overflow : hidden;
   //!Scroll ban for Safari
   position: fixed;
   top : -${scrollController.scrollPosition}px;
   left: 0;
   height: 100vh;
   width: 100vw;
   padding-right: ${window.innerWidth - document.body.offsetWidth}px;
   `
    },
    enabledScroll() {
      document.body.style.cssText = '';
      window.scroll({ top: scrollController.scrollPosition });
    },
  };

  document.querySelectorAll('.modal__wrapper').forEach(function (modalWrapper) {
    //!Vars
    const button = modalWrapper.querySelector('[data-modal-button]');
    const modal = modalWrapper.querySelector('[data-modal]');
    const close = modalWrapper.querySelector('[data-modal-close]');
    const modalWindow = modalWrapper.querySelector('.modal-window');
    const consultBtn = modalWrapper.querySelector('.consultation__button');

    button.addEventListener('click', function () {
      modal.classList.remove('hidden')
      scrollController.disabledScroll();
    });

    close.addEventListener('click', function () {
      modal.classList.add('hidden');
      scrollController.enabledScroll();
    });

    consultBtn.addEventListener('click', function () {
      modal.classList.add('hidden');
      scrollController.enabledScroll();
    });

    modal.addEventListener('click', function () {
      this.classList.add('hidden')
      scrollController.enabledScroll();
    });

    modalWindow.addEventListener('click', function (e) {
      e.stopPropagation()
    })
  });
});
