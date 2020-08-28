'use strict'
//                          ГЕНЕРАЦИЯ ПИНОВ
//массив с аватарками объявлений
window.data = (function () {

    var hotelsAvatars = [];
    var hotelsTypes = ['palace', 'flat', 'house' , 'bungalo'];
    var hotelsCheckins = ['12:00', '13:00', '14:00'];
    var hotelsCheckouts = ['12:00', '13:00', '14:00'];
    var hotelsFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    var hotelsPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
    var hotelsTitles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый него степриимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало поколено в воде"];
    var hotelsArr = [];

    for(var i = 1; i < 9; i++){
        if(i < 10){
            hotelsAvatars.push('img/avatars/user0' + i + '.png');
        }else{
            hotelsAvatars.push('img/avatars/user' + i + '.png');
        }
        
    }
    // генерация числа в диапозоне
    function randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    // перемешивание массива
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    //Функция генерации отеля с данными
    var generateHotelsOffer = function(avatar, title, checkinsArr, checkoutsArr, featuresArr, photosArr, typesArr){

        var features = '';
        
        shuffle(featuresArr);
        for(var i = 0; i < randomInteger(1, featuresArr.length -1) ; i++){
            
            var feature = featuresArr[i];
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

    //Создание массива отелей с данными
    

    for(var i = 0; i < hotelsAvatars.length; i++){
        var hotel = generateHotelsOffer(hotelsAvatars[i], hotelsTitles[i], hotelsCheckins, hotelsCheckouts, hotelsFeatures, hotelsPhotos, hotelsTypes);
        hotelsArr.push(hotel);
    }

    

    return {
        hotels: hotelsArr
    }

}())




