import { sleep } from 'k6';
import http from 'k6/http';
import { Trend, Rate, Counter } from "k6/metrics";
import { check, fail } from "k6";
import { DEFAULT_PARAMS, BASE_URL, API_V3 } from '../../../config/constants.js';

export let GetDuration = new Trend('get_duration');
export let GetFailRate = new Rate('get_fail_rate');
export let GetSuccessRate = new Rate('get_success_rate');
export let GetReqs = new Rate('get_reqs');

const getWeather = () => {

    const latitude = "-22.741769492093244";
    const longitude = "-41.874344759864385";

    let res = http.get(BASE_URL + API_V3 + `weather?lat=${latitude}&lon=${longitude}`, DEFAULT_PARAMS);
    
    GetDuration.add(res.timings.duration);
    GetReqs.add(1);
    GetFailRate.add(res.status == 0 || res.status > 399);
    GetSuccessRate.add(res.status < 399);

    let durationMsg = 'Max Duration ${1000/1000}s'
    if(!check(res, {
        'max duration': (r) => r.timings.duration < 1000,
    })){
        fail(durationMsg);
    }
    
    sleep(1);
}

export default getWeather;