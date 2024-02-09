import React, {FC} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import {authLogout} from '../../store/actions/auth';
import {Dispatch} from 'redux';

type Props = {
  onLogout: () => void;
};

/**
 * Show side drawer menu
 *
 * @param {string} componentId - React Native component id
 *
 * @example
 *
 *     showSideDrawer(props.componentId)
 */
export const showSideDrawer = (componentId: string) => {
  // SideDrawer.isSideDrawerVisible = !SideDrawer.isSideDrawerVisible;
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      left: {
        // visible: SideDrawer.isSideDrawerVisible,
        visible: true,
      },
    },
  });
};

const sideDrawer: FC<Props> = props => (
  <View
    style={[styles.container, {width: Dimensions.get('window').width * 0.8}]}>
    <TouchableOpacity onPress={props.onLogout}>
      <View style={styles.drawItem}>
        <Icon
          name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
          size={30}
          color="#aaa"
          style={styles.drawItemIcon}
        />
        <Text>Sign Out</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  drawItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
  },
  drawItemIcon: {
    marginRight: 10,
  },
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogout: () => dispatch(authLogout()),
});

export const SideDrawer = connect(null, mapDispatchToProps)(sideDrawer);
