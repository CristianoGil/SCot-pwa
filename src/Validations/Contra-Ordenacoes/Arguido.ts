import * as yup from 'yup';

export const schema_arguido = yup.object().shape({
	nif: yup.string().required(),
	tipoPessoa: yup.string().required(),
	dataEmissao: yup.string().required(),
	entidadeEmissora: yup.object().required(),
});