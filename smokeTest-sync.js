import {check, group , sleep} from 'k6';
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
    vus: 1000, // 1 user looping for 1 minute
    duration: '1m'
  };


export default () => {

  group('test', function () {
    const res = getWeather();
    check(res, {
      'is status < 400': (r) => r.status < 400,
    });
  });

}


//k6 run loadTest-sync.js