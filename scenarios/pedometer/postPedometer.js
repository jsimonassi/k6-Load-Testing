import http from 'k6/http';
import { DEFAULT_PARAMS, BASE_URL, API_V2 } from '../../config/constants.js';

const postPedometer = (pedometer) => {
    return http.post(BASE_URL + API_V2 + `steps_monitor`, JSON.stringify(pedometer), DEFAULT_PARAMS);
}

export default postPedometer;