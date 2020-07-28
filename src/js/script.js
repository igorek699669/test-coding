$(document).ready(function () {
    // Табы
    let tabButton = $('.tab-buttons-wrapper .tab-button');
    let tabContent = $('.tab-content-wrapper .tab-content');
    tabButton.on('click', function () {
        if(!$(this).hasClass('active')){
            tabContent.removeClass('active');
            tabContent.eq($(this).index()).addClass('active');
            tabButton.removeClass('active');
            $(this).addClass('active')
        }
        if(tabButton[0].classList.contains('active')){
            $('.show-more-button-wrapper').show()
        }
        else{
            $('.show-more-button-wrapper').hide();
        }
    });

    // Кнопка показать еще
    $('.show-more-button-wrapper').on('click', function () {
       $('.tab-content-wrapper .tab-content.active .d-none').removeClass('d-none');
       $(this).hide()
    });
    // Анимация кнопок

    $('.btn').addClass('autoflash').append('<div class="flash lighting" style="height: 60px;width: 40px;top: 0px;left: -140px;"></div>');


    // Увеличение картинок
    $(".fancybox").fancybox();

    // скрыть попап
    $('.form-wrapper__close , .popup-callback .overlay').on('click', function () {
       $('.popup-callback').removeClass('active')
    });
    $('.confid-wrapper__close, .confid-popup .overlay').on('click', function () {
        $('.confid-popup').removeClass('active')
    });
    $('.thankyou-wrapper__close, .popup-thankyou .overlay').on('click', function () {
        $('.popup-thankyou').removeClass('active')
    });
    // показать попап
    $('.open-callback-popup').on('click', function () {
        $('.popup-callback').addClass('active')
    });
    $('.open-confid-popup').on('click', function () {
        $('.confid-popup').addClass('active')
    });

    //Показать карту

    $('.show-map').on('click', function () {
        $(this).hide();
        $('.google-map').show();
    });

    //Перекинуть на карту

    $('.clicktomap').on('click', function () {
       $('.show-map').trigger('click')
    });

    if (window.matchMedia("(max-width: 767px)").matches){
        $('.service-item__head-text').on('click', function () {
           $(this).closest('.service-item').addClass('active');
        });
        $('.steps-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            prevArrow: '.steps-slider-wrapper__left-arrow',
            nextArrow: '.steps-slider-wrapper__right-arrow',
        });
    }
    $('form').on('submit', function () {
       $('.popup-thankyou').addClass('active');
       $('.popup-callback').removeClass('active')
    });


    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "../mail/mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });


});