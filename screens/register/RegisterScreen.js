import React, { Component } from "react";
import { RegisterStyles } from "./RegisterStyles";
import { ImageBackground, Image, View, TextInput } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { connect } from "react-redux";
import { register } from "./RegisterActions";
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
    const { email, password, confirmPassword } = this.state;
    this.props.register(email, password, confirmPassword, this.props.navigation.navigate);
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={{ flex: 1, backgroundColor: "rgba(0,48,73,0.9)" }}>
        <View style={RegisterStyles.content}>
          <Image
            style={{ width: "90%", maxHeight: 140, marginTop: 40 }}
            source={require("../../assets/images/logo.png")}
          />
          <View style={RegisterStyles.form}>
            <View style={RegisterStyles.item}>
              <Text style={RegisterStyles.label}> E-mail </Text>
              <Input
                leftIcon={
                  <Icon
                    style={{ fontSize: 18, color: "#888", marginRight: 10 }}
                    name="envelope"
                  />
                }
                inputStyle={{ fontFamily: "Montserrat-Regular" }}
                inputContainerStyle={RegisterStyles.input}
                onChangeText={email => this.setState({ email })}
              />
              <Text style={RegisterStyles.label}> Password </Text>
              <Input
                leftIcon={
                  <Icon
                    style={{ fontSize: 18, color: "#888", marginRight: 10 }}
                    name="lock"
                  />
                }
                inputStyle={{ fontFamily: "Montserrat-Regular" }}
                secureTextEntry
                inputContainerStyle={RegisterStyles.input}
                onChangeText={password => this.setState({ password })}
              />
              <Text style={RegisterStyles.label}> Confirm password </Text>
              <Input
                leftIcon={
                  <Icon
                    style={{ fontSize: 18, color: "#888", marginRight: 10 }}
                    name="lock"
                  />
                }
                inputStyle={{ fontFamily: "Montserrat-Regular" }}
                secureTextEntry
                inputContainerStyle={RegisterStyles.input}
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
              />
            </View>
            <View style={{ ...RegisterStyles.item, ...{ paddingTop: 20 } }}>
              <Button
                buttonStyle={{ backgroundColor: "transparent", width: "100%" }}
                containerStyle={RegisterStyles.loginButton}
                titleStyle={RegisterStyles.text}
                title="Register"
                onPress={this.onSubmit}
                primary
              />
            </View>
            <View style={{ ...RegisterStyles.item, ...{ paddingTop: 20 } }}>
              <Button
                buttonStyle={{ backgroundColor: "transparent", width: "100%" }}
                containerStyle={{ backgroundColor: 'transparent', display:'flex', justifyContent:'center'}}
                titleStyle={{fontFamily:'Montserrat-Regular', fontSize: 16, color: '#eee'}}
                title="Take me back to login"
                onPress={() => navigate('Login')}
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
  null,
  { register }
)(LoginScreen);
