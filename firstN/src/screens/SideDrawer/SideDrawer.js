import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';


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
      <View>
        <Text>Side Drawer</Text>
        <Text>Side Drawer</Text>
        <Text>Side Drawer</Text>
        <Text>Side Drawer</Text>
        <Text>Side Drawer</Text>
        <Text>Side Drawer</Text>
        <Text>Side Drawer</Text>
        <Text>Side Drawer</Text>
        <Text>Side Drawer</Text>
        <Text>Side Drawer</Text>
      </View>
    );
  }
}
 
export { SideDrawer };