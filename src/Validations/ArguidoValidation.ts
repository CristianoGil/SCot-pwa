import * as yup from 'yup';

export const arguidoSchema = yup.object().shape({

    nif: yup.string().length(9).required(),

});