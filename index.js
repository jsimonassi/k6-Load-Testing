// import { getHtml } from './scenarios/Get-Html';
import {group , sleep} from 'k6';
import http from 'k6/http';
import { Trend, Rate, Counter } from "k6/metrics";
import { check, fail } from "k6";


export default () => {
    group('Endpoint Get Policy - mfitsport.Api', () => {
        getUI();
    });

    sleep(1);
}



export let GetDuration = new Trend('get_duration');
export let GetFailRate = new Rate('get_fail_rate');
export let GetSuccessRate = new Rate('get_success_rate');
export let GetReqs = new Rate('get_reqs');

export function getUI () {
    let res = http.get('https://homolog-touchsmart.grupotechnos.com.br/api/v2/faqs?smart_watch_slug=touchsmart')
    
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
