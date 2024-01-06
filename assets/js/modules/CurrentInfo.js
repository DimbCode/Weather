// Imports

import { CityTranslate } from "./CityTranslate.js";
import { WeatherQuerie } from "./WeatherQuerie.js";
import { Days } from "./Days.js";

// Class Current Info

export class CurrentInfo {

    constructor ({ elements, cityLat, cityLon, openClass }) {

        // Independent Objects

        this._weather = new WeatherQuerie({
            url: "https://api.open-meteo.com/v1/forecast",
            lat: cityLat,
            lon: cityLon,
        });
        this._cityTranslate = new CityTranslate({
            url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address",
            apiKey: "50f2f086aed4a5659d0662d14e91cff50810be20",
        });

        // Composion Object

        this._daysElement = elements.days;

        this._days = new Days({
            parentElement: this._daysElement,
            limit: 4,
            weather: this._weather,
        });

        // System Props

        this._lat = cityLat;
        this._lon = cityLon;
        this._city;
        this._currentDate = new Date();
        this._isReady = true;
        this._openClass = openClass;

        // Class Elements

        this._container = document.querySelector(elements.container);
        this._dayElement = elements.day;
        this._dateElement = elements.date;
        this._placeElement = elements.place;
        this._iconElement = elements.icon;
        this._temperatureElement = elements.temperature;
        this._statusElement = elements.status;
        this._precipitationElement = elements.precipitation;
        this._humidityElement = elements.humidity;
        this._windElement = elements.wind;
        this._openBtn = this._container.querySelector("*[data-role=open-btn]");
        this._skipBtn = this._container.querySelector("*[data-role=skip-btn]");
        this._loadings = this._container.querySelectorAll("*[data-role=loading]");

        // Start Settings

        this.addEvents();

    }

    // Methods

    // Async ( Querie ) Methods

    async setCity() {
        let city = await this._cityTranslate.query({
            lat: this._lat,
            lon: this._lon,
        });

        this._city = city;

        return this._city;
    }

    async setWeather(cityLat, cityLon) {
        if (!(cityLat && cityLon)) {
            cityLat = this._lat;
            cityLon = this._lon;
        }

        if (this._isReady) {
            this._lat = cityLat;
            this._lon = cityLon;
            
            await this.setCity();

            this._weather = new WeatherQuerie({
                url: "https://api.open-meteo.com/v1/forecast",
                lat: cityLat,
                lon: cityLon,
            });

            await this.setElementsValues();
        }   else {
            setTimeout(() => {
                this.setWeather(cityLat, cityLon);
                console.log("Операция сброшена, функция уже выполняется.")
            }, 500);
        }
    }

    async setElementsValues() {

        // Loading Start

        this._isReady = false;
        this.loadingStart();

        await this._weather.setDataCurrent();

        const formatedDate = `${this._currentDate.getDate()} ${this.getMonth(this._currentDate)} ${this._currentDate.getFullYear()}`;
        const iconClasses = `current-weather__icon ${await this._weather.getCurrentWeatherIcon()}`;

        this.elementOutput(this._dayElement, this.getDay(this._currentDate));
        this.elementOutput(this._dateElement, formatedDate);
        this.elementOutput(this._placeElement, await this.setCity());
        this.elementOutput(this._temperatureElement, `${await this._weather.getCurrentWeatherTemp()} °C`);
        this.elementOutput(this._statusElement, await this._weather.getCurrentWeatherStatus());
        this.elementOutput(this._precipitationElement, `${await this._weather.getCurrentWeatherPrecipitation()}%`);
        this.elementOutput(this._humidityElement, `${await this._weather.getCurrentWeatherHumadity()}%`);
        this.elementOutput(this._windElement, `${await this._weather.getCurrentWeatherWindSpeed()} km/h`);

        document.querySelector(this._iconElement).className = iconClasses;

        this._days.weather = this._weather;
        
        await this._days.output();

        // Loading End

        this.loadingEnd();
        this._isReady = true;
        
    }

    // Not Async ( Output ) Methods

    elementOutput(element, value) {
        document.querySelector(element).textContent = value;
    }

    getDay(date) {
        let trueDate = date.getDay();
        let textDate;

        switch (trueDate) {

            case 1:
                textDate = "Понедельник";
                break;

                case 2:
                textDate = "Вторник";
                break;

                case 3:
                textDate = "Среда";
                break;

                case 4:
                textDate = "Четверг";
                break;

                case 5:
                textDate = "Пятница";
                break;

                case 6:
                textDate = "Суббота";
                break;

                case 0:
                textDate = "Воскресенье";
                break;

        }

        return textDate;
    }

    getMonth(date) {
        let monthNum = date.getMonth();
        let resultMonth;

        switch (monthNum) {

            case 0:
                resultMonth = "Январь";
                break;

                case 1:
                resultMonth = "Февраль";
                break;

                case 2:
                resultMonth = "Март";
                break;

                case 3:
                resultMonth = "Апрель";
                break;

                case 4:
                resultMonth = "Май";
                break;

                case 5:
                resultMonth = "Июнь";
                break;

                case 6:
                resultMonth = "Июль";
                break;

                case 7:
                resultMonth = "Август";
                break;

                case 8:
                resultMonth = "Сентябрь";
                break;

                case 9:
                resultMonth = "Октябрь";
                break;

                case 10:
                resultMonth = "Ноябрь";
                break;

                case 11:
                resultMonth = "Декабрь";
                break;

        }

        return resultMonth;
    }

    // Events Methods

    loadingStart() {
        this._loadings.forEach(loader => {
            loader.classList.remove("loading_hidden");
        });
    }

    loadingEnd() {
        this._loadings.forEach(loader => {
            loader.classList.add("loading_hidden");
        });
    }

    openSearch() {
        this._container.classList.add(this._openClass);
    }

    hiddenSearch() {
        this._container.classList.remove(this._openClass);
    }

    addEvents() {
        this._openBtn.addEventListener("click", () => {
            this.openSearch();
        });

        this._skipBtn.addEventListener("click", () => {
            this.hiddenSearch();
        });
    }

}