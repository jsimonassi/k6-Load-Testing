import http from 'k6/http';
import { DEFAULT_PARAMS, BASE_URL, API_V2 } from '../../config/constants.js';

const getActivity = (startDay, endDay) => {
    return http.get(BASE_URL + API_V2 + `exercises?start=${startDay}&end=${endDay}`, DEFAULT_PARAMS);
}

export default getActivity;