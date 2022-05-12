import { Network } from '@awesome-cordova-plugins/network';
import { getPlatforms } from '@ionic/react';
import _ from 'underscore';

export function getNetworkState(): string {

    if (!_.contains(getPlatforms(), 'desktop')) {
        // @ts-ignore
        const connection:any = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return  connection.effectiveType;
    }

    return Network.type
}