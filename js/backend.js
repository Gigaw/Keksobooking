(function(){
    window.backend = {
        load: function(onSuccess, onError){
            // var URL = 'https://js.dump.academy/keksobooking/data';
            var URL ='https://javascript.pages.academy/keksobooking/data';
            var xhr = new XMLHttpRequest;
            xhr.responseType = 'json';

            xhr.addEventListener('load', function(evt){
                var error;

                switch (xhr.status){
                    case 200:
                        onSuccess(xhr.response);
                        break;
                    case 400:
                        error = 'Неверный запрос';
                        break;
                    case 401:
                        error = 'Пользователь не авторизован';
                        break;
                    case 404:
                        error = 'Ничего не найдено';
                        break;

                    default:
                        error = 'Статус ответа :: ' + xhr.status + ' ' + xhr.statusText;
                }   

                console.log(xhr.response);
            })

            xhr.addEventListener('error', function(){
                onError('Ошибка сервера');
            })

            xhr.addEventListener('timeout', function(){
                onError('Сервер не успел ответить за ' + xhr.timeout + 'мс');
            })

            xhr.open('GET', URL, true);
            xhr.send();

            console.log(xhr);
        },
        
        onError : function(message){
            console.error(message);
        },

        save: function(data, onSuccess){
            var URL = 'https://javascript.pages.academy/keksobooking';
            var xhr = new XMLHttpRequest;

            xhr.responseType = 'json';
            
            xhr.addEventListener('load', function(){
                onSuccess(xhr.response);
            });

            xhr.open('POST', URL);
            xhr.send(data);
        }

    }
}())