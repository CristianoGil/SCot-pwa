import { Network, Connection } from '@awesome-cordova-plugins/network';

export function getNetworkState(): string {
    return Network.type
}