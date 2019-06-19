import React, { Component } from "react";
import { LoginStyles } from "./LoginStyles";
import { ImageBackground, Image, View, TextInput } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { connect } from "react-redux";
import { signIn } from "./LoginActions";
import Icon from "react-native-vector-icons/FontAwesome";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  onSubmit = () => {
    const { email, password } = this.state;
    this.props.signIn(email, password, this.props.navigation.navigate);
    this.props.navigation.navigate("Dashboard")
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: "rgba(0,48,73,0.9)" }}>
        <View style={LoginStyles.content}>
          <Image
            style={{ width: "90%", maxHeight: 140, marginTop: 40 }}
            source={require("../../assets/images/logo.png")}
          />
          <View style={LoginStyles.form}>
            <View style={LoginStyles.item}>
              <Text style={LoginStyles.label}> E-mail </Text>
              <Input
                leftIcon={
                  <Icon
                    style={{ fontSize: 18, color: "#888", marginRight: 10 }}
                    name="envelope"
                  />
                }
                inputStyle={{fontFamily: 'Montserrat-Regular'}}
                inputContainerStyle={LoginStyles.input}
                onChangeText={email => this.setState({ email })}
              />
              <Text style={LoginStyles.label}> Password </Text>
              <Input
                leftIcon={
                  <Icon style={{ fontSize: 18, color: "#888", marginRight: 10 }} name="lock" />
                }
                inputStyle={{fontFamily: 'Montserrat-Regular'}}
                secureTextEntry
                inputContainerStyle={LoginStyles.input}
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <View style={{ ...LoginStyles.item, ...{ paddingTop: 20 } }}>
              <Button
                buttonStyle={{ backgroundColor: "transparent", width: '100%' }}
                containerStyle={LoginStyles.loginButton}
                titleStyle={LoginStyles.text}
                title="Login"
                onPress={this.onSubmit}
                primary
              />
              <Text style={LoginStyles.outsideTextUp}>Not a member?</Text>
              <Text style={LoginStyles.outsideTextBottom}>Sign up with one of the methods below</Text>
              <View style={{display: 'flex', width:'100%', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                <Button
                  buttonStyle={{
                    backgroundColor: "transparent",
                    width: '100%'
                  }}
                  containerStyle={LoginStyles.signUpButton}
                  onPress={() => navigate("Register")}
                  primary
                  titleStyle={LoginStyles.bottomButtonsText}
                  title="Email"
                />
                <Button
                  buttonStyle={{
                    backgroundColor: "transparent",
                    width: '100%'
                  }}
                  titleStyle={LoginStyles.bottomButtonsText}
                  containerStyle={LoginStyles.facebookButton}
                  icon={
                    <Icon style={LoginStyles.facebookIcon} name="facebook" />
                  }
                  title="acebook"
                />
                <Button
                  buttonStyle={{
                    backgroundColor: "transparent",
                    width: '100%'
                  }}
                  titleStyle={LoginStyles.bottomButtonsText}
                  containerStyle={LoginStyles.googleButton}
                  icon={<Icon style={LoginStyles.googleIcon} name="google" />}
                  title="oogle"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { signIn }
)(LoginScreen);
