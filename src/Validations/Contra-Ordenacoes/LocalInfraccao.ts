import * as yup from 'yup';

export const schema_localInfraccao = yup.object().shape({

	distrito: yup.object().required(),
	concelho: yup.object().required(),
	freguesia: yup.object().required(),
	localidade: yup.object().required(),
	tipo: yup.string().required(),
	arruamento: yup.string().required(),

});

export const schema_distrito = yup.object().required();
export const schema_concelho = yup.object().required();
export const schema_freguesia = yup.object().required();
export const schema_localidade = yup.object().required();
export const schema_tipo = yup.string().required();
export const schema_arruamento = yup.string().required();