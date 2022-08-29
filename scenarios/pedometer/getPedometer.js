import http from 'k6/http';
import { DEFAULT_PARAMS, BASE_URL, API_V2, AVAILABLE_SLUGS } from '../../config/constants.js';

const getPedometer = (startDay, endDay) => {
    return http.get(BASE_URL + API_V2 + `steps_monitor?start=${startDay}&end=${endDay}&smart_watch_slug=${AVAILABLE_SLUGS.MORMAII_LIFE}`, DEFAULT_PARAMS);
}

export default getPedometer;