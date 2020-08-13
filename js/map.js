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
map.classList.remove('map--faded');
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



mapPins.after(createMapCard(mapCardTemplate ,hotels[0]));