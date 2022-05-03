import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface PopoverIndentVeiculoState {
  isOpen: boolean
}

const initialState: PopoverIndentVeiculoState = {
  isOpen: false,
}

export const popoverIndentVeiculoReducerSlice = createSlice({
  name: 'popoverIndentVeiculo',
  initialState,
  reducers: {
    setVisiblePopoverIndentVeiculo: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
})

export const { setVisiblePopoverIndentVeiculo } = popoverIndentVeiculoReducerSlice.actions

export const selectIsOpen = (state: RootState) => state.popoverIndentVeiculo.isOpen

export default popoverIndentVeiculoReducerSlice.reducer