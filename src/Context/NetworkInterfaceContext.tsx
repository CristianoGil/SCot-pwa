import {useState, createContext, useContext} from 'react';

export const NetworkInterfaceContext = createContext<any | null>(null);

export const NetworkInterfaceProvider = (props: any) => {
    const [state, setState] = useState<string>(navigator.onLine ? 'online' : 'offline');


    const onOnline = () => {
        setState('online');
    }

    const onOffline = () => {
        setState('offline');
    }
    const stateNetwork = () => state;
    return (
        <NetworkInterfaceContext.Provider value={{
            onOnline: onOnline,
            onOffline: onOffline,
            stateNetwork: stateNetwork
        }}>
            {props.children}
        </NetworkInterfaceContext.Provider>
    );
}