import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {ListItem} from '../ListItem/ListItem';

const PlaceList = ({
  places,
  onItemSelected,
}: {
  places: any;
  onItemSelected: any;
}) => (
  // * FlatList is most efficient than scrollList
  <FlatList
    style={styles.listContainer}
    data={places}
    renderItem={({item}) => (
      <ListItem
        placeName={item.name}
        placeImage={item.image}
        onItemPressed={() => onItemSelected(item.key)}
      />
    )}
  />
);

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
});

export {PlaceList};
