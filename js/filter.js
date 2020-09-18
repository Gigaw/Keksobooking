(function(){

    window.pinsFiltration = function (pins){
        var pinFilter = {
            housingType: document.querySelector('.map__filter#housing-type').value,
            housingPrice: document.querySelector('.map__filter#housing-price').value,
            housingRooms: document.querySelector('.map__filter#housing-rooms').value,
            housingGuests: document.querySelector('.map__filter#housing-guests').value
        }
        var pinFeatureFilters = document.querySelectorAll('.map__filter-set input');
        var filteredPins  = pins;

        if(pinFilter.housingType != 'any'){
            filteredPins =  filteredPins.filter(function(el) {
                return el.offer.type === pinFilter.housingType;
            })
        }
        if(pinFilter.housingPrice != 'any'){
            filteredPins = filteredPins.filter(function (el) {
                switch(pinFilter.housingPrice) {
                    case 'low' :
                        return el.offer.price <= 10000;
                        break;
                    case 'middle': 
                        return el.offer.price >= 10000 && el.offer.price <= 50000;
                        break;
                    case 'high':
                        return el.offer.price >= 50000;
                        break;
                    default: 
                        return true;
                        break;
                }
            })
        }
        if(pinFilter.housingGuests != 'any'){
            filteredPins = filteredPins.filter(function (el) {
                switch(pinFilter.housingGuests) {
                    case '1' :
                        return el.offer.guests === 1;
                        break;
                    case '2': 
                        return el.offer.guests === 2;
                        break;
                    default: 
                        return true;
                        break;
                }
            })
        }
        if(pinFilter.housingRooms != 'any'){
            filteredPins = filteredPins.filter(function (el) {
                switch(pinFilter.housingRooms) {
                    case '1' :
                        return el.offer.rooms === 1;
                        break;
                    case '2': 
                        return el.offer.rooms === 2;
                        break;
                    case '3':
                        return el.offer.rooms === 3;
                        break;
                    default: 
                        return true;
                        break;
                }
            })
        }

        pinFeatureFilters.forEach(function (filter) {//Для каждого фильтра фич
            if(filter.checked){// Проверяем нажат ли он
                filteredPins = filteredPins.filter(function (pin){// Для уже фильтрованных пинов проводим еще проверку
                    // console.log( item.offer.features + ' ' + el.value)
                    var isAppropriate = false; // Подходит ли нам пин(содержит ли нужную фичу)
                    pin.offer.features.forEach(function (feature) {// Сравниваем есть ли среди фич пина выбранная пользователем фича
                        if(feature=== filter.value) {
                            isAppropriate = true;
                        }
                    })
                    return isAppropriate;
                    
                })
            }

        })


        console.log(filteredPins);
        return filteredPins;
    }
}())