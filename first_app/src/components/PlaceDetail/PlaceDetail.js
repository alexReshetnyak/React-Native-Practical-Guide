import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = ({selectedPlace, onItemDeleted, onModalClosed}) => {
  const modalContent = selectedPlace ?
    (
      <View>
        <Image 
          source={selectedPlace ? selectedPlace.image : null}
          style={styles.placeImage} 
        />
        <Text style={styles.placeName}>{selectedPlace ? selectedPlace.name : null}</Text>
      </View>
    ) : null;

  // ! onRequestClose required method for modal (it triggered every time before closing the modal window)
  return (
    <Modal onRequestClose={onModalClosed} visible={!!selectedPlace} animationType='slide'>
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <TouchableOpacity onPress={onItemDeleted}>
            <View style={styles.deleteButton}>
              <Icon size={30} name='ios-trash' color='red' />
            </View>
          </TouchableOpacity>
          {/* <Button title="Delete" color='red' onPress={onItemDeleted} /> */}
          <Button title="Close" onPress={onModalClosed} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center',
  }
});
 
export { PlaceDetail };