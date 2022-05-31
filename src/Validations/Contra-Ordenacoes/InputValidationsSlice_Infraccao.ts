
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface InputValidationState {
    comarca_isValid?: boolean
    entidade_isValid?: boolean
    tipificacaoInfraccao_isValid?: boolean
    subtipificacao_isValid?: boolean
    descricaoSumaria_isValid?: boolean
}

const initialState: InputValidationState = {
    comarca_isValid: true,
    entidade_isValid: true,
    tipificacaoInfraccao_isValid: true,
    subtipificacao_isValid: true,
    descricaoSumaria_isValid: true
}

export const inputValidationReducerSlice_Infraccao = createSlice({
    name: 'inputValidations_Infraccao',
    initialState,
    reducers: {
        setInputValidation_Infraccao: (state, action: PayloadAction<InputValidationState>) => {

            let data = action.payload;

            state.comarca_isValid = data.comarca_isValid;
            state.entidade_isValid = data.entidade_isValid;
            state.tipificacaoInfraccao_isValid = data.tipificacaoInfraccao_isValid;
            state.subtipificacao_isValid = data.subtipificacao_isValid;
            state.descricaoSumaria_isValid = data.descricaoSumaria_isValid;
        },
    },
})

export const { setInputValidation_Infraccao } = inputValidationReducerSlice_Infraccao.actions

export const getInputValidations_Infraccao = (state: RootState) => state.inputValidations_Infraccao

export default inputValidationReducerSlice_Infraccao.reducer