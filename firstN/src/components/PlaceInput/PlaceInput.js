import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

const PlaceInput = ({ placeName, placeNameChangeHandler, placeSubmitHandler }) => {
	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={{backgroundColor: 'white', ...styles.placeInput}}
				placeholder="Awesome input"
				value={placeName}
				onChangeText={placeNameChangeHandler}
			/>
			{/* <Button color="#841584" title='ADD'/> */}
			<TouchableOpacity onPress={placeSubmitHandler}>
				<Text style={styles.placeButton}>Click Me!</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	listContainer: {
			width: '100%'
	},
	inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: 'black',
    // borderWidth: 1
	},
	placeInput: {
    width: '70%',
  },
  placeButton: {
    backgroundColor: 'red',
    borderRadius: 1,
    color: 'white',
    overflow: 'hidden',
    flexGrow: 1,
    padding: 12,
    textAlign:'center',
  }
});

export { PlaceInput } ;
