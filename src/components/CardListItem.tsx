import { IonRow, IonCol, IonItem } from "@ionic/react";

interface Props {
    c1?: Coluna;
    c2?: Coluna;
    c3?: Coluna;
    c4?: Coluna;
}

interface Coluna {
    titulo?: string;
    valor?: string;
    tamCol?: string
}

const CardListItem: React.FC<Props> = ({ c1, c2, c3, c4 }) => {

    return (
        <IonRow style={{ marginBottom: 14 }}>
            <IonCol sizeSm={(c1?.tamCol == undefined) ? '3' : c1?.tamCol}>
                <IonItem lines='none'>
                    <div>
                        <small>{c1?.titulo}</small><br />
                        <strong>{c1?.valor}</strong>
                    </div>
                </IonItem>
            </IonCol>
            <IonCol sizeSm={(c2?.tamCol == undefined) ? '3' : c2?.tamCol}>
                <IonItem lines='none'>
                    <div>
                        <small>{c2?.titulo}</small><br />
                        <strong>{c2?.valor}</strong>
                    </div>
                </IonItem>
            </IonCol>
            <IonCol sizeSm={(c3?.tamCol == undefined) ? '3' : c3?.tamCol}>
                <IonItem lines='none'>
                    <div>
                        <small>{c3?.titulo}</small><br />
                        <strong>{c3?.valor}</strong>
                    </div>
                </IonItem>
            </IonCol>

            <IonCol sizeSm={(c4?.tamCol == undefined) ? '3' : c4?.tamCol}>
                <IonItem lines='none'>
                    <div>
                        <small>{c4?.titulo}</small><br />
                        <strong>{c4?.valor}</strong>
                    </div>
                </IonItem>
            </IonCol>
        </IonRow>
    );
};

export default CardListItem;