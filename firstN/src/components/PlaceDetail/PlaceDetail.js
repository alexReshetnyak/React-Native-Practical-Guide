import React from 'react';
import { Modal, View, Image, Text, Button } from 'react-native'

const PlaceDetail = ({selectedPlace}) => {
  return (
    <Modal>
      <View>
        <Image source={placeImage} />
        <Text>{selectedPlace.name}</Text>
        <View>
          <Button />
          <Button />
        </View>
      </View>
    </Modal>
  );
}
 
export { PlaceDetail };