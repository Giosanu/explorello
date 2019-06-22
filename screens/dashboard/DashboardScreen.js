import React, { Component } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import LoadingScreen from "../LoadingScreen";
import { primaryBlue, primaryRed, primaryYellow } from "../../constants/Colors";
import { GoogleApiKey } from "../../config/keys";
import { navigationOptions } from "../../constants/headerStyles";
import firebase from "react-native-firebase";

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

class DashboardScreen extends Component {
  static navigationOptions = navigationOptions;
  componentWillMount() {
    this.setState({ locationPermission: requestLocationPermission() });
    // this.callMeBaby();
  }
  constructor(props) {
    super(props);
    this.state = {
      locationPermission: false,
      loading: false,
      locationAvailable: true,
      position: {
        latitude: 45.78825,
        longitude: -10.4324,
        latitudeDelta: 0.04,
        longitudeDelta: 0.006
      },
      currentCity: "City",
      currentState: "State",
      location: null,
      formattedAddress: []
    };
  }
  getCurrentPosition = () => {
    this.setState({ loading: true });
    if (this.state.locationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            position: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04
            }
          });
          fetch(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
              position.coords.latitude +
              "," +
              position.coords.longitude +
              "&key=" +
              GoogleApiKey +
              "&result_type=locality"
          )
            .then(response => response.json())
            .then(responseJson => {
              let currentCity;
              let currentState;
              let formattedAddress;
              let location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04
              };
              let locationAvailable = true;
              console.log(responseJson)
              if (responseJson.plus_code.compound_code) {
                let result = responseJson.plus_code.compound_code
                  .replace(
                    responseJson.plus_code.compound_code.split(" ")[0] + " ",
                    ""
                  )
                  .split(", ");
                currentCity = result[0];
                currentState = result[result.length - 1];
                if (responseJson.results.length > 0) {
                  if (
                    responseJson.results[0].geometry &&
                    responseJson.results[0].geometry.location
                  ) {
                    location = responseJson.results[0].geometry.location;
                  }
                  formattedAddress = responseJson.results[0].formatted_address
                    .replace(/[0-9]/g, "")
                    .split(",");
                } else {
                  formattedAddress = [currentCity, currentState];
                }
              } else {
                formattedAddress = ["Narnia..", "Sorry, we couldn't find you"];
                locationAvailable = false;
              }
              this.setState({
                currentCity,
                currentState,
                formattedAddress,
                location,
                locationAvailable,
                loading: false
              });
            });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          this.setState({ loading: false });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };
  componentDidMount() {
    this.getCurrentPosition();
  }
  addRoute = () => {
    const { formattedAddress } = this.state;
    console.log('DashboardLocation: ', this.state.location)
    this.props.navigation.navigate("AddRouteLanding", {
      ...this.state.location,
      ...{ formattedAddress }
    });
  };
  render() {
    const { loading } = this.state;
    return !loading ? (
      <View style={{ flex: 1, backgroundColor: primaryBlue, paddingTop: 20 }}>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Montserrat-SemiBold",
              color: "#eee",
              marginBottom: 20
            }}
          >
            {" "}
            Currently visiting{" "}
          </Text>
          {!this.state.locationAvailable ? (
            <Image
              style={{ height: 90, width: 60, marginBottom: 30 }}
              source={require("../../assets/images/narnia.png")}
            />
          ) : (
            <Icon
              style={{ fontSize: 70, color: primaryRed, marginBottom: 30 }}
              name="city"
            />
          )}
          {this.state.formattedAddress.map(fa => (
            <Text
              key={fa}
              style={{
                fontSize: 22,
                color: "#fff",
                marginBottom: 5,
                textAlign: "center",
                fontFamily: "Montserrat-SemiBold",
                maxWidth: "80%"
              }}
            >
              {fa}
            </Text>
          ))}
          <Button
            buttonStyle={{
              backgroundColor: "transparent"
            }}
            title="Update my location"
            titleStyle={{
              fontSize: 18,
              color: primaryBlue,
              fontFamily: "Montserrat-Bold"
            }}
            onPress={this.getCurrentPosition}
            containerStyle={{
              marginTop: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              width: "75%",
              backgroundColor: "#fff", //"rgba(0,48,73,0.9)",
              paddingRight: 10,
              paddingLeft: 10
            }}
          />
          {this.state.locationAvailable && (
            <Button
              buttonStyle={{
                backgroundColor: "transparent"
              }}
              title={`Add route in ${this.state.currentCity}`}
              titleStyle={{
                fontSize: 18,
                color: primaryBlue,
                fontFamily: "Montserrat-Bold"
              }}
              onPress={() => this.addRoute()}
              containerStyle={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                width: "75%",
                backgroundColor: primaryRed, //"rgba(0,48,73,0.9)",
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
          )}
          {this.state.locationAvailable && (
            <Button
              buttonStyle={{
                backgroundColor: "transparent"
              }}
              title={`Search routes in ${this.state.currentCity}`}
              titleStyle={{
                fontSize: 18,
                color: primaryBlue,
                fontFamily: "Montserrat-Bold"
              }}
              onPress={() => this.searchRoute()}
              containerStyle={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                width: "75%",
                backgroundColor: '#F9B332', //"rgba(0,48,73,0.9)",
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
          )}
        </View>
        {/* <View
          style={{
            display: "flex",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            flexDirection: "row",
            justifyContent: "space-between"
            // paddingBottom: 10
          }}
        >
          <View
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "column",
              padding: 20
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
                  fontSize: 22,
                  fontFamily: "Montserrat-SemiBold",
                  maxWidth: "100%"
                }}
              >
                {this.state.currentCity}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Icon
                style={{ fontSize: 18, color: "#444", marginRight: 7 }}
                name="flag"
              />
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "Montserrat-SemiBold",
                  maxWidth: "100%"
                }}
              >
                {this.state.currentState}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Montserrat-SemiBold",
              maxWidth: "100%"
            }}
          >
            {this.state.formattedAddress}
          </Text>
          <View>
            <Button
              buttonStyle={{
                backgroundColor: "transparent"
              }}
              icon={
                <Icon
                  style={{ fontSize: 20, color: "#fff", marginRight: 5 }}
                  name="crosshairs"
                />
              }
              title="Reposition me"
              titleStyle={{
                fontSize: 16,
                color: "#fff",
                fontFamily: "Montserrat-Bold"
              }}
              onPress={this.getCurrentPosition}
              containerStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                backgroundColor: "rgba(0,48,73,0.9)",
                height: 30,
                paddingRight: 10
              }}
            />
            <Button
              buttonStyle={{
                backgroundColor: "transparent"
              }}
              icon={
                <TabBarIcon
                  style={{ fontSize: 18, color: "#fff", marginRight: 5 }}
                  name="map-marker-plus"
                />
              }
              title="Add new route"
              titleStyle={{
                fontSize: 16,
                color: "#fff",
                fontFamily: "Montserrat-Bold"
              }}
              onPress={this.getCurrentPosition}
              containerStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                borderRadius: 15,
                backgroundColor: "#F77F00",
                height: 30,
                paddingRight: 5
              }}
            />
          </View>
        </View>*/}
      </View>
    ) : (
      <LoadingScreen />
    );
  }
}

export default connect(
  null,
  {}
)(DashboardScreen);
