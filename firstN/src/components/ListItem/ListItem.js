import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListItem = ({ placeName }) => (
    <View style={styles.listItem}>
        <Text>{placeName}</Text>
    </View>
);

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        marginTop: 5,
        backgroundColor: '#eee'
    }
});

export { ListItem };
