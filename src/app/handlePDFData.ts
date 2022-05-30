import {ICoDirecta} from "../model/contraordenacao"
import {IDocumentoPessoa, IMoradaPessoa} from "../model/person";


export const handlePDFData = (coData: ICoDirecta): any => {
    let pdfData = coData as unknown as any;
    // Arguido
    if (coData.arguido) {
        // Documento de Identificacao
        const doc = arguidoGetDocIdentificacao(coData.arguido.documentos);
        if (doc) {
            pdfData.arguido.cc = doc.numero;
            pdfData.arguido.cc_emitido = doc.paisEmissao?.descricao;
            pdfData.arguido.cc_em = doc.dataEmissao?.toString();
        }

        // Morada
        const morada = arguidoGetMorada(coData.arguido.moradas);
        if (morada) {
            pdfData.arguido.domicilio = `${morada.morada} ${morada.local.descricao}, ${morada.codigoPostal}, ${morada.pais.descricao}`;
        }

        pdfData.veiculo.nomeCondutor = coData.arguido.nome
    }

    // Veiculo
    if (coData.veiculo) {

        // Categoria e class
        pdfData.veiculo.categoriaClasse = "";
        if (coData.veiculo.categoria && coData.veiculo.classe) {
            pdfData.veiculo.categoriaClasse = `${coData.veiculo.categoria.descricao}/${coData.veiculo.classe.descricao}`;
        }
        // tipo e subclass
        pdfData.veiculo.tipoSubClasse = "";
        if (coData.veiculo.subclasse && coData.veiculo.tipo) {
            pdfData.veiculo.tipoSubClasse = `${coData.veiculo.tipo.descricao}/${coData.veiculo.subclasse.descricao}`;
        } else if (coData.veiculo.tipo) {
            pdfData.veiculo.tipoSubClasse = coData.veiculo.tipo.descricao;
        }
    }

    pdfData.veiculo.conduzidoPor = coData.isConduzidoArguido ? "ARGUIDO" : "CONDUTOR";
    pdfData.veiculo.nomeCondutor = coData.isConduzidoArguido ? coData.arguido?.nome : coData.condutor?.nome;

    const condutorTituloConducao = coData?.condutor ? getTituloConducao(coData.condutor.documentos) : null;
    if (!coData.isConduzidoArguido && coData.condutor && condutorTituloConducao) {
        pdfData.veiculo.cc = condutorTituloConducao.numero
        pdfData.veiculo.cc_emitido = condutorTituloConducao.paisEmissao?.descricao
        pdfData.veiculo.cc_em = condutorTituloConducao.dataEmissao?.toString()
    }

    const arguidoTituloConducao = coData?.arguido ? getTituloConducao(coData.arguido.documentos) : null;
    if (coData.isConduzidoArguido && coData.arguido && arguidoTituloConducao) {
        pdfData.veiculo.cc = arguidoTituloConducao.numero
        pdfData.veiculo.cc_emitido = arguidoTituloConducao.paisEmissao?.descricao
        pdfData.veiculo.cc_em = arguidoTituloConducao.dataEmissao?.toString()
    }

    console.log(pdfData)

    return pdfData
}


const arguidoGetDocIdentificacao = (docs: IDocumentoPessoa[]): IDocumentoPessoa | undefined => {
    if (!docs) return;
    return docs.find((d) => d.principal)
}

const arguidoGetMorada = (moradas: IMoradaPessoa[]): IMoradaPessoa | undefined => {
    if (!moradas) return;
    return moradas.find((d) => d.principal)
}

const getTituloConducao = (tituloConducao: IDocumentoPessoa[]): IDocumentoPessoa | undefined => {
    if (!tituloConducao) return;
    return tituloConducao.find((d) => d.isTituloConducao)
}
