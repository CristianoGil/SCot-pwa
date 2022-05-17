import {CoDirectaMarkupTable1} from './helpers/CoDirectaMarkupTable1';
import {CoDirectaMarkupTable2} from './helpers/CoDirectaMarkupTable2';
import {CoDirectaMarkupTable3} from './helpers/CoDirectaMarkupTable3';


interface IProps {
    assinaturaManuscritoArguido?: string,
    assinaturaManuscritaTestemunha_1?: string
    assinaturaManuscritaTestemunha_2?:string
}

export const CoDirectaTemplateMarkup: React.FC<IProps> = (props) => {

    const {assinaturaManuscritoArguido, assinaturaManuscritaTestemunha_1, assinaturaManuscritaTestemunha_2} = props;

    return (
        <table width="100%" cellPadding={0} cellSpacing={0} id={"htmlWrapperForPDF"}>
            <tbody>
            <tr>
                <td width="50%" style={{backgroundColor: "rgb(82, 86, 89)"}}>&nbsp;</td>
                <td align="center">
                    <CoDirectaMarkupTable1 assinaturaManuscritoArguido={assinaturaManuscritoArguido} assinaturaManuscritaTestemunha_1={assinaturaManuscritaTestemunha_1}  assinaturaManuscritaTestemunha_2={assinaturaManuscritaTestemunha_2} />
                    <br/>
                    <br/>
                    <CoDirectaMarkupTable2/>
                    <br/>
                    <br/>
                    <CoDirectaMarkupTable3  assinaturaManuscritoArguido={assinaturaManuscritoArguido} assinaturaManuscritaTestemunha_1={assinaturaManuscritaTestemunha_1}  assinaturaManuscritaTestemunha_2={assinaturaManuscritaTestemunha_2}/>
                </td>
                <td width="50%" style={{backgroundColor: "rgb(82, 86, 89)"}}>&nbsp;</td>
            </tr>
            </tbody>
        </table>
    )

}


