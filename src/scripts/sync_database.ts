import {getNetworkState} from '../utils/capacitor_global';


let ID_TIME_INTERVAL: any = void (0);

export default function syncDatabase() {

    /**
     *
     * @param timeInterval in second
     */
    const start = (timeInterval?: number) => {
            if (timeInterval) {
                ID_TIME_INTERVAL = setInterval(_sync, timeInterval)
            } else {
                _sync()
            }
        },
        stop = () => {
            if (ID_TIME_INTERVAL)
                clearInterval(ID_TIME_INTERVAL);
        };

    const _sync = () => {
        console.log('getNetworkState: ', getNetworkState())
    }

    return {
        start,
        stop
    }
}

