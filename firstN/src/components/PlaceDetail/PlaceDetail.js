import React from 'react';
import { Modal, View, Image, Text, Button } from 'react-native'

const PlaceDetail = ({selectedPlace}) => {
  console.log('SelectedPlace', selectedPlace);

  return (
    <Modal>
      <View>
        <Image source={selectedPlace ? selectedPlace.placeImage : null} />
        <Text>{selectedPlace ? selectedPlace.name : null}</Text>
        <View>
          <Button />
          <Button />
        </View>
      </View>
    </Modal>
  );
}
 
export { PlaceDetail };