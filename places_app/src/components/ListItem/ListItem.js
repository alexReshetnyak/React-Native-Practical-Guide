import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = ({ placeName, placeImage, onItemPressed }) => {
	// * TouchableWithoutFeedback can listen touch events without effects
	return <TouchableOpacity onPress={onItemPressed}>
		<View style={styles.listItem}>
			<Image resizeMode='contain' source={placeImage} style={styles.placeImage} />
			<Text>{placeName}</Text>
		</View>
	</TouchableOpacity>
};

const styles = StyleSheet.create({
	listItem: {
		width: '100%',
		padding: 10,
		marginTop: 5,
		backgroundColor: '#eee',
		flexDirection: 'row',
		alignItems: "center"
	},
	placeImage: {
		marginRight: 8,
		height: 30,
		width: 60
	}
});

export { ListItem };
