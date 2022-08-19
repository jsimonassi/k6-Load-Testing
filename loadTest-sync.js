import {group , sleep} from 'k6';
import getActivity from './scenarios/activity/getActivity.js';
import getHeartRate from './scenarios/heartRate/getHeartRate.js';
import getPedometer from './scenarios/pedometer/getPedometer.js'
import getSleep from './scenarios/sleep/getSleep.js';
import getWeather from './scenarios/weather/getWeather.js';

export const options = {
    stages: [
      { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
      { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
      { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
      'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
  };


export default () => {
    group('Sync - mfitsport.Api', () => {

        // First Step -> Send data to service

        // Second Step -> Update watch Configs
        getWeather();

        // Third Step -> get Home today data
        getActivity("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
        getHeartRate("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
        getPedometer("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
        getSleep("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
    });

    sleep(1);
}


//k6 run loadTest-sync.js