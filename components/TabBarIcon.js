import React from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        style={{ marginBottom: -3, fontSize: 32 }}
        color={this.props.focused ? '#333' : '#bbb'}
      />
    );
  }
}