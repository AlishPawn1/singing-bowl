
jQuery(function ($) {
    var btn = $('#button');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    $(document).ready(function() {
        $('.primary-menu li.menu-dropdown > a').append('<span class="dropdown-btn"><i class="fa-solid fa-chevron-down"></i></span>');

        $('.dropdown-btn').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var $parentLi = $(this).parent().parent();
            $parentLi.toggleClass('open').siblings().removeClass('open');
            $parentLi.find("ul.sub-menu").first().slideToggle();
            $parentLi.siblings().find("ul.sub-menu").slideUp().parent().removeClass('open');
        });
    
        $(document).on('click', function(event) {
            if (!$(event.target).closest('.menu-dropdown').length) {
                $('.menu-dropdown').removeClass('open');
                $('.sub-menu').slideUp();
            }
        });
    });
    
    $('.primary-menu li').has('ul').addClass('menu-dropdown');

    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.overlay').toggleClass('active');
        $('.nav-bar').toggleClass('active');
        $('header .logo').toggleClass('active');
        $('body').toggleClass('overflow-hidden');

    });

    $('.overlay').click(function() {
        $('.overlay').removeClass('active');
        $('.hamburger').removeClass('active');
        $('.nav-bar').removeClass('active');
        $('header .logo').removeClass('active');
        $('body').removeClass('overflow-hidden');
    });

    $('.category-card .icon').click(function(){
        $(this).toggleClass('active');
    });
    $('.banner-button .search .icon').click(function(){
        $('.banner-button .search .search-box').toggleClass('active');
        $('.search-box input').focus();
    });
    $('.footer-item .title').click(function(event){
        if ($(window).width() <= 575) {
          event.preventDefault();
          event.stopPropagation(); 
        
          var $submenu = $(this).next('ul');
          
          $submenu.slideToggle('fast', function() {
            $submenu.toggleClass('active');
          });
          $(this).toggleClass('active');
          $(this).parent().siblings().find('ul').removeClass('active').hide();
        }
      });
});



if(document.querySelector('.banner-slide')){
    banner_slide = new Splide('.banner-slide',{
        perPage:1,
        arrows:false,
    }).mount();
}
if(document.querySelector('.customer-slide')){
    banner_slide = new Splide('.customer-slide',{
        perPage:3,
        pagination: false,
        breakpoints: {
            1024: {
                perPage: 2,
            },
            768: {
                perPage: 1, 
            },
        }
    }).mount();
}