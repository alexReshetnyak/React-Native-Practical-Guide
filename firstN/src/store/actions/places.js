import { DELETE_PLACE, SET_PLACES } from "./actionTypes";
import { uiStartLoading, uiStopLoading, increaseBadgeNumber } from './index';

export const addPlace = (placeName, location, image) => async dispatch => {
  // * with redux thunk
  dispatch(uiStartLoading());

  const placeData = {
    name: placeName,
    location
  };

  try {
    const imageJson = await fetch(
      "https://us-central1-react-native-first-app-37e81.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        })
      }
    );

    const img = await imageJson.json();
    placeData.image = img.imageUrl;

    const json = await fetch(
      "https://react-native-first-app-37e81.firebaseio.com/places.json",
      {
        method: "POST",
        body: JSON.stringify(placeData)
      }
    );

    const res = await json.json();
    dispatch(uiStopLoading());
    dispatch(increaseBadgeNumber());
    console.log("RESPONSE:", res);
  } catch (error) {
    console.log(error);
    dispatch(uiStopLoading());
    alert('Something went wrong, please try again!')
  }
};

export const getPlaces = () => async dispatch => {
  try {
    const json = await fetch("https://react-native-first-app-37e81.firebaseio.com/places.json");
    const res = await json.json();
    
    if (!res) {
      return dispatch(setPlaces([]));
    }

    const places = Object.keys(res).map(key => ({
      ...res[key],
      id: key,
      image: {
        uri: res[key].image
      }
    }));

    return dispatch(setPlaces(places));
  } catch (error) {
    console.log(error);
    alert('Something went wrong, sorry :/');
  }
};

export const setPlaces = places => ({
  type: SET_PLACES,
  places
});

export const deletePlace = key => ({
  type: DELETE_PLACE,
  placeKey: key
});
