
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem } from '../ListItem/ListItem';

const PlaceList = ({ places, onItemDeleted }) => {

	const placeList = places.map((place, index) => (
		<ListItem 
			key={index} 
			placeName={place}
			onItemPressed={() => onItemDeleted(index)}
		></ListItem>
	));

	return (
		<View style={styles.listContainer}>
				{placeList}
		</View>
	)
}

const styles = StyleSheet.create({
	listContainer: {
			width: '100%'
	}
});

export { PlaceList };
