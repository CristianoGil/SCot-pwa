import {useState, createContext, useContext} from 'react';
import AlertNetwork from '../components/AlertNetwork/AlertNetwork';

export const AlertNetworkOfflineContext = createContext<any | null>(null);

export const AlertNetworkOfflineProvider = (props: any) => {

    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return (
        <AlertNetworkOfflineContext.Provider value={{
            openModal: openModal,
            closeModal: closeModal
        }}>
            <AlertNetwork isOpen={open}/>
            {props.children}
        </AlertNetworkOfflineContext.Provider>
    );
}
