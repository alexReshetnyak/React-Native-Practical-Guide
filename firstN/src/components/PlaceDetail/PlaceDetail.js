import React from 'react';
import { Modal, View, Image, Text, Button } from 'react-native'

const PlaceDetail = ({selectedPlace}) => {
  const modalContent = selectedPlace ?
    (
      <View>
        <Image source={selectedPlace ? selectedPlace.placeImage : null} />
        <Text>{selectedPlace ? selectedPlace.name : null}</Text>
      </View>
    ) : null;

  return (
    <Modal>
      <View>
        {modalContent}
        <View>
          <Button title="Delete" />
          <Button title="Close" />
        </View>
      </View>
    </Modal>
  );
}
 
export { PlaceDetail };