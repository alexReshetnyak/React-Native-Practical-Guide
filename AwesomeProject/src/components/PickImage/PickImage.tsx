import React, {useState, useEffect, FC} from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import {CameraOptions, launchCamera} from 'react-native-image-picker';

type Props = {
  onImagePicked: (data: any) => void;
  control: any;
};

const PickImage: FC<Props> = ({control, onImagePicked}) => {
  const [pickedImage, setPickedImage] = useState(null as any);

  useEffect(() => {
    if (control.value !== pickedImage && control.value !== pickedImage) {
      setPickedImage(control.value);
    }
  }, [control.value, pickedImage]);

  const pickImageHandler = async () => {
    const options: CameraOptions = {
      cameraType: 'back',
      mediaType: 'photo',
      quality: 0.5,
    };

    try {
      const result = await launchCamera(options);
      result.didCancel && console.log('User cancelled!');

      if (!result.assets?.[0]) {
        return;
      }

      setPickedImage({uri: result.assets[0].uri});
      onImagePicked({
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Image source={pickedImage} style={styles.previewImage} />
      </View>

      <View style={styles.button}>
        <Button title="Pick Image" onPress={pickImageHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 200,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});

export {PickImage};
