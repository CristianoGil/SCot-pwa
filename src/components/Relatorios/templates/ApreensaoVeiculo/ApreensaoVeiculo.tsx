import { ApreensaoVeiculoPage1 } from "./helpers/ApreensaoVeiculoPage1";
import { ApreensaoVeiculoPage2 } from "./helpers/ApreensaoVeiculoPage2";

interface IProps {
    assinaturaFeiDepositario?: string
    assinaturaTestemunha_1?: string
    assinaturaTestemunha_2?: string
    assinaturaAgente?: string
    data: any
}


export const ApreensaoVeiculo:  React.FC<IProps>  = (props) => {
    const {assinaturaFeiDepositario, assinaturaTestemunha_1, assinaturaTestemunha_2, assinaturaAgente, data} = props;

    return (
        <table width="100%" cellPadding={0} cellSpacing={0} style={{border: 0}} >
            <tbody>
            <tr>
                <td width="50%" />
                <td align="center">
                    <ApreensaoVeiculoPage1 data={data}  assinaturaAgente={assinaturaAgente} assinaturaFeiDepositario={assinaturaFeiDepositario} assinaturaTestemunha_2={assinaturaTestemunha_2} assinaturaTestemunha_1={assinaturaTestemunha_1}/>
                    <br />
                    <br />
                    <ApreensaoVeiculoPage2 data={data}  assinaturaAgente={assinaturaAgente} assinaturaFeiDepositario={assinaturaFeiDepositario} assinaturaTestemunha_2={assinaturaTestemunha_2} assinaturaTestemunha_1={assinaturaTestemunha_1}/>
                </td>
                <td width="50%" />
            </tr>
            </tbody>
        </table>
    )
}
