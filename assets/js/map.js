ymaps.ready(function () {
    let myMap = new ymaps.Map('map', {
            center: [59.939099, 30.315877],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="map__marker">$[properties.iconContent]</div>'
        );

    for (let i = 0; i < markers.length; i++) {
        addMark(markers[i], i + 1, MyIconContentLayout, myMap);
    }

    const storage = ymaps.geoQuery(myMap.geoObjects),
        items = $('.shops__points-item');
    // for (let i = 0; i < items.length; i++) {
    //     if (items[i].getAttribute('data-pass') == 1) {
    //         storage.get(i).options.set('visible', false);
    //     }
    // }

    // клик по адресу
    $('.shops__points-link').on('click', function () {
        let parent = $(this).parent(),
            index = parent.index() - 1,
            coords = markers[index].center;

        myMap.setCenter(coords, 12, {duration: 500});
            
        if (!parent.hasClass('active')) {
            $('.shops__points-back').fadeIn();
            parent.addClass('active');
            $('.shops__points-item').hide();
            parent.fadeIn();
        }
    });

    // клик Назад
    $('.shops__points-back').on('click', function () {
        $(this).hide();
        $('.shops__points-item').removeClass('active');

        if ($('.shops__thumb-btn').hasClass('active')) {
            $('.shops__filter').hide();
            $('.shops__points-item').hide();
            $('[data-pass="0"]').fadeIn();

        } else {
            if ($('[data-company="1"]').hasClass('active') && $('[data-company="2"]').hasClass('active')) {
                $('[data-pass="1"]').fadeIn();
                
            } else if ($('[data-company="1"]').hasClass('active') && !$('[data-company="2"]').hasClass('active')) {
                $('[data-company-1="1"]').fadeIn();

            } else if (!$('[data-company="1"]').hasClass('active') && $('[data-company="2"]').hasClass('active')) {
                $('[data-company-2="1"]').fadeIn();
            }
        }

        myMap.setCenter([59.939099, 30.315877], 9, {duration: 500});
    });

    // клик тумблер
    $('.shops__thumb-btn').on('click', function () {
        
        if ($(this).hasClass('active')) {
            $('.shops__filter').hide();
            $('.shops__points-item').hide();
            $('[data-pass="0"]').fadeIn();

            for (let i = 0; i < items.length; i++) {
                if (items[i].getAttribute('data-pass') == 1) {
                    storage.get(i).options.set('visible', false);
                } else {
                    storage.get(i).options.set('visible', true);
                }
            }

        } else {
            $('.shops__filter-item').removeClass('active');
            $('.shops__filter').fadeIn();
            $('[data-pass="1"]').fadeIn();

            
            for (let i = 0; i < items.length; i++) {
                if (items[i].getAttribute('data-pass') == 1) {
                    storage.get(i).options.set('visible', true);
                }
            }
        }
    });

    //клик фильтр
    $('.shops__filter-item').on('click', function (e) {
        e.preventDefault();

        $(this).toggleClass('active');
        if ($('[data-company="1"]').hasClass('active') && $('[data-company="2"]').hasClass('active')) {
            $('[data-pass="1"]').show();

            for (let i = 0; i < items.length; i++) {
                if (items[i].getAttribute('data-pass') == 1) {
                    storage.get(i).options.set('visible', true);
                } else {
                    storage.get(i).options.set('visible', false);
                }
            }

        } else if ($('[data-company="1"]').hasClass('active') && !$('[data-company="2"]').hasClass('active')) {
            $('[data-company-2="1"]').hide();
            $('[data-pass="0"]').hide();
            $('[data-company-1="1"]').show();

            for (let i = 0; i < items.length; i++) {
                if (items[i].getAttribute('data-company-1') == 1) {
                    storage.get(i).options.set('visible', true);
                } else {
                    storage.get(i).options.set('visible', false);
                }
            }

        } else if (!$('[data-company="1"]').hasClass('active') && $('[data-company="2"]').hasClass('active')) {
            $('[data-company-1="1"]').hide();
            $('[data-pass="0"]').hide();
            $('[data-company-2="1"]').show();

            for (let i = 0; i < items.length; i++) {
                if (items[i].getAttribute('data-company-2') == 1) {
                    storage.get(i).options.set('visible', true);
                } else {
                    storage.get(i).options.set('visible', false);
                }
            }

        } else {
            $('[data-pass]').show();
            
            for (let i = 0; i < items.length; i++) {
                storage.get(i).options.set('visible', true);
            }
        }
    });

});


function addMark(elem, position, layout, map) {
    let mark = new ymaps.Placemark(elem.center, {
            hintContent: elem.name,
            iconContent: position
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15],
            iconContentOffset: [0, 0],
            iconContentLayout: layout
        }
    );
    map.geoObjects.add(mark);
    mark.events.add('click', function (e) {
        let placemark = e.get('target'),
            id = placemark.properties.get('iconContent'),
            coords = placemark.geometry.getCoordinates();
        console.log(id);
        map.setCenter(coords, 12, {duration: 500});
        let item = $('.shops__points-item').eq(id - 1);
        if (!item.hasClass('active')) {
            $('.shops__points-back').fadeIn();
            item.addClass('active');
            $('.shops__points-item').hide();
            item.fadeIn();
        }
    });
}