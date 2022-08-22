import http from 'k6/http';
import { DEFAULT_PARAMS, BASE_URL, API_V2 } from '../../config/constants.js';

const postSleep = (sleepData) => {
    return http.post(BASE_URL + API_V2 + `sleep_monitor`, JSON.stringify(sleepData), DEFAULT_PARAMS);
}

export default postSleep;