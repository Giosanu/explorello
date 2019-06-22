import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import {
  primaryRed,
  primaryYellow,
  primaryBlue,
  white
} from "../../constants/Colors";
import { navigationOptions } from "../../constants/headerStyles";

class AddRouteScreen extends Component {
  static navigationOptions = navigationOptions;
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate, state } = this.props.navigation
    return (
      <View
        style={{
          backgroundColor: primaryBlue,
          flex: 1,
          display: "flex",
          paddingTop: 20,
          alignItems: "center"
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: 32,
              color: "#fff",
              paddingLeft: 15
            }}
          >
            Kudos, explorer!
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            fontSize: 18,
            color: "#ccc",
            paddingLeft: 15,
            paddingTop: 10
          }}
        >
          Let's put a journey together.
        </Text>
        <Image
          style={{
            width: 100,
            height: 50
          }}
          source={require("../../assets/images/kudos.png")}
        />
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            fontSize: 18,
            color: "#fff",
            paddingLeft: 15
          }}
        >
          1. Choose this option if you've{" "}
          <Text style={{ color: primaryRed }}>already traveled</Text> and you
          want to share it with others.
        </Text>
        <Button
          title="Add route manually"
          buttonStyle={{
            backgroundColor: "transparent"
          }}
          onPress={() => navigate("AddRouteManually", state.params)}
          containerStyle={{
            marginTop: 20,
            backgroundColor: "#fff",
            width: "80%",
            borderRadius: 15
          }}
          titleStyle={{
            color: primaryRed,
            fontFamily: "Montserrat-Bold",
            fontSize: 20
          }}
        />
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            fontSize: 18,
            color: "#fff",
            paddingLeft: 15,
            paddingTop: 30
          }}
        >
          2. Choose this option if you're{" "}
          <Text style={{ color: primaryYellow }}>currently traveling</Text> and
          you want to add waypoints as you go.
        </Text>
        <Button
          title="Add route while traveling"
          buttonStyle={{
            backgroundColor: "transparent"
          }}
          containerStyle={{
            marginTop: 20,
            backgroundColor: "#fff",
            width: "80%",
            borderRadius: 15
          }}
          titleStyle={{
            color: primaryBlue,
            fontFamily: "Montserrat-Bold",
            fontSize: 20
          }}
        />
        <Text
          style={{
            fontFamily: "Montserrat-Regular",
            fontSize: 14,
            color: "#fff",
            paddingLeft: 15,
            paddingTop: 30,
            textAlign: "center"
          }}
        >
          If you're uncertain choose the first option, you'll understand, you're
          a smart fella'.
        </Text>
      </View>
    );
  }
}

export default connect(
  null,
  {}
)(AddRouteScreen);
