window.pin = (function(){
    var map = document.querySelector('.map');
    var mapPinContainer = document.querySelector('.map__pins');
    var mapPinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');
    
    
    var fragment = document.createDocumentFragment();

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

        window.hotelsData = information.slice(0); //Копирование массива данных

        for( var i = 0; i < information.length; i++ ){ // Создание фрагмента с пинами
            fragment.appendChild(createMapPin(mapPinTemplate, information[i]));
        }

        mapPinContainer.appendChild(fragment);//Добавление фрагмента на страницу 

        var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');//Поиск пинов кроме главного

        pins.forEach(function(el){//Показ карты пина при клике
          el.addEventListener('click', window.card.onPinClick);
        })
    }
    var onError = function(message){
        console.error(message);
    }

    window.backend.load(makePins, onError);

    var updatePins = function(){
        var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
        var pinsInfo = window.hotelsData.slice(0);
        
        pins.forEach(function(el){ //Удаление пинов
            el.remove(); 
        })
        var filteredPins =  window.pinsFiltration(pinsInfo);
        filteredPins.forEach(function(el){// Создание фрагмента с пинами
            fragment.appendChild(createMapPin(mapPinTemplate, el));
        })
        mapPinContainer.appendChild(fragment);//Добавление фрагмента на страницу 
    }

    var mapFilters = document.querySelectorAll('.map__filter, .map__filter-set input');

    mapFilters.forEach(function(el){
        el.addEventListener('change', function(evt){
            evt.preventDefault();
            updatePins();
            var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
            pins.forEach(function(el){//Показ карты пина при клике
                el.addEventListener('click', window.card.onPinClick);
              })
        })
    })
    
}())
