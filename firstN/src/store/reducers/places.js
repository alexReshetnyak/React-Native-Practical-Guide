import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';
// import placeImage from './src/assets/Screenshot_1.png'; // * will create js object with path property

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Date.now() + '', 
          name: action.placeName,
          // image: placeImage
          image: {
            uri: action.image.uri
          },
          location: action.location
        }),
      };
  
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== action.placeKey)
      };

    default:
      return state;
  }
};

export default reducer;
