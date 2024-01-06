// Start Values

export const elements = {
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

export const info = {
    elements,
    cityLat: 55.7522,
    cityLon: 37.6156,
    openClass: "weather__container_open",
}

export const changeLocation = {
    parentElement: ".details-weather__footer-wrapper",
    openClass: "details-weather__footer-wrapper_open",
}