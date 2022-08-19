import {group , sleep} from 'k6';
import getActivity from './scenarios/activity/getActivity.js';
import getHeartRate from './scenarios/heartRate/getHeartRate.js';
import getPedometer from './scenarios/pedometer/getPedometer.js'
import getSleep from './scenarios/sleep/getSleep.js';
import getWeather from './scenarios/weather/getWeather.js';

export const options = {
    stages: [
      { duration: '2m', target: 400 }, // ramp up to 400 users
      { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
      { duration: '2m', target: 0 }, // scale down. (optional)
    ],
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