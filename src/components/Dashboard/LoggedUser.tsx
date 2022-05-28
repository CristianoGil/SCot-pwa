import { IonTitle, IonText } from '@ionic/react';
import './LoggedUser.scss';
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
import { dateFormat } from '../../utils/apex-formatters';


const LoggedUser: React.FC = () => {
    const userContext = useContext<any>(UserContext);
    const dateFormated = dateFormat(userContext.user.loggeDate, 'LLLL')


    var greetingMsgGenerator = (): string => {
        let hora = new Date().getHours();
        return (hora < 12) ? "Bom dia" : ((hora <= 18 && hora >= 12) ? "Boa tarde" : "Boa noite");

    }

    return (
        <div className="logged-user">
            <IonTitle color="dark" size="large"> {greetingMsgGenerator()}, {userContext.user.nomeUsuario || userContext.user.userName}</IonTitle>
            <IonText color="medium"> {dateFormated} </IonText>
        </div>
    );
};

export default LoggedUser;