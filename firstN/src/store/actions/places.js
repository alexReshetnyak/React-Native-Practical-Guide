import { DELETE_PLACE, SET_PLACES } from "./actionTypes";
import { 
  uiStartLoading, 
  uiStopLoading, 
  setBadgeNumber, 
  authGetToken 
} from './index';

export const addPlace = (placeName, location, image) => async dispatch => {
  // * with redux thunk
  const placeData = {
    name: placeName,
    location
  };
  const addPlaceUrl = "https://react-native-first-app-37e81.firebaseio.com/places.json";
  const imageUrl = "https://us-central1-react-native-first-app-37e81.cloudfunctions.net/storeImage";

  dispatch(uiStartLoading());
  
  try {
    const token = await dispatch(authGetToken());
    const imageJson = await fetch(
      imageUrl,
      {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        })
      }
    );
    
    const img = await imageJson.json();
    if (img.error) { throw img.error }

    placeData.image = img.imageUrl;

    await fetch(
      `${addPlaceUrl}?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify(placeData)
      }
    );

    dispatch(uiStopLoading());
    dispatch(getPlaces());
  } catch (error) {
    console.log(error);
    dispatch(uiStopLoading());
    alert('Something went wrong, please try again!')
  }
};

export const getPlaces = () => async dispatch => {
  try {
    const token = await dispatch(authGetToken());
    const getPlacesUrl = "https://react-native-first-app-37e81.firebaseio.com/places.json";
    const json = await fetch(`${getPlacesUrl}?auth=${token}`);
    const res = await json.json();
    
    if (!res) {
      dispatch(setBadgeNumber(0))
      return dispatch(setPlaces([]));
    }
  
    if (res.error) { throw res.error };

    const places = Object.keys(res).map(key => ({
      ...res[key],
      key,
      image: {
        uri: res[key].image
      }
    }));

    dispatch(setBadgeNumber(places.length));
    return dispatch(setPlaces(places));
  } catch (error) {
    console.log(error);
    alert('Something went wrong, sorry :/ ' + error);
  }
};

export const setPlaces = places => ({
  type: SET_PLACES,
  places
});

export const deletePlace = key => async dispatch => {
  try {
    const token = await dispatch(authGetToken());
    const deletePlaceUrl = `https://react-native-first-app-37e81.firebaseio.com/places/${key}.json`;
    await fetch(
      `${deletePlaceUrl}?auth=${token}`,
      {
        method: "DELETE"
      }
    );
    
    return dispatch(getPlaces());
  } catch (error) {
    console.log(error);
    alert('Something went wrong, sorry :/');
  }
};
