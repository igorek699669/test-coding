$(document).ready(function () {
    //rangeSlider code

    let rangeSlider = $('#rangeSlider')[0];
    let sliderValue = $('.rangeSlider-wrapper .top-line__percents span');
    noUiSlider.create(rangeSlider, {
        start: [75],
        range: {
            'min': [0],
            'max': [100]
        }
    });
    rangeSlider.noUiSlider.on('update' , function () {
        sliderValue.text(parseInt(rangeSlider.noUiSlider.get()))
    });

    //select code

    $('.select-wrapper .select').on('click' , function () {
        $(this).closest('.select-wrapper').toggleClass('active')
    })

});