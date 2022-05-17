import {CoDirectaMarkupTable1} from './helpers/CoDirectaMarkupTable1';
import {CoDirectaMarkupTable2} from './helpers/CoDirectaMarkupTable2';
import {CoDirectaMarkupTable3} from './helpers/CoDirectaMarkupTable3';


interface IProps {
    assinaturaArguido?: string,
    assinaturaTestemunha_1?: string
    assinaturaTestemunha_2?:string
    assinaturaAgente?:string
}

export const CoDirectaTemplateMarkup: React.FC<IProps> = (props) => {

    const {assinaturaArguido, assinaturaTestemunha_1, assinaturaTestemunha_2, assinaturaAgente} = props;

    return (
        <table width="100%" cellPadding={0} cellSpacing={0} id={"htmlWrapperForPDF"}>
            <tbody>
            <tr>
                <td width="50%" style={{backgroundColor: "rgb(82, 86, 89)"}}>&nbsp;</td>
                <td align="center">
                    <CoDirectaMarkupTable1 assinaturaAgente={assinaturaAgente} assinaturaArguido={assinaturaArguido} assinaturaTestemunha_1={assinaturaTestemunha_1}  assinaturaTestemunha_2={assinaturaTestemunha_2} />
                    <br/>
                    <br/>
                    <CoDirectaMarkupTable2/>
                    <br/>
                    <br/>
                    <CoDirectaMarkupTable3 assinaturaAgente={assinaturaAgente}  assinaturaArguido={assinaturaArguido} assinaturaTestemunha_1={assinaturaTestemunha_1}  assinaturaTestemunha_2={assinaturaTestemunha_2}/>
                </td>
                <td width="50%" style={{backgroundColor: "rgb(82, 86, 89)"}}>&nbsp;</td>
            </tr>
            </tbody>
        </table>
    )

}


