import React, { Component } from "react";
import { View, Text, Button, Image, ImageBackground } from "react-native";
import { connect } from "react-redux";

class AddRouteScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      borderWidth: 0,
      shadowRadius: 0,
      elevation: 0,
      paddingTop: 10,
      marginBottom: 10,
      borderBottomColor: "#eee",
      borderBottomWidth: 1,
      height: 70
    },
    headerTitle: (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          borderWidth: 0,
          display: "flex",
          alignItems: "center"
        }}
        source={require("../../assets/images/loginBackground4.png")}
      >
        <Image
          style={{ width: 190, maxHeight: 50, marginBottom: 20, marginTop: 20 }}
          source={require("../../assets/images/logoSimple.png")}
        />
      </View>
    )
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text> lol </Text>
      </View>
    );
  }
}

export default connect(
  null,
  {}
)(AddRouteScreen);
