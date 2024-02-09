import React, {useState, useEffect, FC} from 'react';
import {View, Button, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const INITIAL_CORDS = {
  latitude: 49.9950205,
  longitude: 36.2361048,
};

type Props = {
  control: any;
  onLocationPick: (data: any) => void;
};

const PickLocation: FC<Props> = props => {
  const [focusedLocation, setFocusedLocation] = useState({
    ...INITIAL_CORDS,
    latitudeDelta: 0.0122,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.0122,
  });
  const [locationChosen, setLocationChosen] = useState(false);

  const map = React.useRef<any | null>(null);

  useEffect(() => {
    if (props.control.value && locationChosen && !props.control.value) {
      setFocusedLocation({
        ...focusedLocation,
        ...INITIAL_CORDS,
      });
      setLocationChosen(false);
    }
  }, [props.control.value, locationChosen, focusedLocation]);

  const pickLocationHandler = (event: any) => {
    const coords = event.nativeEvent.coordinate;

    map.current?.animateToRegion({
      ...focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    setFocusedLocation(prevState => ({
      ...prevState,
      latitude: coords.latitude,
      longitude: coords.longitude,
    }));
    setLocationChosen(true);

    props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const getLocationHandler = () => {
    const coordsEvent = {
      nativeEvent: {
        coordinate: {
          longitude: 1,
          latitude: 1,
        },
      },
    };
    pickLocationHandler(coordsEvent);
  };

  let marker = null;
  if (locationChosen) {
    marker = <Marker coordinate={focusedLocation} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={focusedLocation}
        style={styles.map}
        onPress={pickLocationHandler}
        ref={ref => (map.current = ref)} // * bind class property map with MapView element
      >
        {marker}
      </MapView>
      <View style={styles.button}>
        <Button title="Locate me" onPress={getLocationHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  map: {
    width: '100%',
    height: 250,
  },
  button: {
    margin: 8,
  },
});

export {PickLocation};
