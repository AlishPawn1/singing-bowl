
jQuery(function ($) {
    var btn = $('#button');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    $(document).ready(function () {
        $('.primary-menu li.menu-dropdown > a').append('<span class="dropdown-btn"><i class="fa-solid fa-chevron-down"></i></span>');

        $('.dropdown-btn').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var $parentLi = $(this).parent().parent();
            $parentLi.toggleClass('open').siblings().removeClass('open');
            $parentLi.find("ul.sub-menu").first().slideToggle();
            $parentLi.siblings().find("ul.sub-menu").slideUp().parent().removeClass('open');
        });

        $(document).on('click', function (event) {
            if (!$(event.target).closest('.menu-dropdown').length) {
                $('.menu-dropdown').removeClass('open');
                $('.sub-menu').slideUp();
            }
        });
    });

    $('.primary-menu li').has('ul').addClass('menu-dropdown');

    $('.hamburger').click(function () {
        $(this).toggleClass('active');
        $('.overlay').toggleClass('active');
        $('.nav-bar').toggleClass('active');
        $('header .logo').toggleClass('active');
        $('body').toggleClass('overflow-hidden');
    });

    $('.whist-list .cart-btn').click(function () {
        // $('.overlay').toggleClass('active');
        $('.list-cart-box').toggleClass('active');
    });

    $('.overlay, .overlay-desktop').click(function () {
        $('.overlay').removeClass('active');
        $('.overlay-desktop').removeClass('active');
        $('.hamburger').removeClass('active');
        $('.nav-bar').removeClass('active');
        $('header .logo').removeClass('active');
        $('.list-cart-box').removeClass('active');
        $('.filter-box-details').removeClass('active');
        $('body').removeClass('overflow-hidden');
        $('.list-cart-box').removeClass('active');
        $('.search-box').removeClass('active');
    });

    $('.category-card .icon').click(function () {
        $(this).toggleClass('active');
    });

    // header search
    $('.search .icon').click(function () {
        $('.search-box').addClass('active');
        $('.overlay-desktop').addClass('active');
        $('body').addClass('overflow-hidden');
        $('.search-form-box .form-input').focus();
    });
    $('.popup-search .close-btn').click(function(){
        $('.search-box').removeClass('active');
        $('.overlay-desktop').removeClass('active');
        $('body').removeClass('overflow-hidden');
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.search-box').length &&
            !$(event.target).closest('.search .icon').length) {
            $('.search-box').removeClass('active');
        }
    });

    $('.search-box').click(function (event) {
        event.stopPropagation();
    });

    // responsive mobile view 
    $('.footer-item .title').click(function (event) {
        if ($(window).width() <= 575) {
            event.preventDefault();
            event.stopPropagation();

            var $submenu = $(this).next('ul');

            $submenu.slideToggle('fast', function () {
                $submenu.toggleClass('active');
            });
            $(this).toggleClass('active');
            $(this).parent().siblings().find('ul').removeClass('active').hide();
        }
    });

    // zoom image

    const zoom = $('.product-main-slide .image');
    const s = 2;

    zoom.on('mousemove', function (e) {
        const x = e.pageX - $(this).offset().left - zoom.width() / 2;
        const y = e.pageY - $(this).offset().top - zoom.height() / 2;

        var xc = - x / s;
        var yc = - y / s;

        $('.product-main-slide .image img').css('transform', 'translate(' + xc + 'px, ' + yc + 'px) scale(1.5)');

    });

    zoom.on('mouseleave', function () {
        $('.product-main-slide .image img').css('transform', 'translate(0, 0) scale(1)');
    });

    $(document).ready(function () {
        // Extract the price, ensuring to remove the dollar sign and any other non-numeric characters
        const productPriceText = $('.product-price .amount').text().replace(/[^\d.-]/g, '');
        const productPrice = parseFloat(productPriceText);
        
        const $quantityInput = $('.quantity-product');
        const $totalAmountElement = $('.total-amt .amount');
        const $cart_subtotal = $('.sub-total #subtotal');
        const $updateButton = $('.form-group.update input[type="button"]');
    
        // Ensure quantity starts as an integer
        let quantity = parseInt($quantityInput.val());
        
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
            $quantityInput.val(quantity);
        }
    
        // Function to update total amount
        function updateTotalAmount() {
            const totalAmount = (productPrice * quantity).toFixed(2);
            $totalAmountElement.text(`$${totalAmount}`);
            $cart_subtotal.text(`$${totalAmount}`);
            console.log(totalAmount);
        }
    
        // Event listener for quantity input change
        $quantityInput.on('change', function () {
            quantity = parseInt($quantityInput.val());
            if (isNaN(quantity) || quantity < 1) {
                quantity = 1;
                $quantityInput.val(quantity);
            }
            updateTotalAmount();
            $updateButton.prop('disabled', false);
        });
    
        // Event listeners for minus and plus buttons
        $('.product-btn.minus').click(function () {
            if (quantity > 1) {
                quantity -= 1;
                $quantityInput.val(quantity).trigger('change');
            }
        });
    
        $('.product-btn.plus').click(function () {
            quantity += 1;
            $quantityInput.val(quantity).trigger('change');
        });
    
        // Event listener for update button click
        $updateButton.click(function () {
            $(this).prop('disabled', true);
            $(".update-message").addClass("active");
        });
    
        // Initial total amount calculation
        updateTotalAmount();
    
        // Quantity plus minus
        var x = parseInt($(".quantity-product").val());
    
        $(".plus").click(function () {
            $(".quantity-product").val(++x).trigger('change');
            $updateButton.prop('disabled', false);
        });
    
        $(".minus").click(function () {
            if (x > 1) {
                $(".quantity-product").val(--x).trigger('change');
                $updateButton.prop('disabled', false);
            } else {
                x = 1;
            }
        });
    });
    
    
    $('.change-address').click(function(){
        $(this).toggleClass('active');
        $('.changing-form').slideToggle();
    });

    // add cart loading

    $('.product-price-input .add_to_cart_button').click(function (e) {
        e.preventDefault();
        var container = $(this);
        container.addClass("loading");

        setTimeout(function () {
            container.removeClass("loading");
            container.addClass("added");
        }, 2000);
    });


    // select option

    $(document).ready(function () {
        const form = $("#order-select");
        const dropdowns = $(".order-dropdown");

        // Check if Dropdowns exist and create custom dropdown for each
        dropdowns.each(function () {
            createCustomDropdown($(this));
        });

        // Prevent form submission
        form.on("submit", function (e) {
            e.preventDefault();
        });

        // Create Custom Dropdown
        function createCustomDropdown(dropdown) {
            const options = dropdown.find("option");
            const customDropdown = $("<div class='order-select-dropdown position-relative'></div>");
            dropdown.after(customDropdown);

            const selected = $("<div class='order-select-dropdown-select'></div>").text(options.eq(0).text());
            customDropdown.append(selected);

            const menu = $("<div class='order-select-dropdown-menu'></div>");
            customDropdown.append(menu);

            selected.on("click", function () {
                menu.toggle();
                selected.toggleClass('open');
            });

            const menuInnerWrapper = $("<div class='order-select-dropdown-menu-inner'></div>");
            menu.append(menuInnerWrapper);

            options.each(function (index, option) {
                const item = $("<div class='order-select-dropdown-menu-item'></div>")
                    .data("value", $(option).val())
                    .text($(option).text());
                menuInnerWrapper.append(item);

                item.on("click", function () {
                    setSelected(selected, dropdown, menu, $(this));
                });
            });

            menuInnerWrapper.find("div:first-child").addClass("is-select");

            $(document).on("click", function (e) {
                if (!$(e.target).closest(".order-select-dropdown").length && menu.is(":visible")) {
                    menu.hide();
                    selected.removeClass('open');
                }
            });

            dropdown.hide();
        }

        function setSelected(selected, dropdown, menu, item) {
            selected.text(item.text());
            dropdown.val(item.data("value"));

            menu.hide();
            selected.removeClass('open');
            item.addClass("is-select").siblings().removeClass("is-select");
        }
    });

    // checkout-country-search

    $(document).ready(function () {
        const form = $("#checkout-country-form");
        const dropdowns = $(".checkout-country-dropdown");

        // Check if Dropdowns exist
        if (dropdowns.length > 0) {
            dropdowns.each(function () {
                createCustomDropdown($(this));
            });
        }

        // Prevent form submission
        if (form.length > 0) {
            form.on("submit", function (e) {
                e.preventDefault();
            });
        }

        // Create Custom Dropdown
        function createCustomDropdown(dropdown) {
            const options = dropdown.find("option");
            const customDropdown = $("<div class='country-form-dropdown position-relative'></div>");
            dropdown.after(customDropdown);

            const selected = $("<div class='country-form-dropdown-select'></div>");
            selected.text(options.eq(0).text());
            customDropdown.append(selected);

            const menu = $("<div class='country-form-dropdown-menu'></div>");
            customDropdown.append(menu);
            selected.on("click", function () {
                menu.toggle();
                $(this).toggleClass('open', menu.is(':visible'));
                menu.find("input").focus();
            });

            const search = $("<input class='country-form-dropdown-menu-search' placeholder='Search...'>");
            menu.append(search);

            const menuInnerWrapper = $("<div class='country-form-dropdown-menu-inner'></div>");
            menu.append(menuInnerWrapper);

            options.each(function (index, option) {
                const item = $("<div class='country-form-dropdown-menu-item'></div>");
                item.data("value", $(option).val());
                item.text($(option).text());
                menuInnerWrapper.append(item);

                item.on("click", function () {
                    setSelected(selected, dropdown, menu, $(this));
                });
            });

            menuInnerWrapper.find("div:first-child").addClass("selected");

            search.on("input", function () {
                filterItems(options, menu, search);
            });

            $(document).on("click", function (e) {
                if (!$(e.target).closest(".country-form-dropdown").length && menu.is(":visible")) {
                    menu.hide();
                    selected.removeClass('open');
                }
            });

            dropdown.hide();
        }

        function setSelected(selected, dropdown, menu, item) {
            const value = item.data("value");
            const label = item.text();

            selected.text(label);
            dropdown.val(value);

            menu.hide();
            selected.removeClass('open');
            menu.find("input").val("");
            menu.find(".country-form-dropdown-menu-inner div").show();
            item.addClass("is-select").siblings().removeClass("is-select");
        }

        function filterItems(options, menu, search) {
            const customOptions = menu.find(".country-form-dropdown-menu-inner div");
            const value = search.val().toLowerCase();

            options.each(function (index, option) {
                if ($(option).text().toLowerCase().includes(value)) {
                    customOptions.eq(index).show();
                } else {
                    customOptions.eq(index).hide();
                }
            });
        }
    });

    // country-search

    $(document).ready(function () {
        const form = $("#country-form");
        const dropdowns = $(".country-dropdown");

        // Check if Dropdowns exist
        if (dropdowns.length > 0) {
            dropdowns.each(function () {
                createCustomDropdown($(this));
            });
        }

        // Prevent form submission
        if (form.length > 0) {
            form.on("submit", function (e) {
                e.preventDefault();
            });
        }

        // Create Custom Dropdown
        function createCustomDropdown(dropdown) {
            const options = dropdown.find("option");
            const customDropdown = $("<div class='country-form-dropdown position-relative'></div>");
            dropdown.after(customDropdown);

            const selected = $("<div class='country-form-dropdown-select'></div>");
            selected.text(options.eq(0).text());
            customDropdown.append(selected);

            const menu = $("<div class='country-form-dropdown-menu'></div>");
            customDropdown.append(menu);
            selected.on("click", function () {
                menu.toggle();
                $(this).toggleClass('open', menu.is(':visible'));
                menu.find("input").focus();
            });

            const search = $("<input class='country-form-dropdown-menu-search' placeholder='Search...'>");
            menu.append(search);

            const menuInnerWrapper = $("<div class='country-form-dropdown-menu-inner'></div>");
            menu.append(menuInnerWrapper);

            options.each(function (index, option) {
                const item = $("<div class='country-form-dropdown-menu-item'></div>");
                item.data("value", $(option).val());
                item.text($(option).text());
                menuInnerWrapper.append(item);

                item.on("click", function () {
                    setSelected(selected, dropdown, menu, $(this));
                });
            });

            menuInnerWrapper.find("div:first-child").addClass("selected");

            search.on("input", function () {
                filterItems(options, menu, search);
            });

            $(document).on("click", function (e) {
                if (!$(e.target).closest(".country-form-dropdown").length && menu.is(":visible")) {
                    menu.hide();
                    selected.removeClass('open');
                }
            });

            dropdown.hide();
        }

        function setSelected(selected, dropdown, menu, item) {
            const value = item.data("value");
            const label = item.text();

            selected.text(label);
            dropdown.val(value);

            menu.hide();
            selected.removeClass('open');
            menu.find("input").val("");
            menu.find(".country-form-dropdown-menu-inner div").show();
            item.addClass("is-select").siblings().removeClass("is-select");
        }

        function filterItems(options, menu, search) {
            const customOptions = menu.find(".country-form-dropdown-menu-inner div");
            const value = search.val().toLowerCase();

            options.each(function (index, option) {
                if ($(option).text().toLowerCase().includes(value)) {
                    customOptions.eq(index).show();
                } else {
                    customOptions.eq(index).hide();
                }
            });
        }
    });

    // search-category
    $(document).ready(function () {
        const form = $("#search-category");
        const dropdowns = $(".select-search-category");

        // Check if Dropdowns exist
        if (dropdowns.length > 0) {
            dropdowns.each(function () {
                createCustomDropdown($(this));
            });
        }

        // Prevent form submission
        if (form.length > 0) {
            form.on("submit", function (e) {
                e.preventDefault();
            });
        }

        // Create Custom Dropdown
        function createCustomDropdown(dropdown) {
            const options = dropdown.find("option");
            const customDropdown = $("<div class='search-category position-relative'></div>");
            dropdown.after(customDropdown);

            const selected = $("<div class='search-category-select'></div>");
            selected.text(options.eq(0).text());
            customDropdown.append(selected);

            const menu = $("<div class='search-category-menu'></div>");
            customDropdown.append(menu);
            selected.on("click", function () {
                menu.toggle();
                $(this).toggleClass('open', menu.is(':visible'));
            });

            const menuInnerWrapper = $("<div class='search-category-menu-inner'></div>");
            menu.append(menuInnerWrapper);

            options.each(function (index, option) {
                const item = $("<div class='search-category-menu-item'></div>");
                item.data("value", $(option).val());
                item.text($(option).text());
                menuInnerWrapper.append(item);

                item.on("click", function () {
                    setSelected(selected, dropdown, menu, $(this));
                });
            });

            menuInnerWrapper.find("div:first-child").addClass("is-select");

            $(document).on("click", function (e) {
                if (!$(e.target).closest(".search-category").length && menu.is(":visible")) {
                    selected.removeClass('open');
                }
            });

            dropdown.hide();
        }

        function setSelected(selected, dropdown, menu, item) {
            const value = item.data("value");
            const label = item.text();

            selected.text(label);
            dropdown.val(value);

            menu.hide();
            selected.removeClass('open');
            menu.find("input").val("");
            menu.find(".search-category-menu-inner div").show();
            item.addClass("is-select").siblings().removeClass("is-select");
        }
    });

    $('.filter-box svg').click(function () {
        $('.filter-box').addClass('active');
        $('.filter-box-details').addClass('active');
        $('.overlay').addClass('active');
    });
    $('.filter-box .close-btn, .filter-box-details .close-btn').click(function () {
        $('.filter-box').removeClass('active');
        $('.filter-box-details').removeClass('active');
        $('.overlay').removeClass('active');
    });
    $('.whist-list .cart-btn').click(function () {
        $('.list-cart-box').addClass('active');
        $('.overlay-desktop').addClass('active');
    });
    $('.list-cart-box .box-head .icon').click(function () {
        $('.list-cart-box').removeClass('active');
        $('.overlay-desktop').removeClass('active');
    });

    // price range
    const rangeInput = $(".range-input input");
    const progress = $(".slider .progress");
    const fromLabel = $(".filter-price-label .from");
    const toLabel = $(".filter-price-label .to");
    let priceGap = 1;

    function updateLabels() {
        const minVal = parseInt(rangeInput.eq(0).val());
        const maxVal = parseInt(rangeInput.eq(1).val());
        fromLabel.text(`$${minVal}`);
        toLabel.text(`$${maxVal}`);
        progress.css("left", (minVal / rangeInput.eq(0).attr("max")) * 100 + "%");
        progress.css("right", 100 - (maxVal / rangeInput.eq(1).attr("max")) * 100 + "%");
    }

    rangeInput.on("input", function () {
        let minVal = parseInt(rangeInput.eq(0).val());
        let maxVal = parseInt(rangeInput.eq(1).val());

        if (maxVal - minVal < priceGap) {
            if ($(this).hasClass("range-min")) {
                rangeInput.eq(0).val(maxVal - priceGap);
            } else {
                rangeInput.eq(1).val(minVal + priceGap);
            }
        } else {
            updateLabels();
        }
    });

    updateLabels();
    // price range

    // create account
    $(".create-account-pw").hide();
    $("#checkbox").change(function() {
        if ($(this).is(":checked")) {
            $(".create-account-pw").slideDown();
        } else {
            $(".create-account-pw").slideUp();
        }
    });

    // payment-box
    $(".payment_box").not(":first").hide();
    $(".payment-option input[type='radio']").change(function() {
        $(".payment_box").hide();
        $(this).siblings("label").next(".payment_box").slideDown().fadeIn();
    });


    // shop filter
    $('.filter-item .title .icon').click(function () {
        $(this).closest('.filter-item').find('.filter-list').slideToggle();
        $(this).toggleClass('active');
    });

    function updateRemoveFilters() {
        $('.filter-radio .remove-filter-icon').remove();
        $('.filter-radio input[type="radio"]:checked').each(function() {
            $(this).closest('.label-input').append('<span class="remove-filter-icon"></span>');
        });
    }
    
    $('.filter-radio input').change(function() {
        $('.filter-radio .form-group').removeClass('select');
        if ($(this).is(':checked')) {
            $(this).closest('.form-group').addClass('select');
        }
        updateRemoveFilters();
    });
    
    $('.filter-radio').on('click', '.remove-filter-icon', function() {
        const $formGroup = $(this).closest('.form-group');
        $formGroup.removeClass('select');
        $formGroup.find('input[type="radio"]').prop('checked', false);
        $(this).remove();
    });
    updateRemoveFilters();
    
    
    

});

function toggleForm(formClassName) {
    var form = $('.' + formClassName);
    $('.login-form, .coupon-form').not(form).slideUp();
    form.slideToggle();
}

if (document.querySelector('.banner-slide')) {
    banner_slide = new Splide('.banner-slide', {
        perPage: 1,
        arrows: false,
    }).mount();
}
if (document.querySelector('.customer-slide')) {
    banner_slide = new Splide('.customer-slide', {
        perPage: 3,
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

if (document.querySelector('.product-main-slide')) {
    var main = new Splide('.product-main-slide', {
        type: 'fade',
        pagination: false,
        arrows: false,
        cover: true,
    });

    var thumbnails = new Splide('.product-thumbnail-slide', {
        rewind: true,
        fixedWidth: 104,
        fixedHeight: 100,
        arrows: false,
        isNavigation: true,
        pagination: false,
        cover: true,
        dragMinThreshold: {
            mouse: 4,
            touch: 10,
        },
        breakpoints: {
            640: {
                fixedWidth: 66,
                fixedHeight: 50,
            },
        },
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
}