import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";

export const addPlace = (placeName, location, image) => async dispatch => {
  // * with redux thunk

  console.log("IMAGE:", image);

  try {
    const imageJson = await fetch(
      "https://us-central1-react-native-first-app-37e81.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        })
      }
    ).catch(err => console.log("ERR", err));

    console.log("IMAGE_JSON:", imageJson);

    const img = await imageJson.json();

    console.log("Image URL:", img);

    const placeData = {
      name: placeName,
      location,
      image: img.imageUrl
    };

    // const json = await fetch(
    //   "https://react-native-first-app-37e81.firebaseio.com/places.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(placeData)
    //   }
    // );

    // const res = await json.json();
    // console.log("RESPONSE:", res);
  } catch (error) {
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
