//mapPins.after(createMapCard(mapCardTemplate ,hotels[0]));
'use strict'

//  --------------------------- АКТИВАЦИЯ СТРАНИЦЫ -------------------------
window.map = (function () {
    var map = document.querySelector('.map');
    var mainPin = document.querySelector('.map__pin--main');
    var adressInput = document.querySelector('#address');
    var form = document.querySelector('.notice__form');
    var formFieldsets = form.querySelectorAll('fieldset');
    var mapPinButtons = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var hotels = window.data.hotels;
    var mapPins = document.querySelector('.map__pins');
    var mapCardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');

    

    const MAIN_PIN_WIDTH = mainPin.offsetWidth;
    const MAIN_PIN_HEIGHT =  mainPin.offsetHeight;
    const MAP_WIDTH = map.offsetWidth;
    const MAP_HEIGHT = map.offsetHeight;
    
    for(var i = 0; i < formFieldsets.length; i++){
        formFieldsets[i].setAttribute('disabled', 'disabled');
    }


    var onMainPinMouseup = function(){
        map.classList.remove('map--faded');
        form.classList.remove('notice__form--disabled')
    
        for(var i = 0; i< formFieldsets.length; i++){
            formFieldsets[i].removeAttribute('disabled');
        }
        
        for(let i = 0; i< mapPinButtons.length; i++){
            mapPinButtons[i].addEventListener('click', function(evt) {
                evt.preventDefault();
                onPinClick(evt.currentTarget);
            } )
        }
    }
    
    mainPin.addEventListener('mouseup', onMainPinMouseup);
    
    //Заполнить адрес
    var fillAdress = function(){
    
        var totalX = MAP_WIDTH/2 + MAIN_PIN_WIDTH/2;
        var totalY = MAP_HEIGHT/2 + MAIN_PIN_HEIGHT/2;
    
        adressInput.value = totalX + ', ' + totalY;
    }
    
    //Показать подробную информацию при нажатии пина
    
    
    var onPinClick = function (pin) {
        var pinImg = pin.querySelector('img').getAttribute('src');
    
        deletePinCard();
        // console.log(pin);
    
        for(var i = 0; i< hotels.length; i++){
        //    console.log(i);
            if(pinImg === hotels[i].author.avatar){
                mapPins.after(window.card.createMapCard(mapCardTemplate ,hotels[i]));
            }
        }    
    }
    
    var deletePinCard = function () {
    
        var mapCard = map.querySelector('.map__card');
        
        if(mapCard != null){
            mapCard.remove();
        }
        
    }

    fillAdress();

    return {
        // fillAdress: function(){
    
        //     var totalX = MAP_WIDTH/2 + MAIN_PIN_WIDTH/2;
        //     var totalY = MAP_HEIGHT/2 + MAIN_PIN_HEIGHT/2;
        
        //     adressInput.value = totalX + ', ' + totalY;
        // }
    }
}())


