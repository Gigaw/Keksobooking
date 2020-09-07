window.pin = (function(){
    var map = document.querySelector('.map');
    var mapPinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');
    
    
    var fragment = document.createDocumentFragment();
    // var hotels = window.data.hotels;

    //Создание пина на карте
    function createMapPin( mapPin, information){
        var pin = mapPin.cloneNode(true);

        var realTop = information['location']['x'] + 20 ;
        var realLeft = information['location']['y'] + 62;

        pin.querySelector('img').style = 'position: relative; z-index: 1;';
        pin.querySelector('img').src = information["author"]["avatar"];
        pin.querySelector('img').alt = information["offer"]["title"];
        pin.setAttribute('style', 'left: ' + realTop + 'px ; top: ' +  realLeft + 'px' );

        return pin;
    }


    function makePins(information){//Добавление пинов в разметку
        for( var i = 0; i < information.length; i++ ){
            fragment.appendChild(createMapPin(mapPinTemplate, information[i]));
        }
        map.appendChild(fragment);
    }

    var onError = function(message){
        console.error(message);
    }

    window.backend.load(makePins, onError);    
    
}())
