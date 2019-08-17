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
    <View style={[styles.button, props.style]}>
      <Text style={{color: props.style ? props.style.color : 'black'}}>{props.children}</Text>
    </View>
  );

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
    borderRadius: 5
  }
});

export { ButtonWithBackground };
