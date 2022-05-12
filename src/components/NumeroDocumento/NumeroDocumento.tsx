import { IonRow, IonCol, IonCard, IonCardContent, IonGrid, IonItem, IonLabel, IonInput } from "@ionic/react";

const NumeroDocumento: React.FC = () => {

    return (

        <IonCardContent>
            <IonGrid>
                <IonRow>

                    <IonCol size-sm='12' size-md='10' size-lg='12'>
                        <p style={{ color: 'red' }}>Apenas deverá preencher este número caso não tenha sido possível imprimir o documento e o tenha registado manualmente em pré-impresso(Não será gerado o respectivo expediente).</p>
                    </IonCol>

                </IonRow>
                <IonRow>

                    <IonCol size-sm='12' size-md='10' size-lg='4'>

                        <IonItem>
                            <IonLabel position="floating" itemType="text" placeholder="Número de Documento">Número de Documento</IonLabel>
                            <IonInput></IonInput>
                        </IonItem>

                    </IonCol>

                </IonRow>
            </IonGrid>
        </IonCardContent>

    );
};

export default NumeroDocumento;