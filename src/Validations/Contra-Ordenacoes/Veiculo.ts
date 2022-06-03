import * as yup from 'yup';

export const schema_veiculo = yup.object().shape({
	matricula: yup.string().required(),
	pais: yup.object().required(),
});