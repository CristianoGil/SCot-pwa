import {getNetworkState} from '../utils/capacitor_global';
import _ from 'underscore';
import {Connection} from '@awesome-cordova-plugins/network';
import {LoadOfflineData} from '../api/LoadOfflineData'

let ID_TIME_INTERVAL: any = void (0);

export default function syncDatabase() {

    /**
     *
     * @param timeInterval in minutes
     */
    const start = (timeInterval?: number): void => {
            if (timeInterval) {
                _sync();

                const timeout = timeInterval * 60;
                ID_TIME_INTERVAL = setInterval(_sync, timeout);
                console.info("Run database sync every " + timeout + "minutes")
            } else {
                stop();
                _sync();
            }
        },
        stop = () => {
            if (ID_TIME_INTERVAL)
                clearInterval(ID_TIME_INTERVAL);
        };

    const _sync = (): void => {
        const instance_loadOfflineData = new LoadOfflineData()
        if (_canSync()) {

        }
    }

    const _canSync = (): boolean => {
        const valid_connection_state = [Connection.CELL, Connection.CELL_4G, Connection.CELL_3G, Connection.WIFI];
        return _.contains(valid_connection_state, getNetworkState());
    }

    return {
        start,
        stop
    }
}

