import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface PlaceState {
  places: any[];
  placeAdded: boolean;
}

const initialState = {
  places: [],
  placeAdded: false,
} as PlaceState;

const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<any>) {
      state.places = action.payload;
    },
    placeAdded(state) {
      state.placeAdded = true;
    },
    startAddPlace(state) {
      state.placeAdded = false;
    },
  },
});

export const {setPlaces, placeAdded, startAddPlace} = placeSlice.actions;

export default placeSlice.reducer;
