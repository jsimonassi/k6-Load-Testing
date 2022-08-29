import http from 'k6/http';
import { DEFAULT_PARAMS, BASE_URL, API_V2, AVAILABLE_SLUGS } from '../../config/constants.js';

const getNewNotifications = () => {

    return http.get(BASE_URL + API_V2 + `central_notifications/get_new_notifications?operating_system=0`, DEFAULT_PARAMS);
}

export default getNewNotifications;