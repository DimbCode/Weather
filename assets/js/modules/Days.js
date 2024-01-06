// Imports

import { Day } from "./Day.js";

// Class Days

export class Days {

    constructor ({ parentElement, limit, weather }) {

        // System Props

        this._limit = limit;

        // Independent Objects

        this._weather = weather;

        // Composion Objects

        this._days = [];
        this._currentDay = new Date();

        // Class Elements

        this._parentElement = document.querySelector(parentElement);

    }

    // Setters And Getters

    set weather(weather) {
        this._weather = weather;
    }

    // Methods

    // Async Methods

    async daysOutput() {
        this.clear();
        
        for (let i = 0; i < this._limit; i++) {
            let date = new Date();

            date.setDate(this._currentDay.getDate() + i);

            let weekday = this.getDay(date);
            let formatedDate = `${date.getFullYear()}-${date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;

            await this._weather.setDataDate(formatedDate);

            let icon = await this._weather.getWeatherIconDate();
            let temperature = await this._weather.getWeatherTemp();
            
            let day = new Day({ date: weekday, icon: icon, temperature: temperature });

            this._days.push(day);
        }
    }

    // Not Async ( Output ) Methods

    clear() {
        this._parentElement.innerHTML = "";
        this._days = [];
    }

    async output() {
        this.clear();

        await this.daysOutput();

        this._days.forEach(day => {
            day.show(this._parentElement);
        });
    }

    getDay(date) {
        let trueDate = date.getDay();
        let textDate;

        switch (trueDate) {

            case 1:
                textDate = "Monday";
                break;

                case 2:
                textDate = "Tuesday";
                break;

                case 3:
                textDate = "Wednesday";
                break;

                case 4:
                textDate = "Thursday";
                break;

                case 5:
                textDate = "Friday";
                break;

                case 6:
                textDate = "Saturday";
                break;

                case 0:
                textDate = "Sunday";
                break;

        }

        return textDate;
    }

}