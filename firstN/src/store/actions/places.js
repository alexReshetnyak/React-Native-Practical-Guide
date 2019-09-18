import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from './index';

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
    console.log("RESPONSE:", res);
  } catch (error) {
    dispatch(uiStopLoading());
    console.log(error);
  }
};
// type: ADD_PLACE,
// placeName,
// location,
// image

export const deletePlace = key => ({
  type: DELETE_PLACE,
  placeKey: key
});
