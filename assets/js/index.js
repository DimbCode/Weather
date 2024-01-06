// Imports

import { CurrentInfo } from "./modules/CurrentInfo.js";
import { WeatherQuerie } from "./modules/WeatherQuerie.js";
import { ChangeLocation } from "./modules/ChangeLocation.js";

async function showResult(promise) {

    let result = await promise;
    console.log(result);

}

const elements = {
    days: ".details-weather__content-wrapper",
    day: ".current-weather__week-day",
    date: ".current-weather__date",
    place: ".current-weather__address",
    icon: ".current-weather__icon",
    temperature: ".current-weather__temperature",
    status: ".current-weather__status",
    precipitation: ".details-weather__list-item-value_precipitation",
    humidity: ".details-weather__list-item-value_humidity",
    wind: ".details-weather__list-item-value_wind",
    container: ".weather__container",
}

const currentInfo = new CurrentInfo({
    elements,
    cityLat: 44.1053,
    cityLon: 39.0802,
    openClass: "weather__container_open",
});

const changeLocation = new ChangeLocation({
    parentElement: ".details-weather__footer-wrapper",
    openClass: "details-weather__footer-wrapper_open",
    currentInfo: currentInfo,
});

currentInfo.setWeather();

console.log(localStorage.getItem("query-count"));