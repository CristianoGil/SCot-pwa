
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface InputValidationState {
    distrito_isValid?: boolean
    concelho_isValid?: boolean
    freguesia_isValid?: boolean
    localidade_isValid?: boolean
    tipo_isValid?: boolean
    arruamento_isValid?: boolean
}

const initialState: InputValidationState = {
    distrito_isValid: true,
    concelho_isValid: true,
    freguesia_isValid: true,
    localidade_isValid: true,
    tipo_isValid: true,
    arruamento_isValid: true,
}

export const inputValidationReducerSlice_LocalInfraccao = createSlice({
    name: 'inputValidations_LocalInfraccao',
    initialState,
    reducers: {
        setInputValidation_LocalInfraccao: (state, action: PayloadAction<InputValidationState>) => {

            let data = action.payload;

            state.distrito_isValid = data.distrito_isValid;
            state.concelho_isValid = data.concelho_isValid;
            state.freguesia_isValid = data.freguesia_isValid;
            state.localidade_isValid = data.localidade_isValid;
            state.tipo_isValid = data.tipo_isValid;
            state.arruamento_isValid = data.arruamento_isValid;
        },
    },
})

export const { setInputValidation_LocalInfraccao } = inputValidationReducerSlice_LocalInfraccao.actions

export const getInputValidations_LocalInfraccao = (state: RootState) => state.inputValidations_LocalInfraccao

export default inputValidationReducerSlice_LocalInfraccao.reducer