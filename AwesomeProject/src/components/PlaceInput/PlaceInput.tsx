import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {DefaultInput} from '../UI/DefaultInput/DefaultInput';

type Props = {
  controls: any;
  onChangeText: () => void;
};

const PlaceInput: FC<Props> = props => {
  const {placeName} = props.controls;

  return (
    <DefaultInput
      placeholder="Place Name"
      style={styles.input}
      value={placeName.value}
      valid={placeName.valid || placeName.pristine}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={props.onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
    borderWidth: 2,
  },
});

export {PlaceInput};
