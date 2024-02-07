import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

class PlaceInput extends Component {
	state = {
		placeName: '',
	}

	placeNameChangeHandler = val => {
		this.setState({
			placeName: val
		});
	}

	placeSubmitHandler = (e) => {
    if (!this.state.placeName.trim()) { return; }

		this.props.onPlaceAdded(this.state.placeName);
		
		this.setState({
			placeName: ''
		});
  }

	render() {
		const { placeName } = this.state;

		return (
			<View style={styles.inputContainer}>
				<TextInput
					style={{backgroundColor: 'white', ...styles.placeInput}}
					placeholder="Awesome input"
					value={placeName}
					onChangeText={this.placeNameChangeHandler}
				/>
				{/* <Button color="#841584" title='ADD'/> */}
				<TouchableOpacity onPress={this.placeSubmitHandler}>
					<Text style={styles.placeButton}>Click Me!</Text>
				</TouchableOpacity>
			</View>
		);
	}
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
