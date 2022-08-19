import {group , sleep} from 'k6';
import { ACTIVITY_DATA, HEART_RATE_DATA, PEDOMETER_DATA, SLEEP_DATA } from './config/mockedData.js';
import getActivity from './scenarios/activity/getActivity.js';
import postActivity from './scenarios/activity/postActivity.js';
import getHeartRate from './scenarios/heartRate/getHeartRate.js';
import postHeartRate from './scenarios/heartRate/postHeartRate.js';
import getPedometer from './scenarios/pedometer/getPedometer.js'
import postPedometer from './scenarios/pedometer/postPedometer.js';
import getSleep from './scenarios/sleep/getSleep.js';
import postSleep from './scenarios/sleep/postSleep.js';
import getWeather from './scenarios/weather/getWeather.js';
import { addRandomDate } from './util/helper.js';

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',
  
    thresholds: {
      http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
  };


export default () => {

    group('Sync - mfitsport.Api', () => {

        postSleep({  "smart_watch_slug": SLEEP_DATA.smart_watch_slug, "sleep_monitor": addRandomDate(SLEEP_DATA.sleep_monitor)});

        // First Step -> Send data to service

        // // Second Step -> Update watch Configs
        // getWeather();

        // // Third Step -> get Home today data
        // getActivity("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
        // getHeartRate("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
        // getPedometer("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
        // getSleep("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
    });

    sleep(1);
}


//k6 run loadTest-sync.js