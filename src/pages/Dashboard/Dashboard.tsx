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

import LoggedUser from '../../components/Dashboard/LoggedUser';
import Cards from '../../components/Dashboard/Cards';


const Dashboard: React.FC = () => {
    const listOfCards = [
        {
            type: "big",
            bgClassName: "card-big-img-background-1",
            goTo: "#",
            title: "Pesquisar Pessoa"
        }, {
            type: "big",
            bgClassName: "card-big-img-background-2",
            goTo: "#",
            title: "Pesquisar Veículo"
        },
        {
            goTo: "/coDirecta",
            title: "Emissão CO Directa"
        }, {
            goTo: "#",
            title: "Registo Simplicado de CO Indirecta"
        }, {
            goTo: "#",
            title: "Emissão de Apreensão de Documentos"
        }, {
            goTo: "#",
            title: "Emissão de Apresentação de Documentos"
        },
        {
            goTo: "#",
            title: "Emissão de Apreensão de Veículo"
        }, {
            goTo: "#",
            title: "Emissão de Teste de Alcoolémia"
        },
        {
            goTo: "#",
            title: "Fecho de Turno"
        },


    ]
    // @ts-ignore
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
                        {listOfCards.map((card) => <Cards key={card.title} type={card.type} title={card.title}
                                                          goTo={card.goTo} bgClassName={card.bgClassName}></Cards>)}
                    </IonRow>

                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Dashboard;