(function(){ // Создание карточки данных используя данные сервера
  var mapPins = document.querySelector('.map__pins');

  window.card = {
    onPinClick: function(evt){
      evt.preventDefault();

      var card = document.querySelector('.map__pins .map__card');

      if(card){
        card.remove(); //Удаление предыдущей карты для показа следующей
      }

      drawCard(evt.currentTarget); 
    },
    onPopCloseClick: function(evt){
      evt.preventDefault();
      var card = document.querySelector('.map__pins .map__card')
      card.remove();
    }
  }

  var findInfo = function(element){ //Функция находит нужный элемент из массива данных
    var img = element.querySelector('img').getAttribute('src') ;
    
    var currentHotel = window.hotelsData.find(function(el){
      if(img === el.author.avatar){
        return true;
      }
    })

    return currentHotel;
  }

  var drawCard = function(element){//Отрисовывает подробную информацию  элемента на странице

    var template = document.querySelector('#map-card-template').content.querySelector('.map__card');
    var card = template.cloneNode(true);
    var elInfo = findInfo(element);

    var createImgList = function(){ // Создание списка фотографий в карточке
      var fragment = document.createDocumentFragment();

      elInfo.offer.photos.forEach(function(photo){

        var popupPicture = template.querySelector('.popup__pictures li').cloneNode(true);

        popupPicture.querySelector('img').src = photo;
        popupPicture.querySelector('img').setAttribute('style', 'width: 50px; margin-right: 5px')

        fragment.appendChild(popupPicture)
      })

      return fragment; // элемент с фотографиями 
    }

    var createFeaturesList = function(){// Создание списка преимуществ в карточке
      var fragment = document.createDocumentFragment();

      elInfo.offer.features.forEach(function(item){

        var featureClass = 'feature--' + item;
        var feature = document.createElement('li')

        feature.classList.add(featureClass);
        feature.classList.add('feature');
        fragment.appendChild(feature)
      });

      return fragment; // Готовый элемент с фичами
    }

    var imgList = createImgList();
    var featuresList = createFeaturesList();

    card.querySelector('.popup__avatar').src = elInfo.author.avatar ;
    card.querySelector('.popup__title').textContent = elInfo.offer.title;
    card.querySelector('.popup__text--address').textContent = elInfo.offer.address;
    card.querySelector('.popup__text--price').textContent = elInfo.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = elInfo.offer.type ;
    card.querySelector('.popup__text--capacity').textContent = elInfo.offer.rooms + ' room(s) for ' +  elInfo.offer.guests + ' guests';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + elInfo.offer.checkin + ', выезд до ' + elInfo.offer.checkout;
    card.querySelector('.popup__description').textContent = elInfo.offer.description;
    card.querySelector('.popup__features').appendChild(featuresList);
    card.querySelector('.popup__pictures').appendChild(imgList);
    
    mapPins.appendChild(card);

    var closeBut = card.querySelector('.map__pins .map__card .popup__close');
    closeBut.addEventListener('click', window.card.onPopCloseClick);
  }

  


}())
