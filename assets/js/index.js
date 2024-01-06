// Imports

import { CurrentInfo } from "./modules/CurrentInfo.js";
import { WeatherQuerie } from "./modules/WeatherQuerie.js";
import { ChangeLocation } from "./modules/ChangeLocation.js";
import { info, changeLocation as changeLocationVar } from "./modules/startValues.js";

const currentInfo = new CurrentInfo(info);
const changeLocation = new ChangeLocation({ ...changeLocationVar, currentInfo: currentInfo });

currentInfo.setWeather();