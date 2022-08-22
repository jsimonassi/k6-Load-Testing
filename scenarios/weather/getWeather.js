import http from 'k6/http';
import { DEFAULT_PARAMS, BASE_URL, API_V3 } from '../../config/constants.js';

const getWeather = () => {

    const latitude = "-22.741769492093244";
    const longitude = "-41.874344759864385";

    return http.get(BASE_URL + API_V3 + `weather?lat=${latitude}&lon=${longitude}`, DEFAULT_PARAMS);
}

export default getWeather;