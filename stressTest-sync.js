import {group , sleep} from 'k6';
import { ACTIVITY_DATA } from './config/mockedData.js';
import getActivity from './scenarios/activity/getActivity.js';
import getHeartRate from './scenarios/heartRate/getHeartRate.js';
import postHeartRate from './scenarios/heartRate/postHeartRate.js';
import getPedometer from './scenarios/pedometer/getPedometer.js'
import postPedometer from './scenarios/pedometer/postPedometer.js';
import getSleep from './scenarios/sleep/getSleep.js';
import getWeather from './scenarios/weather/getWeather.js';
import { addRandomDate } from './util/helper.js';

export const options = {
    stages: [
      { duration: '2m', target: 100 }, // below normal load
      { duration: '5m', target: 100 },
      { duration: '2m', target: 200 }, // normal load
      { duration: '5m', target: 200 },
      { duration: '2m', target: 300 }, // around the breaking point
      { duration: '5m', target: 300 },
      { duration: '2m', target: 400 }, // beyond the breaking point
      { duration: '5m', target: 400 },
      { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ],
  };


export default () => {
    group('First Step -> Send data to service', () => {
        postActivity(addRandomDate(ACTIVITY_DATA));
        postHeartRate({  "smart_watch_slug": HEART_RATE_DATA.smart_watch_slug, "heart_rate_monitor": addRandomDate(HEART_RATE_DATA.heart_rate_monitor)});
        postPedometer({  "smart_watch_slug": PEDOMETER_DATA.smart_watch_slug, "steps_monitor": addRandomDate(PEDOMETER_DATA.steps_monitor)});
        
    });

    group('Second Step -> Update watch Configs', () => {
        getWeather();
    });

    group('Third Step -> get Home today data', () => {
        getActivity("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
        getHeartRate("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
        getPedometer("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
        getSleep("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z");
    });

    sleep(1);
}


//k6 run stressTest-sync.js