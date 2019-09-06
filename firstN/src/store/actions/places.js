import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";

export const addPlace = (placeName, location, image) => 
	async dispatch => { // * with redux thunk
		const placeData = {
			name: placeName,
			location
		}

		try {
			const json = await fetch(
				'https://react-native-first-app-37e81.firebaseio.com/places.json', 
				{
					method: 'POST',
					body: JSON.stringify(placeData)	
				}
			)
			
			const res = await json.json();
			console.log('RESPONSE:', res);
		} catch (error) {
			console.log(err)
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
