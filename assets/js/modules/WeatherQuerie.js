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

        return jsonResponse;
    }

    // Get Weather Components

    // Not Async Methods

    getWeatherIcon(code) {
        let resultIcon;
        let icons = {
            "ic-sun": [0, 1],
            "ic-cloud-sun": [2, 3, 45, 48, 51, 53, 55],
            "ic-cloud-rain": [56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99],
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
                resultStr = "Clear Cloud";
                break;

                case 1:
                resultStr = "Mainly clear";
                break;

                case 2:
                resultStr = "Partly cloudy";
                break;

                case 3:
                resultStr = "Overcast";
                break;

                case 45:
                resultStr = "Fog";
                break;

                case 48:
                resultStr = "Depositing rime fog";
                break;

                case 51:
                resultStr = "Drizzle: Light";
                break;

                case 53:
                resultStr = "Drizzle: Moderate";
                break;

                case 55:
                resultStr = "Drizzle: Light";
                break;

                case 56:
                resultStr = "Freezing Drizzle: Light";
                break;

                case 57:
                resultStr = "Freezing Drizzle: Dense";
                break;

                case 61:
                resultStr = "Rain: Slight";
                break;

                case 63:
                resultStr = "Rain: Moderate";
                break;

                case 65:
                resultStr = "Rain: Heavy";
                break;

                case 66:
                resultStr = "Freezing Rain: Light";
                break;

                case 67:
                resultStr = "Freezing Rain: Heavy";
                break;

                case 71:
                resultStr = "Snow fall: Slight";
                break;

                case 73:
                resultStr = "Snow fall: Moderate";
                break;

                case 75:
                resultStr = "Snow fall: Heavy";
                break;

                case 48:
                resultStr = "Depositing rime fog";
                break;

                case 77:
                resultStr = "Snow grains";
                break;

                case 80:
                resultStr = "Rain showers: Slight";
                break;

                case 81:
                resultStr = "Rain showers: Moderate";
                break;

                case 82:
                resultStr = "Rain showers: Violent";
                break;

                case 85:
                resultStr = "Snow showers: Slight";
                break;

                case 86:
                resultStr = "Snow showers: Heavy";
                break;

                case 95:
                resultStr = "Thunderstorm: Slight or Moderate";
                break;

                case 96:
                resultStr = "Thunderstorm with slight and heavy hail";
                break;

                case 99:
                resultStr = "Thunderstorm with slight and heavy hail";
                break;

        }

        return resultStr;
    }

    // Independent ( at time ) Methods

    async setDataDate(date) {
        let options = {
            hourly: "temperature_2m weather_code",
            start_date: date,
            end_date: date, 
        }
        let response = await this.querie(options);

        this._dataDate = response;
    }

    async getWeatherCode() {
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

    async getWeatherIconDate() {
        let code = await this.getWeatherCode();

        return this.getWeatherIcon(code);
    }

    async getWeatherTemp() {
        return this._dataDate.hourly.temperature_2m[14];
    }

    // Current Time Methods

    async setDataCurrent() {
        let options = {
            current: "temperature_2m weather_code precipitation relative_humidity_2m wind_speed_10m",
        }
        let response = await this.querie(options);

        this._dataCurrent = response;
    }

    async getCurrentWeatherTemp() {
        return this._dataCurrent.current.temperature_2m;
    }

    async getCurrentWeatherStatus() {
        return this.getWeatherName(this._dataCurrent.current.weather_code);
    }

    async getCurrentWeatherIcon() {
        return this.getWeatherIcon(this._dataCurrent.current.weather_code);
    }

    async getCurrentWeatherPrecipitation() {
        return this._dataCurrent.current.precipitation;
    }

    async getCurrentWeatherHumadity() {
        return this._dataCurrent.current.relative_humidity_2m;
    }

    async getCurrentWeatherWindSpeed() {
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