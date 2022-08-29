import { group, sleep } from 'k6';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
import { ACTIVITY_DATA, HEART_RATE_DATA, PEDOMETER_DATA, SLEEP_DATA } from './config/mockedData.js';
import getActivity from './scenarios/activity/getActivity.js';
import postActivity from './scenarios/activity/postActivity.js';
import getHeartRate from './scenarios/heartRate/getHeartRate.js';
import postHeartRate from './scenarios/heartRate/postHeartRate.js';
import getNewNotifications from './scenarios/notifications/index.js';
import getPedometer from './scenarios/pedometer/getPedometer.js'
import postPedometer from './scenarios/pedometer/postPedometer.js';
import getSleep from './scenarios/sleep/getSleep.js';
import postSleep from './scenarios/sleep/postSleep.js';
import getWatchSettings from './scenarios/watchSettings/index.js';
import getWeather from './scenarios/weather/getWeather.js';
import { addRandomDate } from './util/helper.js';

export const errorRateStepOne = new Rate('errorsStepOne');
export const lessThanFiveSec_StepOne = new Rate('lessThanFiveSec_StepOne');
export const betweenFriveAndTen_StepOne = new Rate('betweenFriveAndTen_StepOne');
export const greatherThanTen_StepOne = new Rate('greatherThanTen_StepOne');

export const errorRateStepTwo = new Rate('errorsStepTwo');
export const lessThanFiveSec_StepTwo = new Rate('lessThanFiveSec_StepTwo');
export const betweenFriveAndTen_StepTwo = new Rate('betweenFriveAndTen_StepTwo');
export const greatherThanTen_StepTwo = new Rate('greatherThanTen_StepTwo');

export const errorRateStepThree = new Rate('errorsStepThree');
export const lessThanFiveSec_StepThree = new Rate('lessThanFiveSec_StepThree');
export const betweenFriveAndTen_StepThree = new Rate('betweenFriveAndTen_StepThree');
export const greatherThanTen_StepThree = new Rate('greatherThanTen_StepThree');

export const errosToIgnore = new Rate('errosToIgnore');

// export const options = {
//     stages: [
//       { duration: '5m', target: 645 },
//       { duration: '2m', target: 645 }, 
//       { duration: '5m', target: 750 },
//       { duration: '5m', target: 600 },
//       { duration: '2m', target: 600 }
//     ],
//   };

  export const options = {
    stages: [
      { duration: '2m', target: 400 }, 
      { duration: '3h56m', target: 400 },
      { duration: '2m', target: 0 },
    ],
  };

// export const options = {
//     vus: 625,
//     duration: '1m'
// };


export default () => {
    group('First Step -> Send data to service', () => {
        let responses = [];
        responses.push(postActivity(addRandomDate(ACTIVITY_DATA)));
        responses.push(postHeartRate({ "smart_watch_slug": HEART_RATE_DATA.smart_watch_slug, "heart_rate_monitor": addRandomDate(HEART_RATE_DATA.heart_rate_monitor) }));
        responses.push(postPedometer({ "smart_watch_slug": PEDOMETER_DATA.smart_watch_slug, "steps_monitor": addRandomDate(PEDOMETER_DATA.steps_monitor) }));
        responses.push(postSleep({ "smart_watch_slug": SLEEP_DATA.smart_watch_slug, "sleep_monitor": addRandomDate(SLEEP_DATA.sleep_monitor) }))

        responses.forEach(response => {

            if (response.status > 399) {
                console.log("Error - stepOne: ", response.body, response.status);
            }

            check(response, {
                'status is 2xx, 3xx, 4xx StepOne': (r) => r.status < 499,
            }) || errorRateStepOne.add(1);

            check(response, {
                ' < 5000 StepOne': (r) => (r.timings.duration < 5000),
            }) || lessThanFiveSec_StepOne.add(1);

            check(response, {
                ' > 5000 && < 1000 StepOne': (r) => (r.timings.duration > 5000 && r.timings.duration < 10000),
            }) || betweenFriveAndTen_StepOne.add(1);

            check(response, {
                ' > 10000 StepOne': (r) => (r.timings.duration > 10000),
            }) || greatherThanTen_StepOne.add(1);

            check(response, {
                'ignored': (r) => r.status == 409,
            }) || errosToIgnore.add(1);
        })
    });

    group('Second Step -> Update watch Configs', () => {
        let responses = [];

        responses.push(getWeather());
        responses.push(getWatchSettings());
        responses.push(getNewNotifications());

        responses.forEach(response => {

            if (response.status > 399) {
                console.log("Error - stepTwo: ", response.body, response.status);
            }

            check(response, {
                'status is 2xx, 3xx, 4xx StepTwo': (r) => r.status < 499,
            }) || errorRateStepTwo.add(1);

            check(response, {
                ' < 5000 StepTwo': (r) => (r.timings.duration < 5000), 
            }) || lessThanFiveSec_StepTwo.add(1);

            check(response, {
                ' > 5000 && < 1000 StepTwo': (r) => (r.timings.duration > 5000 && r.timings.duration < 10000), 
            }) || betweenFriveAndTen_StepTwo.add(1);

            check(response, {
                ' > 10000 StepTwo': (r) => (r.timings.duration > 10000),
            }) || greatherThanTen_StepTwo.add(1);

            check(response, {
                'ignore': (r) => r.status == 409,
            }) || errosToIgnore.add(1);
        })
    });

    group('Third Step -> get Home today data', () => {
        let responses = [];

        responses.push(getActivity("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z"));
        responses.push(getHeartRate("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z"));
        responses.push(getPedometer("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z"));
        responses.push(getSleep("2022-08-18T03:00:00.000Z", "2022-08-19T03:00:00.000Z"));

        responses.forEach(response => {

            if (response.status > 399) {
                console.log("Error - stepThree: ", response.body, response.status);
            }

            check(response, {
                'status is 2xx, 3xx, 4xx StepThree': (r) => r.status < 499,
            }) || errorRateStepThree.add(1);

            check(response, {
                ' < 5000 StepThree': (r) => (r.timings.duration < 5000),
            }) || lessThanFiveSec_StepThree.add(1);

            check(response, {
                ' > 5000 && < 1000 StepThree': (r) => (r.timings.duration > 5000 && r.timings.duration < 10000), 
            }) || betweenFriveAndTen_StepThree.add(1);

            check(response, {
                ' > 10000 StepThree': (r) => (r.timings.duration > 10000), 
            }) || greatherThanTen_StepThree.add(1);

            check(response, {
                'ignore': (r) => r.status == 409,
            }) || errosToIgnore.add(1);
        })

    });

    sleep(1);
}

