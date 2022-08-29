import http from 'k6/http';
import { DEFAULT_PARAMS, BASE_URL, API_V2, AVAILABLE_SLUGS } from '../../config/constants.js';

const getWatchSettings = () => {

    return http.get(BASE_URL + API_V2 + `watch_settings?smart_watch_slug=${AVAILABLE_SLUGS.MORMAII_LIFE}`, DEFAULT_PARAMS);
}

export default getWatchSettings;