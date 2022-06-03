interface IProps {
    assinaturaFeiDepositario?: string
    assinaturaTestemunha_1?: string
    assinaturaTestemunha_2?: string
    assinaturaAgente?: string
    data: any
}


export const ApreensaoVeiculoPage2: React.FC<IProps> = (props) => {
    const {assinaturaFeiDepositario, assinaturaTestemunha_1, assinaturaTestemunha_2, assinaturaAgente, data} = props;

    return (

        <table
            id="JR_PAGE_ANCHOR_APREENSAO_VEICULO_0_2"
            role="none"
            className="jrPage"
            data-jr-height={842}
            cellPadding={0}
            cellSpacing={0}

            style={{
                emptyCells: "show",
                width: 595,
                borderCollapse: "collapse",
                backgroundColor: "white"
            }}
        >
            <tbody>
            <tr role="none" style={{height: 0}}>
                <td style={{width: 20}}></td>
                <td style={{width: 130}}></td>
                <td style={{width: 330}}></td>
                <td style={{width: 54}}></td>
                <td style={{width: 40}}></td>
                <td style={{width: 21}}></td>
            </tr>
            <tr style={{height: 100}}>
                <td colSpan={6}/>
            </tr>
            <tr style={{height: 100}}>
                <td/>
                <td colSpan={4} style={{textIndent: 0, textAlign: "justify"}}>
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Fica ainda notificado de que:
            <br/>
            - O veículo não pode manter-se apreendido pr mais de 90 dias devido
            a negligência do titular do Documento de Identificação do Veículo em
            promover a regularização da sua situação, sob pena de perda a favor
            do Estado (art. 162º, nº 2 e 3 do CE);
            <br/>- O titular do Documento de Identificação do Veículo, responde
            pelo pagamento das despesas causadas pela sua apreensão (art. 162º,
            nº 8 do CE).
          </span>
                </td>
                <td/>
            </tr>
            <tr style={{height: 20}}>
                <td colSpan={6}/>
            </tr>
            <tr style={{height: 20}}>
                <td/>
                <td
                    style={{textIndent: 0, verticalAlign: "middle", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            O Autuante:
          </span>
                </td>
                <td
                    style={{
                        borderBottom: "1px solid #000000",
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "left"
                    }}
                />
                <td colSpan={3}/>
            </tr>
            <tr style={{height: 8}}>
                <td colSpan={6}/>
            </tr>
            <tr style={{height: 20}}>
                <td/>
                <td
                    style={{textIndent: 0, verticalAlign: "middle", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            O Fiel Depositário:
          </span>
                </td>
                <td
                    style={{
                        borderBottom: "1px solid #000000",
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "left"
                    }}
                />
                <td colSpan={3}/>
            </tr>
            <tr style={{height: 32}}>
                <td colSpan={6}/>
            </tr>
            <tr style={{height: 20}}>
                <td/>
                <td
                    colSpan={3}
                    style={{textIndent: 0, verticalAlign: "middle", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Certifica-se que o Fiel Depositário se recusou a receber/assinar a
            notificação
          </span>
                </td>
                <td colSpan={2}/>
            </tr>
            <tr style={{height: 20}}>
                <td/>
                <td
                    style={{textIndent: 0, verticalAlign: "middle", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            A(s) Testemunha(s):
          </span>
                </td>
                <td
                    style={{
                        borderBottom: "1px solid #000000",
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "left"
                    }}
                />
                <td colSpan={3}/>
            </tr>
            <tr style={{height: 20}}>
                <td colSpan={2}/>
                <td
                    style={{
                        borderBottom: "1px solid #000000",
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "left"
                    }}
                />
                <td colSpan={3}/>
            </tr>
            <tr style={{height: 482}}>
                <td colSpan={6}/>
            </tr>
            </tbody>
        </table>


    )
}
