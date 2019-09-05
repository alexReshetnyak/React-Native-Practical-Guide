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
            uri: 'http://www.rialzi4x4evo.it/WebRoot/StoreIT8/Shops/150916/5971/B197/436C/F0E0/CE9B/0A0A/B010/A7B0/seat-cordoba-16.jpg'
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
