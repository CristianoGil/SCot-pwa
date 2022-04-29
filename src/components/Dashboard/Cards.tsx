import {
    IonCol,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonImg
} from '@ionic/react';
import './Cards.scss';
import {Link} from 'react-router-dom';


// card-big-img-background-1

const BigCard = (props: any) => {
    return (
        <IonCol size-xs="12" size-sm="6" size-md="5" size-lg="4" size-xl="4">
            <Link to={props.goTo} className="card-anchor">
                <IonCard className={"card-dashboard " + props.bgClassName} color="primary">

                    <span className="background-blur"></span>
                    <IonImg className="card-fixed-icon-top-left"
                            src={"assets/images/dashboard/card-icon-1.png"}> </IonImg>

                    <IonImg className="card-fixed-img-bottom-right"
                            src={"assets/images/background/ref-logo-yellow.png"}> </IonImg>

                    <IonCardTitle className="card-dashboard-title">{props.title}</IonCardTitle>

                </IonCard>
            </Link>
        </IonCol>

    )
}

const NormalCard = (props: any) => {
    return (
        <IonCol size-xs="12" size-sm="6" size-md="4" size-lg="3" size-xl="3">
            <Link to={props.goTo} className="card-anchor">
                <IonCard className="card-dashboard" color="primary">

                    <IonImg className="card-fixed-icon-top-left"
                            src={"assets/images/dashboard/card-icon-1.png"}> </IonImg>

                    <IonCardTitle className="card-dashboard-title">{props.title}</IonCardTitle>

                </IonCard>
            </Link>
        </IonCol>
    )

}

const RenderCard = (props: any) => {
    if (props.type === 'big') {
        return <BigCard title={props.title} goTo={props.goTo} bgClassName={props.bgClassName}/>;
    }

    return <NormalCard title={props.title} goTo={props.goTo}/>;
}


interface ICardProps {
    type: string | undefined
    title: string
    goTo: string
    bgClassName: string | undefined

}

const Cards: React.FC<ICardProps> = (props: ICardProps) => {

    return (
        <RenderCard type={props.type} title={props.title} goTo={props.goTo} bgClassName={props.bgClassName}/>
    )

}

export default Cards;