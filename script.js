var mode;

function drawGrid(squaresPerSide) {

    //Add rows
    for (var i = 0; i < squaresPerSide; i++) {
        $('#sketchpad').append('<div class="row"></div>');
    }

    //Fill rows
    for (var i = 0; i < squaresPerSide; i++) {
        $('.row').append('<div class="square"></div>');
    }

    //Set square sizes
    var squareDimension = $('#sketchpad').width() / squaresPerSide;
    $('.square').css({
        'height': squareDimension,
        'width': squareDimension
    });
}

function setMode(newMode) {
    mode = newMode;
    $('#' + newMode).addClass('selectedMode').siblings().removeClass('selectedMode');
}

$(document).ready(function() {

    //Set up
    var squaresPerSide = 16;
    drawGrid(squaresPerSide);
    setMode('pen');

    //Draw!
    $('#sketchpad').on('mouseenter', '.square', function() {
        var opacity = +$(this).css('opacity');
        switch (mode) {
            case 'pen':
                $(this).css({
                    'opacity': 1,
                    'background-color': 'black'
                });
                break;
            case 'pencil':
                if (opacity + .1 < 1) {
                    $(this).css({
                        'opacity': opacity + .1
                    });
                }
                else {
                    $(this).css({
                        'opacity': 1
                    });
                }
                break;
            case 'rainbow':
                var r = Math.floor(Math.random() * 256);
                var g = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);
                $(this).css({
                    'opacity': 1,
                    'background-color': 'rgb(' + r + ',' + g + ',' + b + ')'
                });
                break;
            case 'eraser':
                if (opacity > 0) {
                    $(this).css({
                        'opacity': opacity - .2
                    });
                }

                //Double check for browser weirdness like Safari not wanting to 
                //set it all the way to 0, and adjust for erasing too far past 
                //0, since it erases faster than the pencil draws
                var newOpacity = $(this).css('opacity')
                if (opacity - newOpacity < .015 || newOpacity < 0) {
                    $(this).css({
                        'opacity': 0,
                        'background-color': 'black'
                    });
                }
                break;
        }
    });

    //Reset
    $('#reset').on('click', function() {

        //Get and validate user input
        var newSquaresPerSide;
        var invalidInput;
        do {
            newSquaresPerSide = prompt('How many squares per side would you like?',
                squaresPerSide);
            var isNull = newSquaresPerSide === null;
            var isInteger = $.isNumeric(newSquaresPerSide) &&
                Number.isInteger(+newSquaresPerSide);
            var isPositive = newSquaresPerSide > 0;
            invalidInput = !isNull && !(isInteger && isPositive);
            if (invalidInput) {
                alert('Only positive integers (1, 2, 3, etc.)');
            }
        } while (invalidInput);

        if (newSquaresPerSide !== null) {
            squaresPerSide = newSquaresPerSide;
            $('#sketchpad').empty();
            drawGrid(squaresPerSide);
        }
    });

    //Change mode
    $('#modes').on('click', 'button', function() {
        setMode($(this).attr('id'));
    });
});
