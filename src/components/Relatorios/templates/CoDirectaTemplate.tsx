import {CoDirectaMarkupTable1} from './helpers/CoDirectaMarkupTable1';
import {CoDirectaMarkupTable2} from './helpers/CoDirectaMarkupTable2';
import {CoDirectaMarkupTable3} from './helpers/CoDirectaMarkupTable3';


interface IProps {
    assinaturaManuscritoArguido?: string
}

export const CoDirectaTemplateMarkup: React.FC<IProps> = (props) => {

    const {assinaturaManuscritoArguido} = props;

    return (
        <table width="100%" cellPadding={0} cellSpacing={0} id={"htmlWrapperForPDF"}>
            <tbody>
            <tr>
                <td width="50%" style={{backgroundColor: "rgb(82, 86, 89)"}}>&nbsp;</td>
                <td align="center">
                    <CoDirectaMarkupTable1 assinaturaManuscritoArguido={assinaturaManuscritoArguido}/>
                    <br/>
                    <br/>
                    <CoDirectaMarkupTable2/>
                    <br/>
                    <br/>
                    <CoDirectaMarkupTable3  assinaturaManuscritoArguido={assinaturaManuscritoArguido} />
                </td>
                <td width="50%" style={{backgroundColor: "rgb(82, 86, 89)"}}>&nbsp;</td>
            </tr>
            </tbody>
        </table>
    )

}


