//                          ГЕНЕРАЦИЯ ПИНОВ

var hotelsAvatars = [];
for(var i = 1; i < 9; i++){
    if(i < 10){
        hotelsAvatars.push('img/avatars/user0' + i + '.png');
    }else{
        hotelsAvatars.push('img/avatars/user' + i + '.png');
    }
    
}

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

var hotelsTypes = ['palace', 'flat', 'house' , 'bungalo'];
var hotelsCheckins = ['12:00', '13:00', '14:00'];
var hotelsCheckouts = ['12:00', '13:00', '14:00'];
var hotelsFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var hotelsPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var hotelsTitles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый него степриимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало поколено в воде"];

var generateHotelsOffer = function(avatar, title, checkinsArr, checkoutsArr, featuresArr, photosArr, typesArr){

    var features = '';
    //var photosArr2 = shuffle(photosArr);
    
    shuffle(featuresArr);
    for(var i = 0; i < randomInteger(1, featuresArr.length -1) ; i++){
        
        feature = featuresArr[i];
        features += feature + ' ';
    }

    return {
            "author": {
                "avatar": avatar
            },
            "offer": {
                "title": title,
                "address": randomInteger(0, 1000) + ", " + randomInteger(0, 1000),
                "price": randomInteger(1000, 1000000) ,
                "type": typesArr[randomInteger(0, typesArr.length - 1)],
                "rooms": randomInteger(1, 5),
                "guests": randomInteger(1, 20),
                "checkin": checkinsArr[randomInteger(0, checkinsArr.length - 1 )] , 
                "checkout": checkoutsArr[randomInteger(0, checkoutsArr.length - 1 )],
                "features": features ,
                "description": "",
                "photos": photosArr
            },
            "location":{
                "x": randomInteger(0, 1200),
                "y": randomInteger(130, 630) 
            }
    }
}

shuffle(hotelsTitles);


var hotels = [];

for(var i = 0; i < hotelsAvatars.length; i++){
    var hotel = generateHotelsOffer(hotelsAvatars[i], hotelsTitles[i], hotelsCheckins, hotelsCheckouts, hotelsFeatures, hotelsPhotos, hotelsTypes);
    hotels.push(hotel);
}


var map = document.querySelector('.map')
var mapPinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');
var mapPins = document.querySelector('.map__pins')

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


var fragment = document.createDocumentFragment();

for( var i = 0; i < hotels.length; i++ ){

    fragment.appendChild(createMapPin(mapPinTemplate, hotels[i]));

}
map.appendChild(fragment);

function createMapCard(template, information){
    var card = template.cloneNode(true);

    card.querySelector('.popup__title').textContent = information.offer.title;
    card.querySelector('.popup__text--address').textContent = information.offer.address;
    card.querySelector('.popup__text--price').textContent = information.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = information.offer.type;

    var hotelType = information.offer.type;

    switch (hotelType) {
        case 'palace':
            card.querySelector('.popup__type').textContent = 'Дворец';
          break;
        case 'flat':
            card.querySelector('.popup__type').textContent = 'Квартира';
          break;
        case 'house':
            card.querySelector('.popup__type').textContent = 'Дом';
          break;
        case 'bungalo':
            card.querySelector('.popup__type').textContent = 'Бунгало';
          break;
        default:
            card.querySelector('.popup__type').textContent = 'Ночлежка';
      }

    card.querySelector('.popup__text--capacity').textContent = information.offer.rooms + ' комнаты для ' + information.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + information.offer.checkin + ', выезд до ' + information.offer.checkout ;
    card.querySelector('.popup__features').textContent = information.offer.features;
    card.querySelector('.popup__description').textContent = information.offer.description;

    var cardImgTemplate = card.querySelector('.popup__pictures li');
    card.querySelector('.popup__pictures li').remove();
    var imgFragment = document.createDocumentFragment();

    for( var i = 0; i < information.offer.photos.length; i++){
        cardImg = createCardImg(cardImgTemplate, information.offer.photos[i]);
        imgFragment.appendChild(cardImg);
    }

    card.querySelector('.popup__pictures').appendChild(imgFragment);
    card.querySelector('.popup__avatar').src = information.author.avatar;

    return card;

}

