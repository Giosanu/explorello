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

class AddRouteScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      borderWidth: 0,
      shadowRadius: 0,
      elevation: 0,
      backgroundColor: primaryBlue,
      height: 70
    },
    headerTitle: (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          borderWidth: 0,
          flexDirection: "row",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Image
          style={{ width: 190, maxHeight: 50, marginBottom: 20, marginTop: 20 }}
          source={require("../../assets/images/logoWhite.png")}
        />
      </View>
    )
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
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
              fontSize: 24,
              paddingLeft: 15,
              paddingTop: 20
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
          Let's guide others to the treasure of traveling.
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            fontSize: 18,
            paddingLeft: 15,
            paddingTop: 30
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
          onPress={() => navigate("AddRouteManually")}
          containerStyle={{ marginTop: 20, backgroundColor: primaryRed }}
          titleStyle={{
            color: white,
            fontFamily: "Montserrat-Bold",
            fontSize: 20
          }}
        />
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            fontSize: 18,
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
          containerStyle={{ marginTop: 20, backgroundColor: primaryYellow }}
          titleStyle={{
            color: white,
            fontFamily: "Montserrat-Bold",
            fontSize: 20
          }}
        />
        <Text
          style={{
            fontFamily: "Montserrat-Regular",
            fontSize: 14,
            color: "#888",
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
