import {group , sleep} from 'k6';
import getDailyActivity from './scenarios/sync/activity/getDailyActivity.js';
import getWeather from './scenarios/sync/weather/getWeather.js';

export default () => {
    group('Sync - mfitsport.Api', () => {
        // getWeather();
        getDailyActivity();
    });

    sleep(1);
}
