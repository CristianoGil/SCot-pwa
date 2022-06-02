import * as yup from 'yup';

export const schema_infraccao = yup.object().shape({

	comarca: yup.object().required(),
	entidade: yup.object().required(),
	tipificacaoDaInfraccao: yup.object().required(),
	subTipificacaoDaInfraccao: yup.object().required(),
	descricaoSumaria: yup.string().required(),

});

export const schema_comarca = yup.object().required();
export const schema_entidade = yup.object().required();
export const schema_tipificacaoDaInfraccao = yup.object().required();
export const schema_subTipificacaoDaInfraccao = yup.object().required();
export const schema_descricaoSumaria = yup.string().required();