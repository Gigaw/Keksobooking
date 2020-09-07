// -------------------------------ВАЛИДАЦИЯ-------------------------

// var userPinAvatar = form.querySelector('#avatar');
// var userPinTitle = form.querySelector('#title');
// var userPinAddress = form.querySelector('#address');
// var userPinType = form.querySelector('#type');
// var userPinPrice = form.querySelector('#price');
// var form = document.querySelector('.notice__form');
// var userPinRoomNumber = form.querySelector('#room_number');
// var userPinCapacity = form.querySelector('#capacity');

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

(function(){
    var form = document.querySelector('.notice__form');

    form.addEventListener('submit', function(evt){
        evt.preventDefault();

        window.backend.save(new FormData(form), function(response){
            console.log(response);
        })
        form.reset();
    })
}())

