import http from 'k6/http';
import { DEFAULT_PARAMS, BASE_URL, API_V2 } from '../../config/constants.js';


const postActivity = (activity) => {
    return http.post(BASE_URL + API_V2 + `exercises`, JSON.stringify(activity), DEFAULT_PARAMS);
}

export default postActivity;