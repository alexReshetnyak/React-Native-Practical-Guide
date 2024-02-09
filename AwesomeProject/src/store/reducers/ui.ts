import {createSlice} from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
} as UIState;

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const {startLoading, stopLoading} = uiSlice.actions;

export default uiSlice.reducer;
