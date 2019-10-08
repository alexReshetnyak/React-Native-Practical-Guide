import { SET_PLACES, PLACE_ADDED , START_ADD_PLACE } from '../actions/actionTypes';

const initialState = {
  places: [],
  placeAdded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places,
      };
    case PLACE_ADDED:
      return {
        ...state,
        placeAdded: true
      };
    case START_ADD_PLACE:
      return {
        ...state,
        placeAdded: false
      };
    // case DELETE_PLACE:
    //   return {
    //     ...state,
    //     places: state.places.filter(place => place.key !== action.placeKey)
    //   };

    default:
      return state;
  }
};

export default reducer;
