import { Navigation } from 'react-native-navigation';

import { SET_PLACES } from "./actionTypes";
import { setBadgeNumber } from './badge';
import { authGetToken } from './auth';
import { uiStartLoading, uiStopLoading } from './ui';

export const addPlace = (placeName, location, image) => async (dispatch, getState) => {
  // * with redux thunk
  const placeData = {
    name: placeName,
    location
  };
  const addPlaceUrl = "https://react-native-first-app-37e81.firebaseio.com/places.json";
  const imageUrl = "https://us-central1-react-native-first-app-37e81.cloudfunctions.net/storeImage";

  dispatch(uiStartLoading());
  
  try {
    console.log('Start addPlace');
    const token = await dispatch(authGetToken());
    console.log('addPlace token', token);

    const imageJson = await fetch(
      imageUrl,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          image: image.base64
        })
      }
    );

    console.log('addPlace imageJson', imageJson);
    const img = await imageJson.json();
    console.log('addPlace img', img);

    if (img.error) { throw img.error }

    placeData.image = img.imageUrl;
    console.log('addPlace start upload place');
    const addPlaceRes = await fetch(
      `${addPlaceUrl}?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify(placeData)
      }
    );

    console.log('addPlace response', addPlaceRes);
    dispatch(uiStopLoading());
    dispatch(getPlaces());
    
    const findScreenComponentId = getState().badge.componentId;
    console.log('Find screen component ID:', findScreenComponentId);

    Navigation.mergeOptions(findScreenComponentId, {
      bottomTabs: {
        currentTabId: findScreenComponentId
      }
    });

    // Navigation.mergeOptions('HomeId', {
    //   bottomTabs: {
    //     currentTabIndex: 1
    //   }
    // });
  } catch (error) {
    console.log(error);
    dispatch(uiStopLoading());
    alert(`Something went wrong, please try again! Message: ${error}`)
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
    console.log('Get places error:', error);
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
