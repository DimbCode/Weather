// Class CityTranslate

export class CityTranslate {

    constructor ({ url, apiKey }) {

        // System Props

        this._url = url;
        this._apiKey = apiKey;
    }

    // Methods

    async query({ lat, lon }) {
        let response = await fetch(this._url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + this._apiKey,
            },
            body: JSON.stringify({
                lat: lat,
                lon: lon,
            }),
        });

        let jsonResponse = await response.json();
        localStorage.setItem("query-count", +localStorage.getItem("query-count") + 1);
        let [area, city] = (jsonResponse.suggestions[0].value).split(", ");

        return `${area}, ${city}`;
    }

}