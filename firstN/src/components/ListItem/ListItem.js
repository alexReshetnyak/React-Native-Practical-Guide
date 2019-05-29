import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';

const ListItem = ({ placeName, onItemPressed }) => (

	// * TouchableWithoutFeedback can listen touch events
	<TouchableOpacity onPress={onItemPressed}>
		<View style={styles.listItem}>
			<Text>{placeName}</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	listItem: {
		width: '100%',
		padding: 10,
		marginTop: 5,
		backgroundColor: '#eee'
	}
});

export { ListItem };
