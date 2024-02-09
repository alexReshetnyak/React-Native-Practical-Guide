import {authGetToken} from './auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {placeAdded, setPlaces} from '../reducers/places';
import {setBadgeNumber} from '../reducers/badge';
import {startLoading, stopLoading} from '../reducers/ui';

export const addPlace = createAsyncThunk(
  'places/addPlace',
  async (arg: {placeName: string; location: any; image: any}, {dispatch}) => {
    const placeData = {
      name: arg.placeName,
      location: arg.location,
      image: null,
      imagePath: null,
    };
    const addPlaceUrl =
      'https://react-native-first-app-37e81.firebaseio.com/places.json';
    const imageUrl =
      'https://us-central1-react-native-first-app-37e81.cloudfunctions.net/storeImage';

    dispatch(startLoading());

    try {
      const token = await dispatch(authGetToken());
      const imageJson = await fetch(imageUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image: arg.image.base64,
        }),
      });

      const img = await imageJson.json();

      if (img.error) {
        throw img.error;
      }

      placeData.image = img.imageUrl;
      placeData.imagePath = img.imagePath;

      // console.log('addPlace start upload place');
      const addPlaceRes = await fetch(`${addPlaceUrl}?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify(placeData),
      });

      if (!addPlaceRes.ok) {
        throw `Add place error, status: ${addPlaceRes.status}`;
      }

      dispatch(stopLoading());
      dispatch(getPlaces());
      dispatch(placeAdded());
    } catch (error) {
      console.log(error);
      dispatch(stopLoading());
    }
  },
);

export const getPlaces = createAsyncThunk(
  'places/getPlaces',
  async (arg, {dispatch}) => {
    try {
      const token = await dispatch(authGetToken());
      const getPlacesUrl =
        'https://react-native-first-app-37e81.firebaseio.com/places.json';
      const json = await fetch(`${getPlacesUrl}?auth=${token}`);
      if (!json.ok) {
        throw `Get places error, status: ${json.status}`;
      }
      const res = await json.json();

      if (!res) {
        dispatch(setBadgeNumber(0));
        return dispatch(setPlaces([]));
      }

      if (res.error) {
        throw res.error;
      }

      const places = Object.keys(res).map(key => ({
        ...res[key],
        key,
        image: {
          uri: res[key].image,
        },
      }));

      dispatch(setBadgeNumber(places.length));
      return dispatch(setPlaces(places));
    } catch (error) {
      console.log('Get places error:', error);
    }
  },
);

export const deletePlace = createAsyncThunk(
  'places/deletePlace',
  async (arg, {dispatch}) => {
    try {
      const token = await dispatch(authGetToken());
      const deletePlaceUrl = `https://react-native-first-app-37e81.firebaseio.com/places/test.json`;
      const json = await fetch(`${deletePlaceUrl}?auth=${token}`, {
        method: 'DELETE',
      });

      if (!json.ok) {
        throw `Delete place error, status: ${json.status}`;
      }

      return dispatch(getPlaces());
    } catch (error) {
      console.log(error);
    }
  },
);
