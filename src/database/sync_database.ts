import {getNetworkState} from '../common/capacitor_global';
import _ from 'underscore';
import {Connection} from '@awesome-cordova-plugins/network';
import {LoadOfflineData} from '../api/LoadOfflineData'
import {IResponseDataLoad_Combos} from '../model/loadOfflineData';

import database from '../database';

let ID_TIME_INTERVAL: any = void (0);

export default function syncDatabase() {

    /**
     *
     * @param timeInterval in minutes > 30
     */
    const start = (timeInterval?: number): void => {
            if (timeInterval) {
                _sync();

                const timeout = Math.min(timeInterval * 60, 30);
                ID_TIME_INTERVAL = setInterval(_sync, timeout);
                console.info("Run database sync every " + timeout + "minutes");
            } else {
                stop();
                _sync();
                console.info("Run database sync now");
            }
        },
        stop = () => {
            if (ID_TIME_INTERVAL)
                clearInterval(ID_TIME_INTERVAL);
        };

    const _sync = (): void => {
            const instance_loadOfflineData = new LoadOfflineData();

            if (_canSync()) {
                instance_loadOfflineData.loadAll_combos().then((data: any[]) => {
                    data.forEach((value: IResponseDataLoad_Combos) => {

                        if (!value.isFailedLoad)
                            insert_combos(value);

                    })
                })
            }
        },

        insert_combos =  (combos: IResponseDataLoad_Combos): void => {
            const {insertUpdate} = database();
            const tableName = `${combos.key}`.replace('/', '_').toLowerCase();

            _.each(combos.value, async (combo) => {
                const fields = _.keys(combo);
                const values = _.values(combo);
                const fieldsQty = fields.length;

                await insertUpdate(tableName, fieldsQty, values, fields);
            })

        },

        _canSync = (): boolean => {
            const valid_connection_state = [Connection.CELL, Connection.CELL_4G, Connection.CELL_3G, Connection.WIFI];
            return _.contains(valid_connection_state, getNetworkState());
        };

    return {
        start,
        stop
    }
}

