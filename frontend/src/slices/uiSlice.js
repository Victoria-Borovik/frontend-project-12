/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modalChannelId: null,
    modal: null,
  },
  reducers: {
    setModalChannelId: (state, { payload }) => {
      state.modalChannelId = payload;
    },
    setModal: (state, { payload }) => {
      state.modal = payload;
    },
  },
});

export const {
  setModalChannelId,
  setModal,
} = uiSlice.actions;

export const getModalChannelId = (state) => state.ui.modalChannelId;
export const getModalType = (state) => state.ui.modal;

export default uiSlice.reducer;
