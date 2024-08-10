const submitBtn = document.querySelector('.bot');
const searchInput = document.querySelector('.loca');
const dayNameDate = document.querySelector('.forecast-header ');
const forecastLocation = document.querySelector('.forecast-content');
const thirdDay = document.querySelector('.forecast-content3');
const secondDay = document.querySelector('.forecast-content2');
const secondDayName = document.querySelector('.forecast-header2');
const lastDayName = document.querySelector('.forecast-header3');
const umbrellaIcon = document.querySelector('.spans');
var data;

searchInput.addEventListener("input",async function(){
    const city = searchInput.value.trim();
    const apiUrl =`http://api.weatherapi.com/v1/forecast.json?key=8b3e5112fbc04720b2514650241204&days=3&q=${city}`;
    await fetch(apiUrl)
    .then(async response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    })

    .then(data => {
        if(data.current.is_day==1){
            var status= "day";
        }
        else{
            status="night"
        }
        console.log(status);
        console.log(data)
        name1 = data.location.name
        date= data.forecast.date;
        var cloud=data.current.cloud ;
        var direct= data.current.wind_dir;
        var condition = data.current.condition.text
        var wind = data.current.wind_kph;
        var temp=data.current.temp_c
        var Tommocond = data.forecast.forecastday[1].day.condition.text;
        var tommohigh=data.forecast.forecastday[1].day.maxtemp_c;
        var tommolow=data.forecast.forecastday[1].day.mintemp_c;
        var aftercond = data.forecast.forecastday[2].day.condition.text;
        var afterhigh=data.forecast.forecastday[2].day.maxtemp_c;
        var afterlow=data.forecast.forecastday[2].day.mintemp_c;
        function formatDate(dateString) {
            var parts = dateString.split('-');
            var year = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10)-1 ; 
            var day = parseInt(parts[2], 10);
            var date = new Date(year, month, day);
            var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var dayName = dayNames[date.getDay()];
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var monthName = monthNames[month];
            var formattedDate = day + ' ' + monthName;
            return {
                dayName: dayName,
                formattedDate: formattedDate
            };
        }
        var dates = data.forecast.forecastday[0].date;
        var formatted = formatDate(dates);
        var nextday = data.forecast.forecastday[1].date;
        var formattednext = formatDate(nextday);
        var lastday = data.forecast.forecastday[2].date;
        var formattedlast = formatDate(lastday);
        forecastLocation.innerHTML =`<div class="location fs-5 ">${name1}</div>
                                     <div class="num d-flex justify-content-between align-items-center">
                                         <div class="degree text-white">${temp}<sup>o</sup>C</div>
                                         <div class="forecast-icon me-3">
                                            <img src="./weather/64x64/${status}/${condition}.png" alt="" width="70">
                                         </div>	    
                                     </div>
                                     <div class="custom fs-5 ms-1">${condition}</div>` ;

        umbrellaIcon.innerHTML=`<span class="umbe" ><img src="./images/icon-umberella.png" alt="">${cloud}%</span>
                                <span class="wind"><img src="./images/icon-wind.png" alt="">${wind}kph</span>
                                <span class="compass"><img src="./images/icon-compass.png" alt="">${direct}</span>  ` ;
                                
        dayNameDate.innerHTML= `<div class="day">${formatted.dayName}</div>
                             <div class=" date">${formatted.formattedDate}</div>`   ;
                             
        secondDay.innerHTML= `  <div class="forecast-icon my-2">
                                    <img src="./weather/64x64/${status}/${Tommocond}.png" alt="" width="56">
                                </div>
                                <div class="degree2 text-white">${tommohigh}<sup>o</sup>C</div>
                                <small class=" mb-2">${tommolow}<sup>o</sup></small>
                                <div class="custom">${Tommocond}</div>  `     ;
        thirdDay.innerHTML=`<div class="forecast-icon my-2">
                              <img src="./weather/64x64/${status}/${aftercond}.png" alt="" width="56">
                           </div>
                            <div class="degree2 text-white">${afterhigh}<sup>o</sup>C</div>
                            <small class=" mb-2">${afterlow}<sup>o</sup></small>
                            <div class="custom">${aftercond}</div>`   ;
        secondDayName.innerHTML=`<div class="day">${formattednext.dayName}</div>`                                 
        lastDayName.innerHTML=`<div class="day">${formattedlast.dayName}</div>`                                 
    })
    .catch(error => {
        console.error('There was a problem fetching the weather data:', error);
    });
})
var name1;
