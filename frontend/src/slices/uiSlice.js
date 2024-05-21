import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    currentChannel: { id: '1', name: 'general' },
    modal: null,
    changingChannelId: null,
  },
  reducers: {
    setCurrentChannel: (state, { payload = { id: '1', name: 'general' } }) => {
      state.currentChannel = payload;
    },
    setChangingChannel: (state, { payload }) => {
      state.changingChannelId = payload;
    },
    setUiToDefault: (state) => {
      state.currentChannel = { id: '1', name: 'general' };
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
  setCurrentChannel,
  setChangingChannel,
  setUiToDefault,
  openAddModal,
  openRemoveModal,
  openRenameModal,
  closeModal,
} = uiSlice.actions;

export const getCurrentChannel = (state) => state.ui.currentChannel;
export const getModalType = (state) => state.ui.modal;
export const getChangingChannelId = (state) => state.ui.changingChannelId;

export default uiSlice.reducer;
