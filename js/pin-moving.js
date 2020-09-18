//Перетаскивание 

(function() {
    var mainPin = document.querySelector('.map__pin--main');
    var mainPinImg = document.querySelector('.map__pin--main img')
    var map = document.querySelector('.map');
    var form = document.querySelector('.notice__form');
    var formFieldsets = form.querySelectorAll('fieldset');
    // console.log(mainPin)
    
    mainPinImg.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        }
        
        onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();
            

            shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            console.log(shift);

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };


            // mainPin.setAttribute('style', 'top:' + (mainPin.offsetTop - shift.y) + 'px; left: '+ (mainPin.offsetLeft - shift.x) + 'px' )
            mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px' ;
            mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px' ;
        }

        onMouseUp = function (upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }


        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    })
}())