const input = document.getElementById('changecity');
const button = document.querySelector('button');
const cname = document.getElementById('cityname');
const ctemp = document.getElementById('temperature');
const cond = document.getElementById('description');
const icont = document.getElementById('wicon');
const t1 = document.getElementById('t1');
const t2 = document.getElementById('t2');
const t3 = document.getElementById('t3');
const t4 = document.getElementById('t4');
const citylocation = document.getElementById('myloc');



citylocation.onclick = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation не поддерживается вашим браузером.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Используем Nominatim API для обратного геокодирования с языком на английском
    var apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Получаем город на английском из данных
            var loccity = data.address.city;
            
            // Выводим город в консоль (вместо этого можно выполнить другие действия)
            console.log("Город пользователя: " + loccity);
            
            // Здесь вы можете выполнить другие действия с полученным городом
            const url = `https://api.weatherapi.com/v1/current.json?key=348e934f9b56438ea95143552231312&q=${loccity}`
    cname.textContent = loccity;
    input.value = '';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            ctemp.textContent = `${data.current.temp_c.toFixed()}°C`
            cond.textContent = data.current.condition.text;
            icont.src = data.current.condition.icon;
            t1.textContent = `${data.current.wind_kph}kph`;
            t2.textContent = `${data.current.pressure_mb}mb`;
            t3.textContent = `${data.current.humidity}%`;
            t4.textContent = `${data.current.cloud}%`;
        });
        })
        .catch(error => {
            console.error('Ошибка при обратном геокодировании:', error);
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Пользователь отклонил запрос на получение местоположения.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Информация о местоположении недоступна.");
            break;
        case error.TIMEOUT:
            alert("Время запроса на получение местоположения истекло.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Произошла неизвестная ошибка при получении местоположения.");
            break;
    }
}




button.onclick = function (e) {
    e.preventDefault();
    const inputname = input.value;
    const url = `https://api.weatherapi.com/v1/current.json?key=348e934f9b56438ea95143552231312&q=${inputname}`
    cname.textContent = inputname;
    input.value = '';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            ctemp.textContent = `${data.current.temp_c.toFixed()}°C`
            cond.textContent = data.current.condition.text;
            icont.src = data.current.condition.icon;
            t1.textContent = `${data.current.wind_kph}kph`;
            t2.textContent = `${data.current.pressure_mb}mb`;
            t3.textContent = `${data.current.humidity}%`;
            t4.textContent = `${data.current.cloud}%`;
        });
}
