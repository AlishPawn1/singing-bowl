
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

    // zoom image

    const zoom = $('.single-main-slide .image');
    const s = 2;

    zoom.on('mousemove', function(e) {
        const x = e.pageX - $(this).offset().left - zoom.width() / 2;
        const y = e.pageY - $(this).offset().top- zoom.height() / 2;

        var xc = - x / s;
        var yc = - y / s;

        $('.single-main-slide .image img').css('transform', 'translate(' + xc + 'px, ' + yc + 'px) scale(1.5)');

    });

    zoom.on('mouseleave', function () {
        $('.single-main-slide .image img').css('transform', 'translate(0, 0) scale(1)');
    });


    // fancy box 

    // $('[data-fancybox="gallery"]').fancybox({
    //     buttons : [
    //         'slideShow',
    //         'share',
    //         'zoom',
    //         'fullScreen',
    //         'download',
    //         'thumbs',
    //         'close'
    //     ]
    // });


    // quantity plus minus 
    var x = parseInt($(".quantity-product").val());

    $(".plus").click(function () {
        $(".quantity-product").val(++x);
        $('#updateButton').prop('disabled', false); 
    });
  
    $(".minus").click(function () {
        if (x > 1) {
            $(".quantity-product").val(--x);
            $('#updateButton').prop('disabled', false); 
        } else {
            x = 1;
        }
    });
    $(document).ready(function () {
        // Extract the price, ensuring to remove the dollar sign and any other non-numeric characters
        const productPrice = parseFloat($('#product-price').text());
        const $quantityInput = $('#quantity-product');
        const $subtotalElement = $('#subtotal');
        
        // Ensure quantity starts as an integer
        let quantity = parseInt($quantityInput.val());
    
        // Function to update subtotal
        function updateSubtotal() {
            const subtotal = (productPrice * quantity).toFixed(2);
            $subtotalElement.text(subtotal);
        }
    
        // Event listeners for minus and plus buttons
        $('.product-btn.minus').click(function () {
            if (quantity > 1) {
                quantity -= 1;
                $quantityInput.val(quantity);
                updateSubtotal();
            }
        });
    
        $('.product-btn.plus').click(function () {
            quantity += 1;
            $quantityInput.val(quantity);
            updateSubtotal();
        });
    
        // Initial subtotal calculation
        updateSubtotal();
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

if(document.querySelector('.product-main-slide')){
    var main = new Splide( '.product-main-slide', {
        type       : 'fade',
        pagination : false,
        arrows     : false,
        cover      : true,
    } );
    
    var thumbnails = new Splide( '.product-thumbnail-slide', {
    rewind          : true,
    fixedWidth      : 104,
    fixedHeight     : 100,
    arrows     : false,
    isNavigation    : true,
    pagination      : false,
    cover           : true,
    dragMinThreshold: {
        mouse: 4,
        touch: 10,
    },
    breakpoints : {
        640: {
        fixedWidth  : 66,
        fixedHeight : 50,
        },
    },
    } );
    
    main.sync( thumbnails );
    main.mount();
    thumbnails.mount();
}