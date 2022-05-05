import {IonButton, IonDatetime, IonIcon, IonInput, IonItem, IonPopover } from "@ionic/react";
import {format, parseISO } from "date-fns";
import { calendar } from "ionicons/icons";
import { useState } from "react";
import { dateFormat } from "../../utils/apex-formatters";

interface IPROPSLocalEmissao {
    inputName: string
    textLabel?: string
    selected?: any
    setSelected?: any
}

const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy');
};
const DatePicker: React.FC<IPROPSLocalEmissao> =  (props) => {

    return (
        <IonItem>
            <IonInput id={props.inputName} name={props.inputName} value={props.selected} placeholder={props.textLabel}/>
            <IonButton color='medium' fill="clear" id={`open-${props.inputName}`}>
                <IonIcon icon={calendar}/>
            </IonButton>
            <IonPopover trigger={`open-${props.inputName}`} showBackdrop={false}>
                <IonDatetime presentation="date" onIonChange={ev => props.setSelected(dateFormat(`${ev.detail.value}`, 'YYYY/MM/DD'))}
                />
            </IonPopover>
        </IonItem>
    )
}

export default DatePicker;