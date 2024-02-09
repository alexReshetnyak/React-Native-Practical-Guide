import {Navigation} from 'react-native-navigation';
import {Platform} from 'react-native';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface BadgeState {
  badgeNumber: number;
  componentId: null | string;
}

const initialState = {
  badgeNumber: 0,
  componentId: null,
} as BadgeState;

const isIos = Platform.OS === 'ios';
const updateBadgeNumber = (state: any, number: any) => {
  Navigation.mergeOptions(state.componentId, {
    bottomTab: {
      badge: number ? number : isIos ? null : '',
      badgeColor: 'red',
    },
  });
};

const badgeSlice = createSlice({
  name: 'badge',
  initialState,
  reducers: {
    setComponentId(state, action: PayloadAction<string | null>) {
      state.componentId = action.payload;
    },
    decreaseBadgeNumber(state) {
      const currentBadgeNumber = state.badgeNumber - 1;
      updateBadgeNumber(state, currentBadgeNumber);

      state.badgeNumber = currentBadgeNumber;
    },
    increaseBadgeNumber(state) {
      const currentBadgeNumber = state.badgeNumber + 1;
      updateBadgeNumber(state, currentBadgeNumber);

      state.badgeNumber = currentBadgeNumber;
    },

    setBadgeNumber(state, action: PayloadAction<number>) {
      updateBadgeNumber(state, action.payload);
      state.badgeNumber = action.payload;
    },
  },
});

export const {
  increaseBadgeNumber,
  decreaseBadgeNumber,
  setBadgeNumber,
  setComponentId,
} = badgeSlice.actions;
export default badgeSlice.reducer;
