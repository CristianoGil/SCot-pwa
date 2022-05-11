import { configureStore } from '@reduxjs/toolkit'
import popoverIndentVeiculoReducer from '../components/Menu/popoverIndentVeiculoSlice';
import modalMenuReducer from '../components/Menu/modalMenuSlice';

const store = configureStore({
  reducer: {
    popoverIndentVeiculo: popoverIndentVeiculoReducer,
    modalMenu: modalMenuReducer,
  },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch