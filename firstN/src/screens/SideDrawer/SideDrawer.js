import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Dimensions, 
  StyleSheet, 
  TouchableOpacity,
  Platform 
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
  // static isSideDrawerVisible = false;
  /**
   * Show side drawer menu
   *
   * @param {string} componentId - React Native component id
   *
   * @example
   *
   *     showSideDrawer(this.props.componentId)
   */
  static showSideDrawer = componentId => {
    // SideDrawer.isSideDrawerVisible = !SideDrawer.isSideDrawerVisible;
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          // visible: SideDrawer.isSideDrawerVisible,
          visible: true,
        }
      }
    });
  }

  render() {
    return (
      <View style={[styles.container, {width: Dimensions.get('window').width * 0.8}]}>
        <TouchableOpacity>
          <View style={styles.drawItem}>
            <Icon 
              name={Platform.OS ==='ios'?'ios-log-out':'md-log-out'}
              size={30} 
              color='#aaa'
              style={styles.drawItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: 'white',
    flex: 1
  },
  drawItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: 'lightgrey'
  },
  drawItemIcon: {
    marginRight: 10
  }
});
 
export { SideDrawer };