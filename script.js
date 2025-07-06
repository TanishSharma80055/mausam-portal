// http://api.weatherapi.com/v1/current.json?key=f3a12948f5bf4ef483794859250507&q=London&aqi=no
const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const iconField = document.querySelector(".icon");
const form = document.querySelector('form');
form.addEventListener('submit', searchforLocation);
let target = 'Jodhpur';
const fetchResult = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=f3a12948f5bf4ef483794859250507&q=${targetLocation}&aqi=no`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        if (data.error) {
            alert("Location not found!");
            return;
        }
        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;
        let icon = "https:"+data.current.condition.icon;
        let isDay = data.current.is_day;

        updateDetail(temp, locationName, time, condition,icon);
        updateBackground(condition, isDay);
    } catch (error) {
        console.error("Fetch failed:", error);
        alert("Failed to fetch weather. Please check your internet or city name.");
    }
}
function updateDetail(temp, locationName, time, condition,icon) {
    let [date, clock] = time.split(' ');
    let currentDay = getDayName(new Date(date).getDay());
    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${clock} - ${currentDay} ${date}`;
    conditionField.innerText = condition;
    iconField.src = icon;
}
function updateBackground(condition,isDay){
   const video = document.getElementById('bgVideo')
   const weather = condition.toLowerCase();
    let videoSrc = 'videos/default.mp4';
  if (weather.includes("sunny")) {
    videoSrc = isDay ? "videos/Sunny.mp4" : "videos/Night.mp4";
  } else if (weather.includes("rain")) {
    videoSrc = "videos/Rain.mp4";
  } else if (weather.includes("cloud")) {
    videoSrc = "videos/Cloud.mp4";
  } else if (weather.includes("mist") || weather.includes("fog")) {
    videoSrc = "videos/Mist.mp4";
  }
  const source = video.querySelector("source");
   if (!source.src.includes(videoSrc)) {
    source.src = videoSrc;
    video.load();
    video.play();
  }
}
function searchforLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();
    if (target) {
        fetchResult(target);
    }
}
function getDayName(number) {
    switch (number) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        default: return '';
    }
}


fetchResult(target);
