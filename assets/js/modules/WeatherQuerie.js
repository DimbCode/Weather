// Class Weather Querie

if (!localStorage.getItem("query-count")) {
    localStorage.setItem("query-count", 0);
}

export class WeatherQuerie {

    constructor ({ url, lat, lon }) {

        // System Props

        this._url = url;
        this._lat = lat;
        this._lon = lon;
        this._dataDate;
        this._dataCurrent;

    }

    // Methods

    generateFullURI(options) {
        let resultURI = this._url + "?";
        let entriesOptions = Object.entries(options);

        entriesOptions.forEach((item, index) => {
            const [key, value] = item;
            const valueArr = String(value).split(" ");

            if (valueArr.length > 1) {
                valueArr.forEach((currentValue, currentIndex) => {
                    if (index === 0 && currentIndex === 0) {
                        resultURI += `${key}=${currentValue}`;
                    }   else {
                        resultURI += `&${key}=${currentValue}`;
                    }
                });
            }   else {
                if (index === 0) {
                    resultURI += `${key}=${value}`;
                }   else {
                    resultURI += `&${key}=${value}`;
                }
            }
        });

        return resultURI;
    }

    async querie(options) {
        options.latitude = this._lat;
        options.longitude = this._lon;

        let response = await fetch(this.generateFullURI(options));
        let jsonResponse = await response.json();

        localStorage.setItem("query-count", +localStorage.getItem("query-count") + 1);
        console.log(localStorage.getItem("query-count"));

        return jsonResponse;
    }

    // Get Weather Components

    // Not Async Methods

    getWeatherIcon(code) {
        let resultIcon;
        let icons = {
            "ic-sun": [0, 1],
            "fa-solid fa-smog": [45, 48, 51, 53, 55],
            "fa-solid fa-cloud-meatball": [56, 57, 66, 67, 77, 85, 86],
            "fa-regular fa-snowflake": [71, 73, 75],
            "ic-cloud-sun": [2],
            "fa-solid fa-cloud": [3],
            "ic-cloud-rain": [61, 63, 65, 80, 81],
            "fa-solid fa-cloud-bolt": [95, 96, 99],
            "fa-solid fa-cloud-showers-water": [82],
        }

        for (let key in icons) {

            if ((icons[key]).includes(code)) {
                resultIcon = key;
            }

        }

        return resultIcon;
    }

    getWeatherName(code) {
        let resultStr;

        switch (code) {

            case 0:
                resultStr = "Чистое небо";
                break;

                case 1:
                resultStr = "Преимущественно ясно";
                break;

                case 2:
                resultStr = "Переменная облачность";
                break;

                case 3:
                resultStr = "Пасмурно";
                break;

                case 45:
                resultStr = "Туман";
                break;

                case 48:
                resultStr = "Отложение инейного тумана";
                break;

                case 51:
                resultStr = "Слабая морось";
                break;

                case 53:
                resultStr = "Умеренная морось";
                break;

                case 55:
                resultStr = "Плотная морось";
                break;

                case 56:
                resultStr = "Легкий ледяной дождь";
                break;

                case 57:
                resultStr = "Плотный ледяной дождь";
                break;

                case 61:
                resultStr = "Слабый дождь";
                break;

                case 63:
                resultStr = "Дождь";
                break;

                case 65:
                resultStr = "Сильный дождь";
                break;

                case 66:
                resultStr = "Легкий ледяной дождь";
                break;

                case 67:
                resultStr = "Плотный ледяной дождь";
                break;

                case 71:
                resultStr = "Слабый снегопад";
                break;

                case 73:
                resultStr = "Снегопад";
                break;

                case 75:
                resultStr = "Сильный снегопад";
                break;

                case 77:
                resultStr = "Снежные зерна";
                break;

                case 80:
                resultStr = "Слабый ливень";
                break;

                case 81:
                resultStr = "Ливень";
                break;

                case 82:
                resultStr = "Сильный ливень";
                break;

                case 85:
                resultStr = "Слабый снежный ливень";
                break;

                case 86:
                resultStr = "Сильный снежный ливень";
                break;

                case 95:
                resultStr = "Гроза";
                break;

                case 96:
                resultStr = "Гроза с градом";
                break;

                case 99:
                resultStr = "Гроза с градом";
                break;

        }

        return resultStr;
    }

    // Independent ( at time ) Methods

    async setDataDate(date) {
        try {
            let options = {
                hourly: "temperature_2m weather_code",
                start_date: date,
                end_date: date, 
            }
            let response = await this.querie(options);

            this._dataDate = response;
        }   catch {
            throw new Error("Ошибка ответа запроса");
        }
    }

    getWeatherCode() {
        let codes = this._dataDate.hourly.weather_code;

        codes = codes.map(item => {
            return [item, codes.filter((el) => el === item).length];
        });

        let maxValue = codes[0];

        codes.forEach(item => {
            let [, count] = item;
            let [, maxCount] = maxValue;

            if (maxCount < count) {
                maxValue = item;
            }
        });

        return maxValue[0];
    }

    getWeatherIconDate() {
        let code = this.getWeatherCode();

        return this.getWeatherIcon(code);
    }

    getWeatherTemp() {
        return this._dataDate.hourly.temperature_2m[14];
    }

    // Current Time Methods

    async setDataCurrent() {
        try {
            let options = {
                current: "temperature_2m weather_code precipitation relative_humidity_2m wind_speed_10m",
            }
            let response = await this.querie(options);

            this._dataCurrent = response;
        }   catch {
            throw new Error("Ошибка ответа запроса");
        }
    }

    getCurrentWeatherTemp() {
        return this._dataCurrent.current.temperature_2m;
    }

    getCurrentWeatherStatus() {
        return this.getWeatherName(this._dataCurrent.current.weather_code);
    }

    getCurrentWeatherIcon() {
        return this.getWeatherIcon(this._dataCurrent.current.weather_code);
    }

    getCurrentWeatherPrecipitation() {
        return this._dataCurrent.current.precipitation;
    }

    getCurrentWeatherHumadity() {
        return this._dataCurrent.current.relative_humidity_2m;
    }

    getCurrentWeatherWindSpeed() {
        return this._dataCurrent.current.wind_speed_10m;
    }

}

// let options = {
//     latitude: "44.06",
//     longitude: "39.05",
//     hourly: "weather_code",
//     start_date: "2024-01-04",
//     end_date: "2024-01-04",
// }