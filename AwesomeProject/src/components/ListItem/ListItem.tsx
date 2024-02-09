import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';

type ListItemProps = {
  placeName: string;
  placeImage: ImageSourcePropType | undefined;
  onItemPressed: () => void;
};

const ListItem: FC<ListItemProps> = ({
  placeName,
  placeImage,
  onItemPressed,
}) => {
  return (
    <TouchableOpacity onPress={onItemPressed}>
      <View style={styles.container}>
        <Image resizeMode="contain" source={placeImage} style={styles.image} />
        <Text>{placeName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    marginTop: 5,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: 8,
    height: 30,
    width: 60,
  },
});

export {ListItem};
