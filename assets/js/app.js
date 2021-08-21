

const lightbox = GLightbox({
    touchNavigation: true
});

const trustSlider = new Swiper('.slider__top', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: ".trust-next",
        prevEl: ".trust-prev",
      },
    loop: true,
    breakpoints: {
        576: {
            slidesPerView: 3,
        },
        726: {
            slidesPerView: 5,
        },
        966: {
            slidesPerView: 5,
        },
        1146: {
            slidesPerView: 6,
        }
    }
})

const dillerSlider = new Swiper('.slider__diller', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: ".diller-next",
        prevEl: ".diller-prev",
      },
    loop: true,
    breakpoints: {
        576: {
            slidesPerView: 3,
        },
        726: {
            slidesPerView: 5,
        },
        966: {
            slidesPerView: 5,
        },
        1146: {
            slidesPerView: 6,
        }
    }
})


// let scroll = 200;
// const header = $('.header');
// $(window).on('scroll', () => {
//     let width = $(window).width(),
//         currentScroll = window.scrollY;
    
//     if (currentScroll < 50) {
//         header.removeClass('header--bg');
//     } else if (currentScroll > scroll) {
//         header.css('transform', 'translateY(-100%)');
//     } else {
//         header.addClass('header--bg');
//         //header.addClass('scroll');
//         header.css('transform', 'translateY(0)');
//     }
//     scroll = currentScroll;
// });

$('.header__menu > li > a').on('click', function (e) {
    e.preventDefault();
    href = $(this).attr('href');
    $(this).addClass('focus');
    setTimeout(() => {
        window.location.href = href;
    }, 300);
});


// focus input
$('input').on('blur', function () {
    if ($(this).val() !== '' && $(this).val() !== '+7-___-___-__-__') {
        $(this).addClass('visited');
        $(this).next().addClass('visited');
    } else {
        $(this).removeClass('visited');
        $(this).next().removeClass('visited');
    }
});

$('textarea').on('blur', function () {
    if ($(this).val() !== '') {
        $(this).addClass('visited');
    } else {
        $(this).removeClass('visited');
    }
});

//service button form

$('.form__svg-wrap').on('click', function () {
    let list = $(this).parent().find('.form__service-option');
    $(this).toggleClass('open');
    list.slideToggle();
})

$('.form__service-option p').on('click', function () {
    let text = $(this).text(),
        parent = $(this).parent(),
        target = parent.parent().find('.form__service');

    target.text(text);
    $('.form__service-option p').removeClass('active');
    $(this).addClass('active');
    parent.slideUp();

    if ($(this).hasClass('textarea-show')) {
        $('.form__textarea-wrap').slideDown();
    } else {
        $('.form__textarea-wrap').slideUp();
    }
});

$('a[href^="/#"]').on('click', function (e) {
    e.preventDefault();
    let href = $(this).attr('href');
    let id = href.replace('/', '');
    if ($(id).length > 0) {
        href = href.replace('/', '');
        $('html, body').animate({scrollTop: $(href).offset().top}, 1100);
    } else {
        window.location.href = href;
    }
});

//Tel Mask

$('[type="tel"]').mask('+7-999-999-99-99',{autoclear: false});

//validation

const inputName = $('#popup_form').find('[name="name"]'),
      inputPhone = $('#popup_form').find('[name="phone"]'),
      inputEmail = $('#popup_form').find('[name="email"]'),
      inputService = $('#popup_form').find('#form_service'),
      inputDescr = $('#popup_form').find('[name="description"]');

inputName.on('keyup', function() {
    $(this).parent().removeClass('empty-label');
    if (validation(inputName) && validation(inputPhone)) {
        $('.form__submit').removeClass('disabled');
    } else {
        $('.form__submit').addClass('disabled'); 
    }
});

inputPhone.on('keyup', function() {
    $(this).parent().removeClass('empty-label');
    if (validation(inputName) && validation(inputPhone)) {
        $('.form__submit').removeClass('disabled');
    } else {
        $('.form__submit').addClass('disabled'); 
    }
});

inputEmail.on('blur', function () {
    let pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i,
        parent = $(this).parent().parent();
    if ($(this).val().search(pattern) == 0 || $(this).val() == '') {
        parent.removeClass('error-label');
        if (validation(inputName) && validation(inputPhone)) {
            $('.form__submit').removeClass('disabled');
        } else {
            $('.form__submit').addClass('disabled'); 
        }
    } else {
        parent.addClass('error-label');
        $('.form__submit').addClass('disabled');
    }
});



function validation(element){
    if (element.val() !== '' && element.val() !== '+7-___-___-__-__') {
        return true;
    } else {
        return false;
    }
}



//для выкл кнопки

$('#form_submit').on('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('disabled')) {
        if (validation(inputName) === false) {
           inputName.parent().addClass('empty-label');
        }
        if (validation(inputPhone) === false) {
            inputPhone.parent().addClass('empty-label');
        }
    } else {
        let data = {
            'action': 'modal',
            'name': inputName.val(),
            'phone': inputPhone.val(),
            'email': inputEmail.val(),
            'service': inputService.text(),
            'description': inputDescr.val()
        }
        $.ajax({
            url: myajax.url,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(json) {
                if(json['success']) {
                    console.log('ok');
                    $('.modal .form').fadeOut();
                    setTimeout(() => {
                        $('.modal .thank').fadeIn();
                    }, 500);
                }
            }
        });
        console.log(data);
    }
});

//вызов модалки
$('.modal-open').on('click', function (e) {
    e.preventDefault();
    $('body').addClass('no-scroll');
    $('.modal').fadeIn();
});

$('.modal-close').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('no-scroll');
    $('.modal').fadeOut();
    $('.modal .form').show();
    $('.modal .thank').hide();
});
//==============

$(document).mouseup(function (e){ // событие клика по веб-документу
    var div = $(".form"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
        $('body').removeClass('no-scroll');
        $('.modal').fadeOut(); // скрываем его
    }
});

//Кнопка на странице 'точки самовывоза'

$('.shops__thumb-btn').on('click', function () {
    $(this).toggleClass('active');
});

$(document).ready(function () {
    var href_url = window.location.href;

		$(".header__menu li").each(function () {
			var link = $(this).find("a").attr("href");

			if(href_url == link) {
				$(this).children('a').addClass("active");
			}
		});

        $(".header__links a").each(function () {
			var link = $(this).attr("href");

			if(href_url == link) {
				$(this).addClass("active");
			}
		});
});


//====================
// $('.modal-close').on('click', function (e) {
//     e.preventDefault();
//     $('body').removeClass('no-scroll');
//     $('.modal').fadeOut();
//     $('.modal .form').show();
//     $('.modal .thank').hide();
// });





// функция возвращает cookie с именем name, если есть, если нет, то undefined    
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
let cookiecook = getCookie("cookiecook");
// проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
if (cookiecook != "no") {
    // показываем    
    $('.cookie').fadeIn(); 
    // закрываем по клику
    $('.cookie-close').on('click', function(e) {
        e.preventDefault();
        $('.cookie').fadeOut();
        let date = new Date;
        date.setDate(date.getDate() + 1);    
        document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();   
    });
}