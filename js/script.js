var THEMEMASCOT = {};
(function($) {

	"use strict";


  /* ---------------------------------------------------------------------- */
  /* --------------------------- Start Demo Switcher  --------------------- */
  /* ---------------------------------------------------------------------- */
  var showSwitcher = true;
  var $body = $('body');
  var $style_switcher = $('#style-switcher');
  if( !$style_switcher.length && showSwitcher ) {
      $.ajax({
          url: "color-switcher/style-switcher.html",
          success: function (data) { $body.append(data); },
          dataType: 'html'
      });
  }
  /* ---------------------------------------------------------------------- */
  /* ----------------------------- En Demo Switcher  ---------------------- */
  /* ---------------------------------------------------------------------- */


  THEMEMASCOT.isRTL = {
    check: function() {
      if( $( "html" ).attr("dir") === "rtl" ) {
        return true;
      } else {
        return false;
      }
    }
  };

  THEMEMASCOT.isLTR = {
    check: function() {
      if( $( "html" ).attr("dir") !== "rtl" ) {
        return true;
      } else {
        return false;
      }
    }
  };

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	$(document).ready(function () {
    $(".preloader-loaded").addClass("loaded");
    if ($(".preloader-loaded").hasClass("loaded")) {
      $("#preloader").delay(750).queue(function () {
        $(this).remove();
      });
    }
  });

	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.header-style-one');
			var scrollLink = $('.scroll-to-top');
			var sticky_header = $('.main-header .sticky-header');
			if (windowpos > 100) {
				sticky_header.addClass("fixed-header animated slideInDown");
				scrollLink.fadeIn(300);
			}else {
				sticky_header.removeClass("fixed-header animated slideInDown");
				scrollLink.fadeOut(300);
			}
			if (windowpos > 1) {
				siteHeader.addClass("fixed-header");
			}else {
				siteHeader.removeClass("fixed-header");
			}
		}
	}
	headerStyle();


	// Backtotop Js
	function back_to_top() {
	var btn = $('#back_to_top');
	var btn_wrapper = $('.back-to-top-wrapper');
	var windowOn = $(window); // Define windowOn properly

	windowOn.on('scroll', function () {
		if (windowOn.scrollTop() > 300) {
			btn_wrapper.addClass('back-to-top-btn-show');
		} else {
			btn_wrapper.removeClass('back-to-top-btn-show');
		}
	});

	btn.on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 300); // Removed quotes from 300, since it's a number
	});
	}

	back_to_top();

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){

		var mobileMenuContent = $('.main-header .main-menu .navigation').html();

		$('.mobile-menu .navigation').append(mobileMenuContent);
		$('.sticky-header .navigation').append(mobileMenuContent);
		$('.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});

		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
			$(this).toggleClass('active');
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});

	}

 /* ================================
     Des Portfolio Anim Js Start
  ================================ */
  
  if (document.querySelector(".des-portfolio-wrap")) {
      const pr = ScrollTrigger.matchMedia();

      pr.add("(min-width: 1199px)", () => {

          const sections = document.querySelectorAll(".des-portfolio-panel");
          const wrap = document.querySelector(".des-portfolio-wrap");

          if (!sections.length || !wrap) return;

          // Initial state
          gsap.set(sections, { scale: 1 });

          // Animate each section except the last one
          sections.forEach((section, index) => {
              const isLast = index === sections.length - 1;

              gsap.to(section, {
                  scale: isLast ? 1 : .6, // 👈 last one stays full-size
                  ease: "none",
                  scrollTrigger: {
                      trigger: section,
                      start: "top top",
                      end: "bottom 80%",
                      scrub: true,
                      pin: true,
                      pinSpacing: false,
                      endTrigger: wrap,
                      markers: false,
                  },
              });
          });

          // Cleanup on condition change
          return () => {
              ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          };
      });
  }
    
    if (document.querySelector(".des-portfolio-wrap2")) {
        const pr = ScrollTrigger.matchMedia();

        pr.add("(min-width: 1199px)", () => {

            const sections = document.querySelectorAll(".des-portfolio-panel2");
            const wrap = document.querySelector(".des-portfolio-wrap2");

            if (!sections.length || !wrap) return;

            // Initial state
            gsap.set(sections, { scale: 1 });

            // Animate each section except the last one
            sections.forEach((section, index) => {
                const isLast = index === sections.length - 1;

                gsap.to(section, {
                    scale: isLast ? 1 : .8, // 👈 last one stays full-size
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom 40%",
                        scrub: true,
                        pin: true,
                        pinSpacing: false,
                        endTrigger: wrap,
                        markers: false,
                    },
                });
            });

            // Cleanup on condition change
            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        });
    }

	// Nice seclect
	
	if ($("select").length) {
		$("select").niceSelect();
	}

	//Header Search
	if($('.search-btn').length) {
		$('.search-btn').on('click', function() {
			$('.main-header').addClass('moblie-search-active');
		});
		$('.close-search, .search-back-drop').on('click', function() {
			$('.main-header').removeClass('moblie-search-active');
		});
	}

	//service-carousel One
	if ($('.banner-slider-one').length) {
		var swiper = new Swiper(".banner-slider-one", {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 600,
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}



	// 21. Image Reveal Animation  used
  let imgs_reveal = document.querySelectorAll(".img-reveal");

  imgs_reveal.forEach((container) => {
    let image = container.querySelector("img");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        toggleActions: "restart none none reset"
      }
    });

    tl.set(container, { autoAlpha: 1 });
    tl.from(container, 1.5, {
      xPercent: -100,
      ease: Power2.out
    });
    tl.from(image, 1.5, {
      xPercent: 100,
      scale: 1.3,
      delay: -1.5,
      ease: Power2.out
    });
  });

  if ($('.service-two-slider').length) {
		var swiper = new Swiper(".service-two-slider", {
			speed:1500,
			loop: true,
			slidesPerView: 3,
			spaceBetween: 24,
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 1,
				},
				992: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 2,
				},
				1400: {
					slidesPerView: 3,
				},
			},
			// Navigation arrows
			navigation: {
				nextEl: '.slider-next',
				prevEl: '.slider-prev',
			},
		});
	}

	//service-carousel One
	if ($('.clients-swiper').length) {
		var swiper = new Swiper(".clients-swiper", {
			slidesPerView: 6,
			spaceBetween: 0,
			speed: 500,
			loop: true,
			autoplay: true,
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1400: {
					slidesPerView: 6,
				}
			},
		});
	}

	//service-carousel One
	if ($('.testimonial-swiper').length) {
		var swiper = new Swiper(".testimonial-swiper", {
			slidesPerView: 3,
			spaceBetween: 24,
			speed: 500,
			loop: true,
			autoplay: true,
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 1,
				},
				991: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 2,
				},
				1400: {
					slidesPerView: 3,
				}
			},
		});
	}
		
	
	
	// Section Title Animation
    if ($('.char-animation').length > 0) {
      let char_come = gsap.utils.toArray(".char-animation");
      char_come.forEach(splitTextLine => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: splitTextLine,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: false,
            markers: false,
            toggleActions: 'play none none none'

          }
        });

        const itemSplitted = new SplitText(splitTextLine, { type: "chars, words" });
        gsap.set(splitTextLine, { perspective: 300 });
        itemSplitted.split({ type: "chars, words" })
        tl.from(itemSplitted.chars,
          {
            duration: 1,
            delay: 0.5,
            x: 100,
            autoAlpha: 0,
            stagger: 0.05
          });
      });
    }


	//>> Footer Instagram Slider Start <<//
	if($('.footer-instagram-slider').length > 0) {
		const footerInstagramSlider = new Swiper(".footer-instagram-slider", {
			spaceBetween: 10,
			speed: 1300,
			loop: true,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
			},
			
			breakpoints: {
				1199: {
					slidesPerView: 5,
				},
				991: {
					slidesPerView: 4,
				},
				767: {
					slidesPerView: 3,
				},
				575: {
					slidesPerView: 2,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	//>> Hotel Activity Start <<//
    const awardActivityItems = document.querySelectorAll(".award-activity-items");

	function followImageCursor(event, awardActivityItems) {
		const contentBox = awardActivityItems.getBoundingClientRect();
		const dx = event.clientX - contentBox.left;
		const dy = event.clientY - contentBox.top;

		const targetImage = awardActivityItems.querySelector('.hover-image'); // Use a class instead of children[2]

		if (targetImage) {
			targetImage.style.transform = `translate(${dx}px, ${dy}px) rotate(15deg)`;
		}
	}

	// Optional: Throttle function to improve performance
	function throttle(fn, limit) {
		let inThrottle;
		return function (...args) {
			if (!inThrottle) {
				fn.apply(this, args);
				inThrottle = true;
				setTimeout(() => (inThrottle = false), limit);
			}
		};
	}

	awardActivityItems.forEach((item) => {
			item.addEventListener("mousemove", throttle((event) => {
				followImageCursor(event, item);
			}, 16)); // ~60fps (1000ms/60 = ~16ms)
	});

	if ($('.properties-block').length) {
		$(document).ready(function() {
			const $stepBlocks = $('.properties-block');
			let $lastActiveBlock = $stepBlocks.eq(1); // Start with 2nd div active

			// Initialize - set middle block active
			$stepBlocks.removeClass('active');
			$lastActiveBlock.addClass('active');

			// Hover handling using .on()
			$stepBlocks.on('mouseenter', function() {
				$stepBlocks.removeClass('active');
				$(this).addClass('active');
				$lastActiveBlock = $(this);
			});

			$stepBlocks.on('mouseleave', function() {
				$stepBlocks.removeClass('active');
				$lastActiveBlock.addClass('active');
			});
		});
	}

	if ($('.properties-block-two').length) {
		$(document).ready(function() {
			const $stepBlocks = $('.properties-block-two');
			let $lastActiveBlock = $stepBlocks.eq(0); // Start with 2nd div active

			// Initialize - set middle block active
			$stepBlocks.removeClass('active');
			$lastActiveBlock.addClass('active');

			// Hover handling using .on()
			$stepBlocks.on('mouseenter', function() {
				$stepBlocks.removeClass('active');
				$(this).addClass('active');
				$lastActiveBlock = $(this);
			});

			$stepBlocks.on('mouseleave', function() {
				$stepBlocks.removeClass('active');
				$lastActiveBlock.addClass('active');
			});
		});
	}

	if ($('.banner-icon-box-h4').length) {
		$(document).ready(function() {
			const $stepBlocks = $('.banner-icon-box-h4');
			let $lastActiveBlock = $stepBlocks.eq(0); // Start with 2nd div active

			// Initialize - set middle block active
			$stepBlocks.removeClass('active');
			$lastActiveBlock.addClass('active');

			// Hover handling using .on()
			$stepBlocks.on('mouseenter', function() {
				$stepBlocks.removeClass('active');
				$(this).addClass('active');
				$lastActiveBlock = $(this);
			});

			$stepBlocks.on('mouseleave', function() {
				$stepBlocks.removeClass('active');
				$lastActiveBlock.addClass('active');
			});
		});
	}

  function show_secondary_price(pricing_tables){
    pricing_tables.addClass('show-secondary-price');
    var pricing_btn = pricing_tables.find('.btn');
    var secondary_btn_url = pricing_btn.data("secondary-link");
    pricing_btn.attr("href", secondary_btn_url);
  }
  function hide_secondary_price(pricing_tables){
    pricing_tables.removeClass('show-secondary-price');
    var pricing_btn = pricing_tables.find('.btn');
    var normal_btn_url = pricing_btn.data("normal-link");
    pricing_btn.attr("href", normal_btn_url);
  }

  //smart btn
  var TM_Pricing_Switcher_Smart = function ($scope) {
    var pricing_smart_switcher = $('.tm-pricing-smart-switcher, .tm-pricing-plan-switcher');
    if( pricing_smart_switcher.length > 0 ) {
      pricing_smart_switcher.find("[data-pricing-trigger]").on("click", function (e) {
        var $self = $(e.target);
        $self.toggleClass("secondary-active");
        var pricing_tables = $self.parents("section").find(".tm-pricing-table");

        if( $self.hasClass( 'secondary-active' ) ) {
          show_secondary_price(pricing_tables);
        } else {
          hide_secondary_price(pricing_tables);
        }
      });
    }
  };

  //round, flat btn
  var TM_Pricing_Switcher_Btn = function ($scope) {
    var pricing_btn_switcher = $('.tm-pricing-smart-switcher-button');
    if( pricing_btn_switcher.length > 0 ) {
      pricing_btn_switcher.find("[data-pricing-trigger]").on("click", function (e) {
        var target_id = $(this).data('show');
        var $self = $(e.target);
        pricing_btn_switcher.find("[data-pricing-trigger]").removeClass("active");
        $(this).addClass("active");
        var pricing_tables = $self.parents("section").find(".tm-pricing-table");

        if( target_id == "year" ) {
          show_secondary_price(pricing_tables);
        } else {
          hide_secondary_price(pricing_tables);
        }
      });
    }
  };
	

	//Service Block Hover
	if ($('.srvice-block-eleeven222').length) {
		var $service_block = $('.service-block-eleven .inner-box');
		$($service_block).on('mouseenter', function (e) {
			$(this).find('.info-box .text').stop().slideDown(400);
			return false;
		});
		$($service_block).on('mouseleave', function (e) {
			$(this).find('.info-box .text').stop().slideUp(400);
			return false;
		});
  	}

	// Team Award Content Active
	if($('.team-award-block-two .inner-box').length) {
		$('.team-award-block-two .inner-box').on('mouseenter', function() {
		$(this).addClass('active');
		$('.inner-box').removeClass('active');
		});
		$('.team-award-block-two .inner-box').on('mouseleave', function() {
		$(this).addClass('active');
		});
	}

	// Team Award Content Active
	if($('.work-block .inner-box').length) {
		$('.work-block .inner-box').on('mouseenter', function() {
		$(this).addClass('active');
		$('.inner-box').removeClass('active');
		});
		$('.work-block .inner-box').on('mouseleave', function() {
		$(this).addClass('active');
		});
	}

  if($('.service-block .inner-block').length) {
  const $boxes = $('.service-block .inner-block');

  if ($boxes.length) {
    // Activate the first box on load
    // const $firstBox = $boxes.first();
    // $firstBox.addClass('active');
    // $firstBox.find('.content-box').addClass('active').slideDown();

    // Click logic
    $boxes.on('click', function () {
      $boxes.removeClass('active');
      $('.service-block .content-box').slideUp().removeClass('active');

      $(this).addClass('active');
      $(this).find('.content-box').slideDown().addClass('active');
    });
  }
}


 // Project Content Active
 if($('.service-block-seven .inner-box').length) {
    $('.service-block-seven .inner-box').on('click', function() {
       $('.inner-box').removeClass('active');
       $(this).addClass('active');
    });
  }

  if ($('.services-section-eight .outer-box').length) {
    const serviceImage = document.getElementById('service-image');
    const serviceItems = document.querySelectorAll('.services-list .service-block-eight');
    // Set the default active item
    const defaultItem = document.querySelector('.services-list .service-block-eight.active');
    if (defaultItem) {
        const defaultImage = defaultItem.getAttribute('data-image');
        if (defaultImage) {
            serviceImage.src = defaultImage;
        }
    }
    // Handle hover effect and active state change
    serviceItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const newImage = item.getAttribute('data-image');
            if (newImage) {
                serviceImage.src = newImage;
            }
            // Remove active class from all items and add to the hovered one
            serviceItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

  // Project Content Active
	if ($('.service-block-eleven').length) {
		var $service_block = $('.service-block-eleven .inner-box');
		$($service_block).on('mouseenter', function (e) {
			$(this).parent().parent().find('.inner-box').removeClass('active');
			$(this).addClass('active');
			$(this).parent().parent().find('.info-box .text').stop().slideUp(200);
			$(this).find('.info-box .text').stop().slideDown(200);
			return false;
		});
		$($service_block).on('mouseleave', function (e) {
			return false;
		});
	}

	if ($('.product-details .bxslider').length) {
		$('.product-details .bxslider').bxSlider({
        nextSelector: '.product-details #slider-next',
        prevSelector: '.product-details #slider-prev',
        nextText: '<i class="fa fa-angle-right"></i>',
        prevText: '<i class="fa fa-angle-left"></i>',
        mode: 'fade',
        auto: 'true',
        speed: '700',
        pagerCustom: '.product-details .slider-pager .thumb-box'
    });
	};

	if ($('.room-section-h1-two .bxslider').length) {
		$('.room-section-h1-two .bxslider').bxSlider({
        nextSelector: '.room-section-h1-two #slider-next',
        prevSelector: '.room-section-h1-two #slider-prev',
        nextText: '<i class="fa fa-angle-right"></i>',
        prevText: '<i class="fa fa-angle-left"></i>',
        mode: 'fade',
        auto: 'true',
        speed: '1000',
        pagerCustom: '.room-section-h1-two .slider-pager .thumb-box'
    });
	};

	//Distance Range Slider
	if ($('.distance-range-slider').length) {
		$(".distance-range-slider").slider({
			range: true,
			min: 0,
			max: 2000,
			values: [0, 1500],
			slide: function (event, ui){
				$("input.range-amount").val(ui.values[0] + " - " + ui.values[1]);
			}
		});
		$("input.range-amount").val($(".distance-range-slider").slider("values", 0) + " - " + $(".distance-range-slider").slider("values", 1));
	}

  $(".quantity-box .add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });
  $(".quantity-box .sub").on("click", function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1)
        $(this)
        .next()
        .val(+$(this).next().val() - 1);
    }
  });

  // Thumbnails slider
  var thumbsSwiper = new Swiper(".swiper-pagination-thumbs", {
    slidesPerView: 3,
    spaceBetween: 10,
    watchSlidesProgress: true,
  });

  // Main slider with fade + autoplay
  var mainSwiper = new Swiper(".testimonial-slider", {
    // effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 800,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true, // infinite loop
    thumbs: { swiper: thumbsSwiper },
    pagination: {
	    el: ".swiper-pagination",
	    clickable: true,
	  },
  });

	// Testinomials Carousel
	if ($('.testimonial-slider-content').length) {
		var slider = new Swiper ('.testimonial-slider-content', {
			slidesPerView: 1,
			spaceBetween: 30,
			navigation: true,
			centeredSlides: true,
			loop: true,
			loopedSlides: 6,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
		var thumbs = new Swiper ('.testimonial-thumbs', {
			slidesPerView: 'auto',
			spaceBetween: 0,
			centeredSlides: true,
			loop: true,
			slideToClickedSlide: true,
		});
		slider.controller.control = thumbs;
		thumbs.controller.control = slider;
	}

	// Testinomials Carousel
	if ($('.testimonial-h3-slider-content').length) {
		var slider = new Swiper ('.testimonial-h3-slider-content', {
			slidesPerView: 1,
			spaceBetween: 30,
			navigation: true,
			centeredSlides: true,
			loop: true,
			loopedSlides: 6,
			navigation: {
				nextEl: '.testi-button-next',
				prevEl: '.testi-button-prev',
			},
		});
		var thumbs = new Swiper ('.testimonial-h3-thumbs', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			centeredSlides: true,
			loop: true,
			slideToClickedSlide: true,
		});
		slider.controller.control = thumbs;
		thumbs.controller.control = slider;
	}

	// Testinomials Carousel
	if ($('.testimonial-h4-slider-content').length) {
		var slider = new Swiper ('.testimonial-h4-slider-content', {
			slidesPerView: 1,
			spaceBetween: 30,
			navigation: true,
			centeredSlides: true,
			loop: true,
			loopedSlides: 6,
			navigation: {
				nextEl: '.testi-button-next',
				prevEl: '.testi-button-prev',
			},
			// pagination
			pagination: {
				el: ".room-slider-pagination",
				clickable:true,
			},
		});
	}


	if (document.querySelector('.banner-h3-slider-content')) {

	  var slider = new Swiper('.banner-h3-slider-content', {
	    slidesPerView: 1,
	    spaceBetween: 0,
	    centeredSlides: true,
	    loop: true,
	    loopedSlides: 6,
	    autoplay: {
	      delay: 6000,
	      disableOnInteraction: false,
	      pauseOnMouseEnter: false,
	    },
	    navigation: {
	      nextEl: '.banner-button-next',
	      prevEl: '.banner-button-prev',
	    },
	  });

	  var thumbs = new Swiper('.banner-h3-thumbs', {
	    slidesPerView: 'auto',
	    spaceBetween: 10,
	    loop: false,
	    allowTouchMove: true,
	  });

	  thumbs.slides.forEach((slide, index) => {
	    slide.addEventListener('click', () => {
	      slider.slideToLoop(index);
	    });
	  });

	  slider.on('slideChange', function () {
	    let activeIndex = slider.realIndex;

	    thumbs.slides.forEach(slide => {
	      slide.classList.remove('swiper-slide-thumb-active');
	    });

	    if (thumbs.slides[activeIndex]) {
	      thumbs.slides[activeIndex].classList.add('swiper-slide-thumb-active');
	    }
	  });

	}




	// Testinomials Carousel
	if ($('.banner-h1-slider-content').length) {
		var slider = new Swiper ('.banner-h1-slider-content', {
			slidesPerView: 1,
			spaceBetween: 0,
			navigation: true,
			centeredSlides: true,
			loop: true,
			loopedSlides: 6,
			autoplay: {
				delay: 3000,            // time between slides (in ms)
				disableOnInteraction: false, // keep autoplay after user interactions
				pauseOnMouseEnter: false,    // optional: autoplay won't pause on hover
			},
			navigation: {
				nextEl: '.banner-h1-button-next',
				prevEl: '.banner-h1-button-prev',
			},
		});
	}

	//Price Range Slider
	// if($('.price-range-slider').length){
	// 	$( ".price-range-slider" ).slider({
	// 		range: true,
	// 		min: 10,
	// 		max: 99,
	// 		values: [ 10, 60 ],
	// 		slide: function( event, ui ) {
	// 		$( "input.property-amount" ).val(ui.values[ 1 ] );
	// 		}
	// 	});

	// 	$( "input.property-amount" ).val($( ".price-range-slider" ).slider( "values", 1 ) );
	// }

	if ($('.price-range-slider').length) {
    $(".price-range-slider").slider({
        range: "min",
        min: 100,
        max: 2000,
        value: 1000,
        slide: function (event, ui) {

            // show value text
            $('.property-output').text(ui.value + " sq. ft.");
        }
    });

    // initial text
    $('.property-output').text($(".price-range-slider").slider("value") + " sq. ft.");
}



	//Accordion Box
	if ($('.accordion-box').length) {
		$(".accordion-box").on('click', '.acc-btn', function () {

			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if ($(this).hasClass('active') !== true) {
				$(outerBox).find('.accordion .acc-btn').removeClass('active ');
			}

			if ($(this).next('.acc-content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}

	//Jquery Knob animation  // Pie Chart Animation
	if ($('.dial').length) {
		$('.dial').appear(function () {
			var elm = $(this);
			var color = elm.attr('data-fgColor');
			var perc = elm.attr('value');

			elm.knob({
				'value': 0,
				'min': 0,
				'max': 100,
				'skin': 'tron',
				'readOnly': true,
				'thickness': 0.15,
				'dynamicDraw': true,
				'displayInput': false
			});

			$({ value: 0 }).animate({ value: perc }, {
				duration: 2000,
				easing: 'swing',
				progress: function () {
					elm.val(Math.ceil(this.value)).trigger('change');
				}
			});

			//circular progress bar color
			$(this).append(function () {
				// elm.parent().parent().find('.circular-bar-content').css('color',color);
				//elm.parent().parent().find('.circular-bar-content .txt').text(perc);
			});

		}, { accY: 20 });
	}


	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){

			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);

			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}

		},{accY: 0});
	}

	

	//Dropdown Button
	$('.pricing-tabs .tab-buttons .yearly').on('click', function() {
		$('.round').addClass('boll-right');
	});
	
	//Dropdown Button
	$('.pricing-tabs .tab-buttons .monthly').on('click', function() {
		$('.round').removeClass('boll-right');
	});

	//Tabs Box
	if ($('.tabs-box').length) {
		$('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));

			if ($(target).is(':visible')) {
				return false;
			} else {
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				$(target).fadeIn(300);
				$(target).addClass('active-tab animated fadeIn');
			}
		});
	}

	//Progress Bar
	if ($('.progress-line').length) {
		$('.progress-line').appear(function () {
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width', percent + '%');
		}, { accY: 0 });
	}

	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}

	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			});
		});
	}

	// Home 1 Destination js
	var swiper = new Swiper(".destination-active", {
		speed:1500,
		loop: true,
		slidesPerView: 1,
		autoplay: {
			delay: 3000,            // time between slides (in ms)
			disableOnInteraction: false, // keep autoplay after user interactions
			pauseOnMouseEnter: false,    // optional: autoplay won't pause on hover
		},
		// Navigation arrows
		navigation: {
			nextEl: '.slider-next',
			prevEl: '.slider-prev',
		},
		// pagination
		pagination: {
			el: ".destination-dots",
			clickable:true,
		},
	});

	// Home 1 Destination js
	var swiper = new Swiper(".testimonial-active-home-two", {
		speed:1500,
		loop: true,
		slidesPerView: 1,
		spaceBetween: 50,
		autoplay: {
			delay: 3000,            // time between slides (in ms)
			disableOnInteraction: false, // keep autoplay after user interactions
			pauseOnMouseEnter: false,    // optional: autoplay won't pause on hover
		},
		// Navigation arrows
		navigation: {
			nextEl: '.slider-next',
			prevEl: '.slider-prev',
		},
		// pagination
		pagination: {
			el: ".blog-slider-pagination",
			clickable:true,
		},
	});

	// Home 1 Destination js
	var swiper = new Swiper(".room-active-home-three", {
		speed:1500,
		loop: true,
		slidesPerView: 3,
		spaceBetween: 15,
		autoplay: {
			delay: 3000,            // time between slides (in ms)
			disableOnInteraction: false, // keep autoplay after user interactions
			pauseOnMouseEnter: false,    // optional: autoplay won't pause on hover
		},
		breakpoints: {
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'575': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			nextEl: '.slider-next',
			prevEl: '.slider-prev',
		},
		// pagination
		pagination: {
			el: ".room-slider-pagination",
			clickable:true,
		},
	});


	// Home 1 blog 
	var swiper = new Swiper(".blog-active", {
		speed:1000,
		loop: true,
		spaceBetween: 30,
		slidesPerView: 1,
		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		breakpoints: {
			'1399': {
				slidesPerView: 3,
			},
			'1250': {
				slidesPerView: 2,
			},
			'992': {
				slidesPerView: 2,
			},
			'815': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			nextEl: '.slider-next',
			prevEl: '.slider-prev',
		},
	});


	// Aos Animation
	AOS.init();

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}

	// count Bar
	if ($(".count-bar").length) {
		$(".count-bar").appear(
			function () {
					var el = $(this);
					var percent = el.data("percent");
					$(el).css("width", percent).addClass("counted");
				}, {
					accY: -50
			}
		);
	}

	// Four Item Swiper
	if ($('.properties-h1_swiper').length) {  
		var swiper = new Swiper(".properties-h1_swiper", {
			slidesPerView: 3,
			spaceBetween: 30,
			centeredSlides: true,
			loop: true,
			autoplay: true,
			speed: 1000,
			//centeredSlides: true,
			navigation: {
				nextEl: ".four-item_button-next",
				prevEl: ".four-item_button-prev",
			},
			breakpoints: {
				1500: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 2,
				},
				1000: {
					slidesPerView: 2,
				},
				970: {
					slidesPerView: 1,
				},
				650: {
					slidesPerView: 1,
				},
				600: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}



	//Image Reveal Animation
	if($('.reveal').length){
		gsap.registerPlugin(ScrollTrigger);
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
				trigger: container,
				toggleActions: "play none none none"
				}
			});
			tl.set(container, { autoAlpha: 1 });
			tl.from(container, 1.5, {
				xPercent: -100,
				ease: Power2.out
			});
			tl.from(image, 1.5, {
				xPercent: 100,
				scale: 1.3,
				delay: -1.5,
				ease: Power2.out
			});
		});
	}

	document.querySelectorAll(".scroll-text").forEach((section) => {
		let tl = gsap.timeline({
			scrollTrigger: {
			trigger: section,
			start: "top 100%",
			end: "bottom top",
			scrub: 1,
			markers: false,
			},
		});
		tl.from(section.querySelector(".text1"), { xPercent: 20 })
		.from(section.querySelector(".text2"), { xPercent: -20 }, 0);
		tl.from(section.querySelector(".scroll-anim-top"), { yPercent: 10 }, 0)
		.from(section.querySelector(".scroll-anim-bottom"), { yPercent: -10 }, 0);
	});

	//Bg Parallax
	if($('.bg-parallax').length){
		gsap.to(".bg-parallax", {
			backgroundPosition: "70% 75%",
			ease: "ease1",
			scrollTrigger: {
			trigger: ".bg-parallax",
			start: "top bottom",
			end: "bottom top",
			scrub: 1
			}
		});
	}

		// Select2 Dropdown
	$('.custom-select').select2({
		minimumResultsForSearch: 7,
	});

	

	//MixItup Gallery
	if ($('.filter-list').length) {
		$('.filter-list').mixItUp({});
	}

	//Custom Data Attributes
	if($('[data-tm-bg-color]').length){
		$('[data-tm-bg-color]').each(function() {
		  $(this).css("cssText", "background-color: " + $(this).data("tm-bg-color") + " !important;");
		});
	}

	if($('.scroll-to-fixed-parent').length){
	  var scroll_childs = $('.scroll-to-fixed-child');
	  for (var i = 0, length = scroll_childs.length; i < length; i++) {
	    var scroll_child = $(scroll_childs[i]);
	    scroll_child.scrollToFixed({
	      marginTop: $('header').outerHeight(true) + 10,
	      zIndex: 2,
	      spacerClass: 'd-none',
	      removeOffsets: true,
	      limit: function() {
	        var parent = this.parents('.scroll-to-fixed-parent');
	        return parent.offset().top + parent.outerHeight(true) - this.outerHeight(true) - 20;
	      }
	    });
	  }
	 }

  /* ---------------------------------------------------------------------- */
  /* ----------- Activate Menu Item on Reaching Different Sections ---------- */
  /* ---------------------------------------------------------------------- */
  var $onepage_nav = $('.onepage-nav');
  var $sections = $('section');
  var $window = $(window);
  function TM_activateMenuItemOnReach() {
	  if( $onepage_nav.length > 0 ) {
	    var cur_pos = $window.scrollTop() + 2;
	    var nav_height = $onepage_nav.outerHeight();
	    $sections.each(function() {
	      var top = $(this).offset().top - nav_height - 80,
	        bottom = top + $(this).outerHeight();

	      if (cur_pos >= top && cur_pos <= bottom) {
	        $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
	        $sections.removeClass('current').removeClass('active');
	        $onepage_nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('current').addClass('active');
	      }

	      if (cur_pos <= nav_height && cur_pos >= 0) {
	        $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
	        $onepage_nav.find('a[href="#header"]').parent().addClass('current').addClass('active');
	      }
	    });
	  }
	}


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */

	$(window).on('scroll', function() {
		headerStyle();
		TM_activateMenuItemOnReach();
	});

/* ==========================================================================
   When document is loading, do
   ========================================================================== */

	$(window).on('load', function() {
		handlePreloader();
		TM_Pricing_Switcher_Smart();
  	TM_Pricing_Switcher_Btn();
	});

})(window.jQuery);
