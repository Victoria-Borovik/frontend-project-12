/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = '1';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeChannelId: defaultChannelId,
    changingChannelId: null,
    modal: null,
  },
  reducers: {
    setActiveChannelId: (state, { payload }) => {
      state.activeChannelId = payload;
    },
    setChangingChannelId: (state, { payload }) => {
      state.changingChannelId = payload;
    },
    setUiToDefault: (state) => {
      state.activeChannelId = defaultChannelId;
      state.modal = null;
      state.changingChannelId = null;
    },
    openAddModal: (state) => {
      state.modal = 'adding';
    },
    openRemoveModal: (state, { payload }) => {
      state.modal = 'removing';
      state.changingChannelId = payload;
    },
    openRenameModal: (state, { payload }) => {
      state.modal = 'renaming';
      state.changingChannelId = payload;
    },
    closeModal: (state) => {
      state.modal = null;
    },
  },
});

export const {
  setActiveChannelId,
  setChangingChannelId,
  setUiToDefault,
  openAddModal,
  openRemoveModal,
  openRenameModal,
  closeModal,
} = uiSlice.actions;

export const getActiveChannelId = (state) => state.ui.activeChannelId;
export const getChangingChannelId = (state) => state.ui.changingChannelId;
export const getModalType = (state) => state.ui.modal;

export default uiSlice.reducer;
