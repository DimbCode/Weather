// async function fetchApi() {

//     let responses = await fetch("https://api.open-meteo.com/v1/forecast?latitude=44.06&longitude=39.05&hourly=weather_code&start_date=2024-01-04&end_date=2024-01-04");
//     let response = await responses.json();

//     response = response.hourly.weather_code;

//     console.log(response);

// }

// fetchApi();

// class WeatherQuery {

//     constructor({ uri }) {
        
//         // System Props

//         this._uri = uri;

//         // Class Elements

//         // this._resElem = document.querySelector(resultElement);

//     }

//     generateFullURI(options) {

//         let resultURI = this._uri + "?";
//         let optionsEntries = Object.entries(options);

//         optionsEntries.forEach((item, index) => {    
//             let [key, value] = item;

//             if (index === 0) {
//                 resultURI += `${key}=${value}`;
//             }   else {
//                 resultURI += `&${key}=${value}`;
//             }
//         });

//         return resultURI;

//     }

//     async query(options) {

//         let response = await fetch(this.generateFullURI(options));
//         let jsonResponse = await response.json();

//         return jsonResponse.hourly;

//     }

// }

// const weather = new WeatherQuery({ uri: "https://api.open-meteo.com/v1/forecast" });

// async function showResult(promise) {

//     let result = await promise;
//     console.log(result);

// }

// let options = {
//     latitude: "44.06",
//     longitude: "39.05",
//     hourly: "weather_code",
//     start_date: "2024-01-04",
//     end_date: "2024-01-04",
// }

// showResult(weather.query(options));