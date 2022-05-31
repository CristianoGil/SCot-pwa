
import { configureStore } from '@reduxjs/toolkit'
import inputValidationsReducer from '../Validations/InputValidationsSlice';
import inputValidationsReducer_LocalInfraccao from '../Validations/Contra-Ordenacoes/InputValidationsSlice_LocalInfraccao';
import inputValidationsReducer_Infraccao from '../Validations/Contra-Ordenacoes/InputValidationsSlice_Infraccao';

const store = configureStore({
    reducer: {
        inputValidations: inputValidationsReducer,
        inputValidations_LocalInfraccao: inputValidationsReducer_LocalInfraccao,
        inputValidations_Infraccao: inputValidationsReducer_Infraccao,
    },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch