import _ from 'underscore'
import {dateFormat} from '../../../../utils/apex-formatters';

interface IProps {
    assinaturaArguido?: string
    assinaturaTestemunha_1?: string
    assinaturaTestemunha_2?: string
    assinaturaAgente?: string
    coData: any,
    typeCopy?: string
}

export const CoDirectaMarkupTable1: React.FC<IProps> = (props) => {
    const {assinaturaArguido, assinaturaTestemunha_1, assinaturaTestemunha_2, assinaturaAgente, typeCopy, coData} = props;
    return (
        <table
            id="CO_DIRECTA_JR_PAGE_ANCHOR_0_1"
            role="none"
            className="jrPage"
            data-jr-height={842}
            cellPadding={0}
            cellSpacing={0}
            style={{
                emptyCells: "show",
                width: 595,
                height: 842,
                borderCollapse: "collapse",
                backgroundColor: "white"
            }}
        >
            <style
                type="text/css"
                dangerouslySetInnerHTML={{
                    __html:
                        "\n                    #JR_PAGE_ANCHOR_0_1 th {\n                        font-weight: normal;\n                    }\n\n                    #JR_PAGE_ANCHOR_0_1 ul {\n                        list-style-type: disc;\n                        padding-inline-start: 40px;\n                        margin: 0px;\n                    }\n\n                    #JR_PAGE_ANCHOR_0_1 ol {\n                        list-style-type: decimal;\n                        padding-inline-start: 40px;\n                        margin: 0px;\n                    }\n                "
                }}
            />
            <tbody>
            <tr role="none" style={{height: 0}}>
                <td style={{width: 20}}/>
                <td style={{width: 4}}/>
                <td style={{width: 3}}/>
                <td style={{width: 2}}/>
                <td style={{width: 21}}/>
                <td style={{width: 10}}/>
                <td style={{width: 10}}/>
                <td style={{width: 4}}/>
                <td style={{width: 6}}/>
                <td style={{width: 1}}/>
                <td style={{width: 9}}/>
                <td style={{width: 1}}/>
                <td style={{width: 9}}/>
                <td style={{width: 1}}/>
                <td style={{width: 9}}/>
                <td style={{width: 5}}/>
                <td style={{width: 3}}/>
                <td style={{width: 5}}/>
                <td style={{width: 7}}/>
                <td style={{width: 10}}/>
                <td style={{width: 11}}/>
                <td style={{width: 9}}/>
                <td style={{width: 2}}/>
                <td style={{width: 8}}/>
                <td style={{width: 20}}/>
                <td style={{width: 8}}/>
                <td style={{width: 2}}/>
                <td style={{width: 5}}/>
                <td style={{width: 13}}/>
                <td style={{width: 11}}/>
                <td style={{width: 1}}/>
                <td style={{width: 4}}/>
                <td style={{width: 5}}/>
                <td style={{width: 3}}/>
                <td style={{width: 7}}/>
                <td style={{width: 1}}/>
                <td style={{width: 5}}/>
                <td style={{width: 1}}/>
                <td style={{width: 2}}/>
                <td style={{width: 1}}/>
                <td style={{width: 1}}/>
                <td style={{width: 14}}/>
                <td style={{width: 6}}/>
                <td style={{width: 10}}/>
                <td style={{width: 6}}/>
                <td style={{width: 2}}/>
                <td style={{width: 2}}/>
                <td style={{width: 1}}/>
                <td style={{width: 7}}/>
                <td style={{width: 6}}/>
                <td style={{width: 16}}/>
                <td style={{width: 5}}/>
                <td style={{width: 4}}/>
                <td style={{width: 7}}/>
                <td style={{width: 1}}/>
                <td style={{width: 28}}/>
                <td style={{width: 20}}/>
                <td style={{width: 1}}/>
                <td style={{width: 4}}/>
                <td style={{width: 6}}/>
                <td style={{width: 54}}/>
                <td style={{width: 5}}/>
                <td style={{width: 1}}/>
                <td style={{width: 2}}/>
                <td style={{width: 2}}/>
                <td style={{width: 20}}/>
                <td style={{width: 10}}/>
                <td style={{width: 6}}/>
                <td style={{width: 19}}/>
                <td style={{width: 45}}/>
                <td style={{width: 25}}/>
            </tr>
            <tr style={{height: 20}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 16}}>
                <td colSpan={4}></td>
                <td
                    colSpan={8}
                    rowSpan={9}
                    style={{textAlign: "center", verticalAlign: "middle"}}
                >
                    <img src={"assets/icon/relatorios/BRASAO.png"}/>
                </td>
                <td></td>
                <td
                    colSpan={34}
                    rowSpan={3}
                    style={{textIndent: 0, textAlign: "center"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 14,
                  lineHeight: "1.1640625"
              }}
          >
            Ministério da Administração{" "}
          </span>
                </td>
                <td colSpan={20}></td>
                <td colSpan={3} style={{textIndent: 0, textAlign: "right"}}>
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            {typeCopy}
          </span>
                </td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={4}></td>
                <td></td>
                <td colSpan={24}></td>
            </tr>
            <tr style={{height: 3}}>
                <td colSpan={4}></td>
                <td></td>
                <td colSpan={18}></td>
                <td
                    colSpan={2}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Auto
          </span>
                </td>
                <td
                    colSpan={3}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.numeroAuto}</td>
                <td></td>
            </tr>
            <tr style={{height: 13}}>
                <td colSpan={4}></td>
                <td></td>
                <td
                    colSpan={34}
                    rowSpan={3}
                    style={{textIndent: 0, textAlign: "center"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Guarda Nacional Republicana
          </span>
                </td>
                <td colSpan={18}></td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={4}></td>
                <td></td>
                <td colSpan={24}></td>
            </tr>
            <tr style={{height: 2}}>
                <td colSpan={4}></td>
                <td></td>
                <td colSpan={18}></td>
                <td
                    colSpan={2}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            EA
          </span>
                </td>
                <td
                    colSpan={3}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.numeroTalao}</td>
                <td></td>
            </tr>
            <tr style={{height: 16}}>
                <td colSpan={4}></td>
                <td colSpan={2}></td>
                <td
                    colSpan={34}
                    rowSpan={2}
                    style={{
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            AUTO DE CONTRAORDENAÇÃO{" "}
          </span>
                </td>
                <td
                    colSpan={10}
                    rowSpan={2}
                    style={{
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            (Frente / Verso)
          </span>
                </td>
                <td colSpan={7}></td>
                <td></td>
            </tr>
            <tr style={{height: 2}}>
                <td colSpan={4}></td>
                <td colSpan={2}></td>
                <td colSpan={13}></td>
            </tr>
            <tr style={{height: 5}}>
                <td colSpan={4}></td>
                <td colSpan={59}></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td colSpan={69}>
                    <div style={{width: "100%", height: "100%", position: "relative"}}>
                        <div
                            style={{
                                position: "absolute",
                                overflow: "hidden",
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 550}}/>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            borderTop: "1px solid #000000"
                                        }}
                                    ></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 70}}/>
                                    <td style={{width: 10}}/>
                                    <td style={{width: 40}}/>
                                    <td style={{width: 430}}/>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td
                                        rowSpan={2}
                                        style={{
                                            pointerEvents: "auto",
                                            borderLeft: "1px solid #000000",
                                            borderBottom: "1px solid #000000",
                                            borderRight: "1px solid #000000",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "center"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 12,
                              lineHeight: "1.1640625"
                          }}
                      >
                        Arguido
                      </span>
                                    </td>
                                    <td></td>
                                    <td
                                        rowSpan={2}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "bottom",
                                            textAlign: "left"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 12,
                              lineHeight: "1.1640625"
                          }}
                      >
                        Nome
                      </span>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 19}}>
                                    <td></td>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "bottom",
                                            textAlign: "left"
                                        }}
                                    >{coData?.arguido?.nome}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>
                <td></td>
            </tr>
            <tr style={{height: 20}}>
                <td colSpan={13}></td>
                <td
                    colSpan={10}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Nascido a
          </span>
                </td>
                <td
                    colSpan={26}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{dateFormat(coData?.arguido.dataNascimento, 'YYYY/MM/DD')}</td>
                <td></td>
                <td
                    colSpan={5}
                    style={{
                        textIndent: 0,
                        verticalAlign: "bottom",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            NIF
          </span>
                </td>
                <td
                    colSpan={15}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.arguido?.nif}</td>
                <td></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={4}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            CC
          </span>
                </td>
                <td
                    colSpan={32}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.arguido?.cc}</td>
                <td colSpan={4}></td>
                <td
                    colSpan={10}
                    style={{
                        textIndent: 0,
                        verticalAlign: "bottom",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Emitido por
          </span>
                </td>
                <td
                    colSpan={10}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.arguido?.cc_emitido}</td>
                <td
                    colSpan={5}
                    style={{
                        textIndent: 0,
                        verticalAlign: "bottom",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            em
          </span>
                </td>
                <td
                    colSpan={4}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left", fontSize: "80%"}}
                >{coData?.arguido?.cc_em}</td>
                <td></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={4}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            BI
          </span>
                </td>
                <td
                    colSpan={29}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                ></td>
                <td colSpan={7}></td>
                <td
                    colSpan={10}
                    style={{
                        textIndent: 0,
                        verticalAlign: "bottom",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Emitido por
          </span>
                </td>
                <td
                    colSpan={10}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                ></td>
                <td
                    colSpan={5}
                    style={{
                        textIndent: 0,
                        verticalAlign: "bottom",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            em
          </span>
                </td>
                <td
                    colSpan={4}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                ></td>
                <td></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={8}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Domicílio
          </span>
                </td>
                <td
                    colSpan={61}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                ></td>
                <td></td>
            </tr>
            <tr style={{height: 3}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 1}}>
                <td></td>
                <td colSpan={69} style={{borderTop: "1px solid #000000"}}></td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={10}
                    style={{
                        borderLeft: "1px solid #000000",
                        borderBottom: "1px solid #000000",
                        borderRight: "1px solid #000000",
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Veículo
          </span>
                </td>
                <td colSpan={2}></td>
                <td
                    colSpan={9}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Matrícula
          </span>
                </td>
                <td
                    colSpan={22}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.veiculo?.matricula}</td>
                <td colSpan={3}></td>
                <td
                    colSpan={5}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            País
          </span>
                </td>
                <td
                    colSpan={10}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.veiculo?.pais?.descricao}</td>
                <td colSpan={9}></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={18}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Categoria/Classe
          </span>
                </td>
                <td
                    colSpan={25}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.veiculo?.categoriaClasse}</td>
                <td colSpan={3}></td>
                <td
                    colSpan={10}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Tipo/Subclasse
          </span>
                </td>
                <td
                    colSpan={13}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.veiculo?.tipoSubClasse}</td>
                <td></td>
            </tr>
            <tr style={{height: 19}}>
                <td></td>
                <td
                    colSpan={14}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Conduzido por
          </span>
                </td>
                <td
                    colSpan={16}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.veiculo?.conduzidoPor} </td>
                <td
                    colSpan={12}
                    rowSpan={2}
                    style={{
                        textIndent: 0,
                        verticalAlign: "bottom",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Nome
          </span>
                </td>
                <td
                    colSpan={27}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.veiculo?.nomeCondutor}</td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td></td>
                <td colSpan={28}></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={4}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            CC
          </span>
                </td>
                <td
                    colSpan={31}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.veiculo?.cc}</td>
                <td colSpan={5}></td>
                <td
                    colSpan={10}
                    style={{
                        textIndent: 0,
                        verticalAlign: "bottom",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Emitido por
          </span>
                </td>
                <td
                    colSpan={10}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.veiculo?.cc_emitido}</td>
                <td
                    colSpan={5}
                    style={{
                        textIndent: 0,
                        verticalAlign: "bottom",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            em
          </span>
                </td>
                <td
                    colSpan={4}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left", fontSize: "80%"}}
                >{coData?.veiculo?.cc_em}</td>
                <td></td>
            </tr>
            <tr style={{height: 2}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 1}}>
                <td></td>
                <td colSpan={69} style={{borderTop: "1px solid #000000"}}></td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={13}></td>
                <td
                    colSpan={6}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Data
          </span>
                </td>
                <td
                    colSpan={13}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.data}</td>
                <td></td>
                <td
                    colSpan={9}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Hora
          </span>
                </td>
                <td
                    colSpan={11}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.hora}</td>
                <td></td>
                <td
                    colSpan={14}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Presenciada pelo {coData?.infracao?.nomeAutuante}
          </span>
                </td>
                <td
                    colSpan={2}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                ></td>
                <td></td>
            </tr>
            <tr style={{height: 19}}>
                <td></td>
                <td
                    colSpan={10}
                    rowSpan={2}
                    style={{
                        borderLeft: "1px solid #000000",
                        borderBottom: "1px solid #000000",
                        borderRight: "1px solid #000000",
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Infracção
          </span>
                </td>
                <td colSpan={2}></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td></td>
                <td colSpan={60}></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={5}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Local
          </span>
                </td>
                <td
                    colSpan={64}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.domicilio}</td>
                <td></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={6}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Distrito
          </span>
                </td>
                <td
                    colSpan={18}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.distrito}</td>
                <td></td>
                <td
                    colSpan={13}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Município
          </span>
                </td>
                <td></td>
                <td
                    colSpan={19}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.municipio}</td>
                <td></td>
                <td
                    colSpan={3}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Comarca
          </span>
                </td>
                <td></td>
                <td
                    colSpan={6}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.comarca }</td>
                <td></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={19}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Descrição Sumária
          </span>
                </td>
                <td colSpan={51}>  </td>
            </tr>
            <tr style={{height: 40, maxHeight: 40, overflow: "hidden"}}>
                <td></td>
                <td colSpan={69} style={{textIndent: 0, textAlign: "left",     wordBreak: "break-all",
                    whiteSpace: "normal",  maxHeight: 40, overflow: "hidden"}}>
                    <p style={{textIndent: 0, textAlign: "left",     wordBreak: "break-all",
                        whiteSpace: "normal",  maxHeight: 40, overflow: "hidden", margin: 0}}>
                        {coData?.infracao?.descricaoSumaria || ""}
                    </p>

                </td>
                <td></td>
            </tr>
            <tr style={{height: 2}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={6}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Código
          </span>
                </td>
                <td
                    colSpan={16}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.codigoDgv || ""}</td>
                <td></td>
                <td
                    colSpan={20}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Normas Infringidas
          </span>
                </td>
                <td
                    colSpan={26}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.normaInfringida || ""}</td>
                <td></td>
            </tr>
            <tr style={{height: 2}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 1}}>
                <td></td>
                <td colSpan={69} style={{borderTop: "1px solid #000000"}}></td>
                <td></td>
            </tr>
            <tr style={{height: 2}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 20}}>
                <td></td>
                <td
                    colSpan={10}
                    style={{
                        borderLeft: "1px solid #000000",
                        borderBottom: "1px solid #000000",
                        borderRight: "1px solid #000000",
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Sanções
          </span>
                </td>
                <td colSpan={2}></td>
                <td
                    colSpan={7}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Coima
          </span>
                </td>
                <td
                    colSpan={7}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                > {coData?.infracao?.montanteDaCoimaMinima ? coData?.infracao?.montanteDaCoimaMinima : "0"}&euro; </td>
                <td></td>
                <td
                    colSpan={41}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                ></td>
                <td colSpan={2}></td>
            </tr>
            <tr style={{height: 20}}>
                <td colSpan={18}></td>
                <td
                    colSpan={2}
                    style={{
                        textIndent: 0,
                        verticalAlign: "bottom",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            a
          </span>
                </td>
                <td
                    colSpan={7}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.montanteDaCoimaMaxima ? coData?.infracao?.montanteDaCoimaMaxima : "0"}&euro;</td>
                <td></td>
                <td
                    colSpan={41}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                ></td>
                <td colSpan={2}></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={38}></td>
                <td
                    colSpan={18}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                ></td>
                <td colSpan={15}></td>
            </tr>
            <tr style={{height: 19}}>
                <td></td>
                <td
                    colSpan={9}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 10,
                  lineHeight: "1.1640625"
              }}
          >
            Prevista em
          </span>
                </td>
                <td
                    colSpan={11}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >{coData?.infracao?.normaQuePreveSancaoAcessoria}</td>
                <td
                    colSpan={16}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 10,
                  lineHeight: "1.1640625"
              }}
          >
            Sanção acessória de {coData?.infracao?.sancaoAcessoria}
          </span>
                </td>
                <td></td>
                <td
                    colSpan={14}
                    rowSpan={2}
                    style={{textIndent: 0, verticalAlign: "bottom", textAlign: "left"}}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 10,
                  lineHeight: "1.1640625"
              }}
          >
            Prevista em Art.° 136, Art.° 147 do CE
          </span>
                </td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td></td>
                <td colSpan={19}></td>
                <td></td>
            </tr>
            <tr style={{height: 3}}>
                <td colSpan={71}></td>
            </tr>
            <tr style={{height: 162}}>
                <td></td>
                <td colSpan={47}>
                    <div style={{width: "100%", height: "100%", position: "relative"}}>
                        <div
                            style={{
                                position: "absolute",
                                overflow: "hidden",
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 281}}/>
                                </tr>
                                <tr style={{height: 162}}>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            border: "1px solid #000000"
                                        }}
                                    ></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 40}}/>
                                    <td style={{width: 1}}/>
                                    <td style={{width: 7}}/>
                                    <td style={{width: 50}}/>
                                    <td style={{width: 6}}/>
                                    <td style={{width: 70}}/>
                                    <td style={{width: 9}}/>
                                    <td style={{width: 39}}/>
                                    <td style={{width: 18}}/>
                                    <td style={{width: 1}}/>
                                    <td style={{width: 40}}/>
                                </tr>
                                <tr style={{height: 2}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 20}}>
                                    <td colSpan={5}></td>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "center"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 12,
                              lineHeight: "1.1640625"
                          }}
                      >
                        O Autuante
                      </span>
                                    </td>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr style={{height: 21}}>
                                    <td></td>
                                    <td colSpan={8} className={"signPlace agente"}  style={{pointerEvents: "auto"}}>
                                        {!_.isEmpty(assinaturaAgente) ? <img src={assinaturaAgente} /> :'' }
                                    </td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 5}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td></td>
                                    <td
                                        colSpan={8}
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            borderTop: "1px solid #000000"
                                        }}
                                    ></td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 15}}>
                                    <td></td>
                                    <td
                                        colSpan={8}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "left"
                                        }}
                                    ></td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 2}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 20}}>
                                    <td colSpan={4}></td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "center"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 12,
                              lineHeight: "1.1640625"
                          }}
                      >
                        Testemunhas
                      </span>
                                    </td>
                                    <td colSpan={4}></td>
                                </tr>
                                <tr style={{height: 2}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 21}}>
                                    <td></td>
                                    <td colSpan={8} className={"signPlace testemunhaAssinatura1"}
                                        style={{pointerEvents: "auto"}}>
                                        {!_.isEmpty(assinaturaTestemunha_1) ?
                                            <img  src={assinaturaTestemunha_1}/> : ''}
                                    </td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 3}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td></td>
                                    <td
                                        colSpan={8}
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            borderTop: "1px solid #000000"
                                        }}
                                    ></td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 7}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 21}}>
                                    <td colSpan={2}></td>
                                    <td colSpan={8} className={"signPlace testemunhaAssinatura2"}
                                        style={{pointerEvents: "auto"}}>
                                        {!_.isEmpty(assinaturaTestemunha_2) ?
                                            <img src={assinaturaTestemunha_2}/> : ''}
                                    </td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 3}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td></td>
                                    <td
                                        colSpan={8}
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            borderTop: "1px solid #000000"
                                        }}
                                    ></td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 2}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 13}}>
                                    <td colSpan={3}></td>
                                    <td
                                        colSpan={5}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            textAlign: "justify"
                                        }}
                                    >
                                        <div style={{textIndent: 0, textAlignLast: "justify"}}>
                        <span
                            style={{
                                fontFamily: "Arial",
                                color: "#000000",
                                fontSize: 10,
                                lineHeight: "1.1640625"
                            }}
                        >
                          ( ou diretamente à entidade{" "}
                        </span>
                                        </div>
                                    </td>
                                    <td colSpan={3}></td>
                                </tr>
                                <tr style={{height: 2}}>
                                    <td colSpan={11}></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>
                <td colSpan={22}>
                    <div style={{width: "100%", height: "100%", position: "relative"}}>
                        <div
                            style={{
                                position: "absolute",
                                overflow: "hidden",
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 269}}/>
                                </tr>
                                <tr style={{height: 162}}>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            border: "1px solid #000000"
                                        }}
                                    ></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 29}}/>
                                    <td style={{width: 12}}/>
                                    <td style={{width: 28}}/>
                                    <td style={{width: 23}}/>
                                    <td style={{width: 2}}/>
                                    <td style={{width: 70}}/>
                                    <td style={{width: 3}}/>
                                    <td style={{width: 38}}/>
                                    <td style={{width: 36}}/>
                                    <td style={{width: 3}}/>
                                    <td style={{width: 25}}/>
                                </tr>
                                <tr style={{height: 2}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 20}}>
                                    <td colSpan={3}></td>
                                    <td
                                        colSpan={5}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "left"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial",
                              color: "#000000",
                              fontSize: 12,
                              lineHeight: "1.1640625"
                          }}
                      >
                        Recebi a &nbsp;notificação{" "}
                      </span>
                                    </td>
                                    <td colSpan={3}></td>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 20}}>
                                    <td colSpan={5}></td>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "center"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 12,
                              lineHeight: "1.1640625"
                          }}
                      >
                        O Arguido
                      </span>
                                    </td>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr style={{height: 5}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 21}}>
                                    <td colSpan={2}></td>
                                    <td colSpan={7} className="signPlace arguido"
                                        style={{pointerEvents: "auto", textAlign: "center"}}>
                                        {!_.isEmpty(assinaturaArguido) ?
                                            <img src={assinaturaArguido}/> : ''}
                                    </td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 7}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td colSpan={2}></td>
                                    <td
                                        colSpan={7}
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            borderTop: "1px solid #000000"
                                        }}
                                    ></td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 5}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 20}}>
                                    <td colSpan={4}></td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "center"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 12,
                              lineHeight: "1.1640625"
                          }}
                      >
                        O &nbsp;Condutor
                      </span>
                                    </td>
                                    <td colSpan={4}></td>
                                </tr>
                                <tr style={{height: 10}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 21}}>
                                    <td colSpan={2}></td>
                                    <td colSpan={7} style={{pointerEvents: "auto"}}></td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 3}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td colSpan={2}></td>
                                    <td
                                        colSpan={7}
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            borderTop: "1px solid #000000"
                                        }}
                                    ></td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 8}}>
                                    <td colSpan={11}></td>
                                </tr>
                                <tr style={{height: 13}}>
                                    <td></td>
                                    <td
                                        colSpan={9}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "center"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial",
                              color: "#000000",
                              fontSize: 10,
                              lineHeight: "1.1640625"
                          }}
                      >
                        (art 176.°, n° 11, do codigo da estrada)
                      </span>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 4}}>
                                    <td colSpan={11}></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>
                <td></td>
            </tr>
            <tr style={{height: 9}}>
                <td colSpan={48}></td>
                <td colSpan={22} rowSpan={16}>
                    <div style={{width: "100%", height: "100%", position: "relative"}}>
                        <div
                            style={{
                                position: "absolute",
                                overflow: "hidden",
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 269}}/>
                                </tr>
                                <tr style={{height: 178}}>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            border: "1px solid #000000"
                                        }}
                                    ></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 34}}/>
                                    <td style={{width: 65}}/>
                                    <td style={{width: 70}}/>
                                    <td style={{width: 65}}/>
                                    <td style={{width: 35}}/>
                                </tr>
                                <tr style={{height: 37}}>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr style={{height: 20}}>
                                    <td colSpan={2}></td>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "center"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 12,
                              lineHeight: "1.1640625"
                          }}
                      >
                        O Autuante
                      </span>
                                    </td>
                                    <td colSpan={2}></td>
                                </tr>
                                <tr style={{height: 9}}>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr style={{height: 21}}>
                                    <td></td>
                                    <td colSpan={3} className={"signPlace agente"}  style={{pointerEvents: "auto"}}>
                                        {!_.isEmpty(assinaturaAgente) ? <img src={assinaturaAgente} /> :'' }
                                    </td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 3}}>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td></td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            borderTop: "1px solid #000000"
                                        }}
                                    ></td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 5}}>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr style={{height: 40}}>
                                    <td></td>
                                    <td colSpan={3}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                position: "relative"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    overflow: "hidden",
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                            >
                                                <table
                                                    cellPadding={0}
                                                    cellSpacing={0}

                                                    style={{
                                                        emptyCells: "show",
                                                        width: "100%",
                                                        borderCollapse: "collapse"
                                                    }}
                                                >
                                                    <tbody>
                                                    <tr
                                                        role="none"

                                                        style={{height: 0}}
                                                    >
                                                        <td style={{width: 58}}/>
                                                        <td style={{width: 85}}/>
                                                        <td style={{width: 57}}/>
                                                    </tr>
                                                    <tr style={{height: 20}}>
                                                        <td></td>
                                                        <td
                                                            style={{
                                                                pointerEvents: "auto",
                                                                textIndent: 0,
                                                                verticalAlign: "middle",
                                                                textAlign: "center"
                                                            }}
                                                        >
                                  <span
                                      style={{
                                          fontFamily: "Arial Rounded MT Bold",
                                          color: "#000000",
                                          fontSize: 12,
                                          lineHeight: "1.1640625"
                                      }}
                                  >
                                    Testemunhas
                                  </span>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div
                                                style={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "100%",
                                                    pointerEvents: "none"
                                                }}
                                            >
                                                <table
                                                    cellPadding={0}
                                                    cellSpacing={0}

                                                    style={{
                                                        emptyCells: "show",
                                                        width: "100%",
                                                        borderCollapse: "collapse"
                                                    }}
                                                >
                                                    <tbody>
                                                    <tr
                                                        role="none"

                                                        style={{height: 0}}
                                                    >
                                                        <td style={{width: 200}}/>
                                                    </tr>
                                                    <tr style={{height: 19}}>
                                                        <td></td>
                                                    </tr>
                                                    <tr style={{height: 21}}>
                                                        <td style={{pointerEvents: "auto"}}
                                                            className={"signPlace testemunhaAssinatura1"}>
                                                            {!_.isEmpty(assinaturaTestemunha_1) ?
                                                                <img  src={assinaturaTestemunha_1}/> : ''}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 3}}>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td></td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            borderTop: "1px solid #000000"
                                        }}
                                    ></td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 8}}>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr style={{height: 21}}>
                                    <td></td>
                                    <td colSpan={3} className={"signPlace testemunhaAssinatura2"}
                                        style={{pointerEvents: "auto"}}>
                                        {!_.isEmpty(assinaturaTestemunha_2) ?
                                            <img  src={assinaturaTestemunha_2}/> : ''}
                                    </td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 2}}>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr style={{height: 1}}>
                                    <td></td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            borderTop: "1px solid #000000"
                                        }}
                                    ></td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 6}}>
                                    <td colSpan={5}></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>
                <td></td>
            </tr>
            <tr style={{height: 6}}>
                <td colSpan={2}></td>
                <td colSpan={6} rowSpan={9}>
                    <svg height={48} width={50}>
                        <ellipse
                            cx={25}
                            cy={24}
                            rx="24.5"
                            ry="23.5"
                            style={{
                                fill: "#FFFFFF",
                                stroke: "#000000",
                                strokeWidth: 1.0,
                                strokeDasharray: "5.0,3.0"
                            }}
                        />
                    </svg>
                </td>
                <td colSpan={40}></td>
                <td></td>
            </tr>
            <tr style={{height: 10}}>
                <td colSpan={2}></td>
                <td colSpan={22}></td>
                <td
                    colSpan={5}
                    rowSpan={2}
                    style={{border: "1px solid #000000"}}
                ></td>
                <td
                    colSpan={11}
                    rowSpan={2}
                    style={{
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 12,
                  lineHeight: "1.1640625"
              }}
          >
            Coima
          </span>
                </td>
                <td colSpan={2}></td>
                <td></td>
            </tr>
            <tr style={{height: 9}}>
                <td colSpan={2}></td>
                <td></td>
                <td
                    colSpan={7}
                    rowSpan={5}
                    style={{textIndent: 0, textAlign: "justify"}}
                >
                    <div style={{textIndent: 0, textAlignLast: "justify"}}>
            <span
                style={{
                    fontFamily: "Arial",
                    color: "#000000",
                    fontSize: 10,
                    lineHeight: "1.1640625"
                }}
            >
              Recibo
            </span>
                    </div>
                </td>
                <td colSpan={14}></td>
                <td colSpan={2}></td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={2}></td>
                <td></td>
                <td colSpan={32}></td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={2}></td>
                <td></td>
                <td></td>
                <td colSpan={12} style={{borderTop: "1px solid #000000"}}></td>
                <td colSpan={19}></td>
                <td></td>
            </tr>
            <tr style={{height: 2}}>
                <td colSpan={2}></td>
                <td></td>
                <td colSpan={32}></td>
                <td></td>
            </tr>
            <tr style={{height: 3}}>
                <td colSpan={2}></td>
                <td></td>
                <td colSpan={14}></td>
                <td
                    colSpan={5}
                    rowSpan={3}
                    style={{border: "1px solid #000000"}}
                ></td>
                <td
                    colSpan={11}
                    rowSpan={2}
                    style={{
                        textIndent: 0,
                        verticalAlign: "middle",
                        textAlign: "center"
                    }}
                >
          <span
              style={{
                  fontFamily: "Arial Rounded MT Bold",
                  color: "#000000",
                  fontSize: 11,
                  lineHeight: "1.1640625"
              }}
          >
            Depósito
          </span>
                </td>
                <td colSpan={2}></td>
                <td></td>
            </tr>
            <tr style={{height: 15}}>
                <td colSpan={2}></td>
                <td colSpan={22}></td>
                <td colSpan={2}></td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={2}></td>
                <td colSpan={22}></td>
                <td colSpan={13}></td>
                <td></td>
            </tr>
            <tr style={{height: 3}}>
                <td colSpan={48}></td>
                <td></td>
            </tr>
            <tr style={{height: 1}}>
                <td colSpan={3}></td>
                <td colSpan={42} style={{borderTop: "1px dashed #000000"}}></td>
                <td colSpan={3}></td>
                <td></td>
            </tr>
            <tr style={{height: 2}}>
                <td colSpan={48}></td>
                <td></td>
            </tr>
            <tr style={{height: 49}}>
                <td colSpan={2}></td>
                <td colSpan={6}>
                    <svg height={49} width={50}>
                        <ellipse
                            cx={25}
                            cy={24}
                            rx="24.5"
                            ry="23.5"
                            style={{
                                fill: "#FFFFFF",
                                stroke: "#000000",
                                strokeWidth: 1.0,
                                strokeDasharray: "5.0,3.0"
                            }}
                        />
                    </svg>
                </td>
                <td colSpan={40}></td>
                <td></td>
            </tr>
            <tr style={{height: 4}}>
                <td colSpan={48}></td>
                <td></td>
            </tr>
            <tr style={{height: 62}}>
                <td></td>
                <td colSpan={47}>
                    <div style={{width: "100%", height: "100%", position: "relative"}}>
                        <div
                            style={{
                                position: "absolute",
                                overflow: "hidden",
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 281}}/>
                                </tr>
                                <tr style={{height: 62}}>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            backgroundColor: "#FFFFFF",
                                            border: "1px solid #000000"
                                        }}
                                    ></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none"
                            }}
                        >
                            <table
                                cellPadding={0}
                                cellSpacing={0}

                                style={{
                                    emptyCells: "show",
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >
                                <tbody>
                                <tr role="none" style={{height: 0}}>
                                    <td style={{width: 3}}/>
                                    <td style={{width: 49}}/>
                                    <td style={{width: 2}}/>
                                    <td style={{width: 34}}/>
                                    <td style={{width: 127}}/>
                                    <td style={{width: 60}}/>
                                    <td style={{width: 6}}/>
                                </tr>
                                <tr style={{height: 2}}>
                                    <td colSpan={7}></td>
                                </tr>
                                <tr style={{height: 14}}>
                                    <td></td>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "left"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 10,
                              lineHeight: "1.1640625"
                          }}
                      >
                        IBAN
                      </span>
                                    </td>
                                    <td></td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "middle",
                                            textAlign: "right"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 10,
                              lineHeight: "1.1640625"
                          }}
                      >
                        PT50 0035 0771 00000263630 55
                      </span>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 2}}>
                                    <td colSpan={7}></td>
                                </tr>
                                <tr style={{height: 14}}>
                                    <td></td>
                                    <td
                                        colSpan={3}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "bottom",
                                            textAlign: "left"
                                        }}
                                    >
                      <span
                          style={{
                              fontFamily: "Arial Rounded MT Bold",
                              color: "#000000",
                              fontSize: 10,
                              lineHeight: "1.1640625"
                          }}
                      >
                        MONTANTE
                      </span>
                                    </td>
                                    <td></td>
                                    <td
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            verticalAlign: "bottom",
                                            textAlign: "left"
                                        }}
                                    ></td>
                                    <td></td>
                                </tr>
                                <tr style={{height: 30}}>
                                    <td></td>
                                    <td
                                        colSpan={5}
                                        style={{
                                            pointerEvents: "auto",
                                            textIndent: 0,
                                            textAlign: "justify",
                                            lineHeight: "0"
                                        }}
                                    >
                                        <div style={{textIndent: 0, textAlignLast: "justify"}}>
                        <span
                            style={{
                                fontFamily: "Arial",
                                color: "#000000",
                                fontSize: 8,
                                lineHeight: "1.1640625"
                            }}
                        >
                          Os comprovativos de &nbsp;pagamento da &nbsp;coima por
                          transferência bancária devem ser enviados por via
                          eletrônica para juridico.apoio@cm-sesimbra.pt com a
                            &nbsp;indicação do n° do &nbsp;auto de{" "}
                        </span>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>
                <td></td>
            </tr>
            <tr style={{height: 20}}>
                <td colSpan={71}></td>
            </tr>
            </tbody>
        </table>
    )
}
