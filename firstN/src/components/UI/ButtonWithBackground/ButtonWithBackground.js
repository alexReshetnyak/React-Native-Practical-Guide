import React from 'react';
import { 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  Text, 
  View, 
  StyleSheet,
  Platform
} from 'react-native';


const ButtonWithBackground = props => {
  const content = (
    <View style={[styles.button, props.style, props.disabled ? styles.disabled : null]}>
      <Text style={{color: props.style ? props.style.color : 'white'}}>{props.children}</Text>
    </View>
  );

  if (props.disabled) { return content; }

  if (Platform.OS === 'android') {
    return ( // * TouchableNativeFeedback added ripple effect only for android
      <TouchableNativeFeedback onPress={props.onPress}> 
        {content}
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      {content}
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#424242"
  },
  disabled: {
    backgroundColor: "#767676"
  }
});

export { ButtonWithBackground };
