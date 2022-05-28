import * as yup from 'yup';

export const veiculoSchema = yup.object().shape({

    matricula: yup.string().length(8).required(),

});