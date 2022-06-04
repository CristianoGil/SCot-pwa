import { IonRow, IonCol, IonItem } from "@ionic/react";
import './CardListItem.scss';

interface Props {
    c1?: Coluna;
    c2?: Coluna;
    c3?: Coluna;
    c4?: Coluna;
}

interface Coluna {
    titulo?: string ;
    valor?: any;
    tamCol?: string
}

const CardListItem: React.FC<Props> = ({ c1, c2, c3, c4 }) => {

    return (
        <IonRow style={{ marginBottom: 20 }}>
            <IonCol sizeSm={(c1?.tamCol == undefined) ? '3' : c1?.tamCol} className={((c1?.titulo == undefined) && (c1?.valor == undefined)) ? 'ion-hide' : ''}>
                <IonItem lines='none'>
                    <div>
                        <small>{c1?.titulo}</small><br />
                        <strong>{c1 ? c1.valor : "N/A"}</strong>
                    </div>
                </IonItem>
            </IonCol>
            <IonCol sizeSm={(c2?.tamCol == undefined) ? '3' : c2?.tamCol} className={((c2?.titulo == undefined) && (c2?.valor == undefined)) ? 'ion-hide' : ''}>
                <IonItem lines='none'>
                    <div>
                        <small>{c2?.titulo}</small><br />
                        <strong>{c2 ? c2.valor : "N/A"}</strong>
                    </div>
                </IonItem>
            </IonCol>
            <IonCol sizeSm={(c3?.tamCol == undefined) ? '3' : c3?.tamCol} className={((c3?.titulo == undefined) && (c3?.valor == undefined)) ? 'ion-hide' : ''}>
                <IonItem lines='none'>
                    <div>
                        <small>{c3?.titulo}</small><br />
                        <strong>{c3 ? c3.valor : "N/A"}</strong>
                    </div>
                </IonItem>
            </IonCol>

            <IonCol sizeSm={(c4?.tamCol == undefined) ? '3' : c4?.tamCol} className={((c4?.titulo == undefined) && (c4?.valor == undefined)) ? 'ion-hide' : ''}>
                <IonItem lines='none'>
                    <div>
                        <small>{c4?.titulo}</small><br />
                        <strong>{c4 ? c4.valor : "N/A"}</strong>
                    </div>
                </IonItem>
            </IonCol>
        </IonRow>
    );
};

export default CardListItem;