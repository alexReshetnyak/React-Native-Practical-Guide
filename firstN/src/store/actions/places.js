import { DELETE_PLACE, SET_PLACES } from "./actionTypes";
import { uiStartLoading, uiStopLoading, setBadgeNumber } from './index';

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

    await fetch(
      "https://react-native-first-app-37e81.firebaseio.com/places.json",
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
    const json = await fetch("https://react-native-first-app-37e81.firebaseio.com/places.json");
    const res = await json.json();
    
    if (!res) {
      return dispatch(setPlaces([]));
    }

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
    alert('Something went wrong, sorry :/');
  }
};

export const setPlaces = places => ({
  type: SET_PLACES,
  places
});

export const deletePlace = key => async dispatch => {
  try {
    await fetch(
      `https://react-native-first-app-37e81.firebaseio.com/places/${key}.json`,
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
