import {IonContent, IonPage, IonTitle, getPlatforms, IonText} from '@ionic/react';
import './LoggedUser.scss';
import Menu from '../../components/Menu';
import _ from 'underscore';

const LoggedUser: React.FC = () => {

    return (
        <div className="logged-user">
            <IonTitle color="dark" size="large">Boa tarde, Alberto Nunes</IonTitle>
            <IonText color="medium"> Quinta feira, 26 de janeiro de 2022 </IonText>
        </div>
    );
};

export default LoggedUser;