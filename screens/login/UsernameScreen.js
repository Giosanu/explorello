import React, { Component } from "react";
import { LoginStyles } from "./LoginStyles";
import { ImageBackground, Image, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import { addUserName } from "./LoginActions";
import Icon from "react-native-vector-icons/FontAwesome5";
import { primaryRed, primaryYellow, primaryBlue } from "../../constants/Colors";

class UsernameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }
  onSubmit = () => {
    const { username } = this.state;
    const { state, navigate } = this.props.navigation;
    this.props.addUserName(username, state.params.uid, navigate);
  };
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1, backgroundColor: primaryBlue }}>
        <View style={LoginStyles.content}>
          <View
            style={{
              width: "100%",
              height: 120,
              display: "flex",
              justifyContent: "center",
              textAlign: "center"
            }}
            source={require("../../assets/images/kudos.png")}
          >
            <Text
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <Icon style={{ fontSize: 60, color: primaryRed }} name="hiking" />
            </Text>
          </View>
          <View style={LoginStyles.form}>
            <Text
              style={{
                display: "flex",
                fontSize: 16,
                marginTop: 20,
                textAlign: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "Montserrat-SemiBold"
              }}
            >
              Glad you joined the trip! One more step before we're set, choose a <Text
                style={{
                  color: primaryYellow
                }}
              >
                name
              </Text> that will be <Text
                style={{
                  color: primaryYellow
                }}
              >
                visible to others.
              </Text>
            </Text>

            <View style={[LoginStyles.form, { marginTop: 30 }]}>
              <Input
                placeholder="Your traveler name"
                inputStyle={{
                  fontFamily: "Montserrat-Regular",
                  textAlign: "center"
                }}
                inputContainerStyle={[LoginStyles.input, { paddingTop: 5 }]}
                onChangeText={username => this.setState({ username })}
              />
            </View>
            <View style={LoginStyles.item}>
              <Button
                buttonStyle={{ backgroundColor: "transparent", width: "100%" }}
                containerStyle={[
                  LoginStyles.loginButton,
                  { backgroundColor: "transparent" }
                ]}
                titleStyle={[LoginStyles.text, { color: primaryRed }]}
                title="Let's begin"
                onPress={this.onSubmit}
                primary
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.login.isAuthenticated
  }),
  { addUserName }
)(UsernameScreen);
