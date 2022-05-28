import {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react';

import './Dashboard.scss';
import Menu from '../../components/Menu/Menu';

import LoggedUser from '../../components/Dashboard/LoggedUser';
import Cards from '../../components/Dashboard/Cards';
import React from 'react';


class Dashboard extends React.Component {

    private listOfCards: any

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.listOfCards = [
            {
                type: "big",
                bgClassName: "card-big-img-background-1",
                goTo: "/pessoa",
                title: "Pesquisar Pessoa"
            }, {
                type: "big",
                bgClassName: "card-big-img-background-2",
                goTo: "/veiculo",
                title: "Pesquisar Veículo",
                noYellow: true
            },
            {
                goTo: "/coDirecta",
                title: "Emissão CO Directa"
            }, {
                goTo: "/coIndirecta",
                title: "Registo Simplicado de CO Indirecta"
            }, {
                goTo: "/emissaoApreensaoDocumentos",
                title: "Emissão de Apreensão de Documentos"
            }, {
                goTo: "/emissaoApresentacaoDocumentos",
                title: "Emissão de Apresentação de Documentos"
            },
            {
                goTo: "/emissaoApreensaoVeiculo",
                title: "Emissão de Apreensão de Veículo"
            }, {
                goTo: "/emissaoTesteAlcoolemia",
                title: "Emissão de Teste de Alcoolémia"
            },
            {
                goTo: "#",
                title: "Fecho de Turno"
            }
        ]

    }

    // @ts-ignore
    render() {
        return (
            <IonPage>

                <Menu/>

                <IonContent
                    class={"content-dashboard "}
                    scrollEvents={true}
                    fullscreen={true}>
                    <IonGrid className="dashboard-grid">
                        <IonRow class="ion-justify-content-start dashboard-grid-row">
                            <IonCol><LoggedUser/></IonCol>
                        </IonRow>

                        <IonRow class="ion-justify-content-start dashboard-grid-row dashboard-grid-row-card ">
                            {this.listOfCards.map((card: { title: string; type: string | undefined; goTo: string; bgClassName: string | undefined; noYellow: boolean | undefined; }, index: string) =>
                                <Cards key={card.title + "-" + index} type={card.type}
                                       title={card.title}
                                       goTo={card.goTo} bgClassName={card.bgClassName}
                                       noYellow={card.noYellow}></Cards>)}
                        </IonRow>

                    </IonGrid>

                </IonContent>
            </IonPage>
        );
    }

};

export default Dashboard;
