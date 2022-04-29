import {
    IonContent,
    IonPage,
    IonTitle,
    getPlatforms,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonImg
} from '@ionic/react';

import './Dashboard.scss';
import Menu from '../../components/Menu';
import _ from 'underscore';

import LoggedUser from '../../components/Dashboard/logged-user';

const Dashboard: React.FC = () => {

    return (
        <IonPage>

            <Menu/>

            <IonContent
                class={"content-dashboard "}
                scrollEvents={true}
                fullscreen={true}>
                <IonGrid className="dashboard-grid">
                    <IonRow class="ion-justify-content-start dashboard-grid-row">
                        <IonCol> <LoggedUser/></IonCol>
                    </IonRow>

                    <IonRow class="ion-justify-content-start dashboard-grid-row dashboard-grid-row-card ">
                        <IonCol size-xs="12" size-sm="6" size-md="5" size-lg="4" size-xl="4">
                            <IonCard className="card-dashboard card-big-img-background-1" color="primary">
                                <span className="background-blur"></span>
                                <IonImg className="card-fixed-icon-top-left"
                                        src={"assets/images/dashboard/card-icon-1.png"}> </IonImg>

                                <IonImg className="card-fixed-img-bottom-right"
                                        src={"assets/images/background/ref-logo-yellow.png"}> </IonImg>

                                <IonCardTitle className="card-dashboard-title">Card Title</IonCardTitle>
                            </IonCard>

                        </IonCol>

                        <IonCol size-xs="12" size-sm="6" size-md="5" size-lg="4" size-xl="4">
                            <IonCard className="card-dashboard card-big-img-background-2" color="primary">
                                <span className="background-blur"></span>

                                <IonImg className="card-fixed-icon-top-left"
                                        src={"assets/images/dashboard/card-icon-1.png"}> </IonImg>

                                <IonImg className="card-fixed-img-bottom-right"
                                        src={"assets/images/background/ref-logo-yellow.png"}> </IonImg>

                                <IonCardTitle className="card-dashboard-title">Card Title</IonCardTitle>
                            </IonCard>

                        </IonCol>

                        <IonCol size-xs="12" size-sm="6" size-md="3" size-lg="3" size-xl="3">
                            <IonCard className="card-dashboard" color="primary">

                                <IonImg className="card-fixed-icon-top-left"
                                        src={"assets/images/dashboard/card-icon-1.png"}> </IonImg>

                                <IonCardTitle className="card-dashboard-title">Card Title</IonCardTitle>
                            </IonCard>

                        </IonCol>

                        <IonCol size-xs="12" size-sm="6" size-md="4" size-lg="3" size-xl="3">
                            <IonCard className="card-dashboard" color="primary">

                                <IonImg className="card-fixed-icon-top-left"
                                        src={"assets/images/dashboard/card-icon-1.png"}> </IonImg>

                                <IonCardTitle className="card-dashboard-title">Card Title</IonCardTitle>
                            </IonCard>

                        </IonCol>

                        <IonCol size-xs="12" size-sm="6" size-md="4" size-lg="3" size-xl="3">
                            <IonCard className="card-dashboard" color="primary">

                                <IonImg className="card-fixed-icon-top-left"
                                        src={"assets/images/dashboard/card-icon-1.png"}> </IonImg>

                                <IonCardTitle className="card-dashboard-title">Card Title</IonCardTitle>
                            </IonCard>

                        </IonCol>
                    </IonRow>

                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Dashboard;