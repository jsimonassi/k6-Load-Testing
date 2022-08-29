import http from 'k6/http';
import { DEFAULT_PARAMS, BASE_URL, API_V2 } from '../../config/constants.js';

const postHeartRate = (heartRate) => {
    return http.post(BASE_URL + API_V2 + `heart_rate_monitor`, JSON.stringify(heartRate), DEFAULT_PARAMS);
}

export default postHeartRate;