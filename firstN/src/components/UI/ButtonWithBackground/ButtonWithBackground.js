import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';


const ButtonWithBackground = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, props.style]}>
        <Text style={{color: props.style ? props.style.color : 'black'}}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5
  }
});

export { ButtonWithBackground };