function createCardImg(template, image){
    var cardImg = template.cloneNode(true);
    cardImg.querySelector('img').setAttribute('style', 'width: 50px; height: auto')
    cardImg.querySelector('img').src = image;
    return cardImg
}



//mapPins.after(createMapCard(mapCardTemplate ,hotels[0]));

//  --------------------------- АКТИВАЦИЯ СТРАНИЦЫ -------------------------

var form = document.querySelector('.notice__form');
var formFieldsets = form.querySelector('fieldset');


for(var i = 0; i < formFieldsets.length; i++){
    formFieldsets[i].setAttribute('disabled', 'disabled');
}

// активация страницы

var mainPin = document.querySelector('.map__pin--main');
var adressInput = document.querySelector('#address');

const MAIN_PIN_WIDTH = mainPin.offsetWidth;
const MAIN_PIN_HEIGHT =  mainPin.offsetHeight;
const MAP_WIDTH = map.offsetWidth;
const MAP_HEIGHT = map.offsetHeight;

var onMainPinMouseup = function(){
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled')


    for(var i = 0; i< formFieldsets.length; i++){
        formFieldsets[i].removeAttribute('disabled');
    }

    fillAdress();

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
var mapPinButtons = document.querySelectorAll('.map__pin:not(.map__pin--main)');

var onPinClick = function (pin) {
    var pinImg = pin.querySelector('img').getAttribute('src');

    deletePinCard();

    for(var i = 0; i< hotels.length; i++){
    //    console.log(i);
        if(pinImg === hotels[i].author.avatar){
            mapPins.after(createMapCard(mapCardTemplate ,hotels[i]));
        }
    }    
}

var deletePinCard = function () {

    var mapCard = map.querySelector('.map__card');
    
    if(mapCard != null){
        mapCard.remove();
    }
    
}

// -------------------------------ВАЛИДАЦИЯ-------------------------

// var userPinAvatar = form.querySelector('#avatar');
// var userPinTitle = form.querySelector('#title');
// var userPinAddress = form.querySelector('#address');
// var userPinType = form.querySelector('#type');
// var userPinPrice = form.querySelector('#price');
var userPinRoomNumber = form.querySelector('#room_number');
var userPinCapacity = form.querySelector('#capacity');
// var userPinPhotos = form.querySelector('#images');

// userPinTitle.addEventListener('invalid', function(evt){
//     if(userPinTitle.validity.tooShort){
//         userPinTitle.setCustomValidity('Заголовок должен быть длиннее');
//         console.log('1')
//     } else if(userPinTitle.validity.tooLong){
//         userPinTitle.setCustomValidity('Заголовок должен быть короче');
//         console.log('2')
//     } else if(userPinTitle.validity.valueMissing){
//         userPinTitle.setCustomValidity('Это поле надо заполнить');
//         console.log('3')
//     }
// })

// userPinAvatar.addEventListener('invalid', function(evt){
//     if(userPinAvatar.validity.valueMissing){
//         userPinAvatar.setCustomValidity('Объявление должно содержать главную фотографию');
//         console.log('4')
//     }
// })

// userPinAddress.addEventListener('invalid', function(evt){
//     if(userPinAddress.validity.valueMissing){
//         userPinAddress.setCustomValidity('Объявление должно содержать Адресс');
//         console.log(userPinAddress.validity)
//     }
// })

// userPinPrice.addEventListener('invalid', function(evt){
//     if(userPinPrice.validity.rangeOverflow){
//         userPinPrice.setCustomValidity('Слишком высокая цена');
//         console.log('6')
//     }else if(userPinPrice.validity.rangeUnderflow){
//         userPinPrice.setCustomValidity('Цена должна быть выше');
//         console.log('7')
//     }else if(userPinPrice.validity.valueMissing){
//         userPinPrice.setCustomValidity('Объявление должно содержать цену');
//         console.log('8')
//     }
// })


// userPinPhotos.addEventListener('invalid', function(evt){
//     if(userPinPhotos.validity.valueMissing){
//         userPinPhotos.setCustomValidity('Объявление должно содержать фотографии жилья');
//         console.log('9')
//     }
// })

