import { configureStore } from '@reduxjs/toolkit'
import popoverIndentVeiculoReducer from '../components/Menu/popoverIndentVeiculoSlice'

const store = configureStore({
  reducer: {
    popoverIndentVeiculo: popoverIndentVeiculoReducer,
  },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch