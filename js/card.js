//Создание карточки отеля

window.card = (function(){
  return {
    createMapCard:  function(template, information){
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
          cardImg = window.card.createCardImg(cardImgTemplate, information.offer.photos[i]);
          imgFragment.appendChild(cardImg);
      }
  
      card.querySelector('.popup__pictures').appendChild(imgFragment);
      card.querySelector('.popup__avatar').src = information.author.avatar;
  
      return card;
  
  },
  
  createCardImg: function(template, image){
      var cardImg = template.cloneNode(true);
      cardImg.querySelector('img').setAttribute('style', 'width: 50px; height: auto')
      cardImg.querySelector('img').src = image;
      return cardImg
  }
  }
}())
