
import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { ListItem } from '../ListItem/ListItem';

const PlaceList = ({ places, onItemDeleted }) => {

	const placeList = places.map((place) => (
		<ListItem 
			key={place.key} 
			placeName={place.value}
			onItemPressed={() => onItemDeleted(place.key)}
		></ListItem>
	));

	return (
		// * FlatList is most efficient than scrollList
		<FlatList 
			style={styles.listContainer}
			data={places}
			renderItem={placeInfo => (
				<ListItem 
					placeName={placeInfo.item.value}
					onItemPressed={() => onItemDeleted(placeInfo.item.key)}
				></ListItem>
			)}
		>
		</FlatList>

		// <ScrollView style={styles.listContainer}>
		// 	{placeList}
		// </ScrollView>
	)
}

const styles = StyleSheet.create({
	listContainer: {
		width: '100%'
	}
});

export { PlaceList };
