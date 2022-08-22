import { group, sleep } from 'k6';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
import { ACTIVITY_DATA, HEART_RATE_DATA, PEDOMETER_DATA } from './config/mockedData.js';
import getActivity from './scenarios/activity/getActivity.js';
import postActivity from './scenarios/activity/postActivity.js';
import getHeartRate from './scenarios/heartRate/getHeartRate.js';
import postHeartRate from './scenarios/heartRate/postHeartRate.js';
import getPedometer from './scenarios/pedometer/getPedometer.js'
import postPedometer from './scenarios/pedometer/postPedometer.js';
import getSleep from './scenarios/sleep/getSleep.js';
import getWeather from './scenarios/weather/getWeather.js';
import { addRandomDate } from './util/helper.js';

export const errorRate = new Rate('errors');
export const longTime = new Rate('long_time');

// export const options = {
//     stages: [
//       { duration: '2m', target: 100 }, // below normal load
//       { duration: '5m', target: 100 },
//       { duration: '2m', target: 200 }, // normal load
//       { duration: '5m', target: 200 },
//       { duration: '2m', target: 300 }, // around the breaking point
//       { duration: '5m', target: 300 },
//       { duration: '2m', target: 400 }, // beyond the breaking point
//       { duration: '5m', target: 400 },
//       { duration: '10m', target: 0 }, // scale down. Recovery stage.
//     ],
//   };

export const options = {
    vus: 50, // 1 user looping for 1 minute
    duration: '1m'
};


export default () => {
    group('First Step -> Send data to service', () => {
        let responses = [];
        responses.push(postActivity(addRandomDate(ACTIVITY_DATA)));
        responses.push(postHeartRate({ "smart_watch_slug": HEART_RATE_DATA.smart_watch_slug, "heart_rate_monitor": addRandomDate(HEART_RATE_DATA.heart_rate_monitor) }));
        responses.push(postPedometer({ "smart_watch_slug": PEDOMETER_DATA.smart_watch_slug, "steps_monitor": addRandomDate(PEDOMETER_DATA.steps_monitor) }));

        responses.forEach(response => {

            if (response.status > 399) {
                console.log("Error: ", response.body);
            }

            check(response, {
                'status is 2xx, 3xx, 4xx': (r) => r.status < 499,
            }) || errorRate.add(1);

            check(response, {
                'waiting a long time': (r) => r.timings.duration < 5000,
            }) || longTime.add(1);
        })
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
