import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface ModalMenuState {
  isOpen: boolean
}

const initialState: ModalMenuState = {
  isOpen: false,
}

export const modalMenuReducerSlice = createSlice({
  name: 'modalMenu',
  initialState,
  reducers: {
    setVisibleModalMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
})

export const { setVisibleModalMenu } = modalMenuReducerSlice.actions;

export const modalMenuIsOpen = (state: RootState) => state.modalMenu.isOpen;

export default modalMenuReducerSlice.reducer;