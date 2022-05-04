import { IonTitle,  IonText} from '@ionic/react';
import './LoggedUser.scss';
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
import { dateFormat } from '../../utils/apex-formatters';


const LoggedUser: React.FC = () => {
    const userContext = useContext<any>(UserContext);
    const dateFormated = dateFormat(userContext.user.loggeDate, 'LLLL' )
    return (
        <div className="logged-user">
            <IonTitle color="dark" size="large"> {userContext.user.nomeUsuario || userContext.user.userName }</IonTitle>
            <IonText color="medium"> {dateFormated} </IonText>
        </div>
    );
};

export default LoggedUser;