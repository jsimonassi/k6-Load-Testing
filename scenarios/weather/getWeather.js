import { sleep } from 'k6';
import http from 'k6/http';
import { Trend, Rate, Counter } from "k6/metrics";
import { check, fail } from "k6";
import { DEFAULT_PARAMS, BASE_URL, API_V3, TEST_PARAMS } from '../../config/constants.js';

export let getDuration = new Trend('get_duration');
export let getFailRate = new Rate('get_fail_rate');
export let getSuccessRate = new Rate('get_success_rate');
export let getReqs = new Rate('get_reqs');

const getWeather = () => {

    const latitude = "-22.741769492093244";
    const longitude = "-41.874344759864385";

    let res = http.get(BASE_URL + API_V3 + `weather?lat=${latitude}&lon=${longitude}`, DEFAULT_PARAMS);
    
    getDuration.add(res.timings.duration);
    getReqs.add(1);
    getFailRate.add(res.status == 0 || res.status > 399);
    getSuccessRate.add(res.status < 399);

    let durationMsg = 'Max Duration ${1000/1000}s'
    if(!check(res, {
        'max duration': (r) => r.timings.duration < TEST_PARAMS.DURATION_LIMITS,
    })){
        fail(durationMsg);
    }
    
    sleep(1);
}

export default getWeather;