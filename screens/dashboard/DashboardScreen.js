import React, { Component } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/FontAwesome5";
import MapViewDirections from "react-native-maps-directions";
import { mapStyle } from "../../constants/Styles";
import TabBarIcon from "../../components/TabBarIcon";
import LoadingScreen from "../LoadingScreen";
import { primaryBlue } from "../../constants/Colors";
import { GoogleApiKey } from "../../config/keys";

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };

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
          display: "flex",
          alignItems: "center"
        }}
        source={require("../../assets/images/loginBackground4.png")}
      >
        <Image
          style={{ width: 190, maxHeight: 50, marginBottom: 20, marginTop: 20 }}
          source={require("../../assets/images/logoWhite.png")}
        />
      </View>
    )
  };
  componentWillMount() {
    this.setState({ locationPermission: requestLocationPermission() });
  }
  constructor(props) {
    super(props);
    this.state = {
      locationPermission: false,
      loading: false,
      position: {
        latitude: 45.78825,
        longitude: -10.4324,
        latitudeDelta: 0.04,
        longitudeDelta: 0.006
      },
      currentCity: "Welcome, explorer!"
    };
  }
  getCurrentPosition = () => {
    this.setState({loading: true})
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
              "&key=" + GoogleApiKey + "&result_type=locality"
          )
            .then(response => response.json())
            .then(responseJson => {
              this.setState({
                currentCity:
                  responseJson.plus_code.compound_code.split(" ")[1] +
                  " " +
                  responseJson.plus_code.compound_code.split(" ")[2],
                  loading: false
              });
            });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          this.setState({loading: false})
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };
  componentDidMount() {
    this.getCurrentPosition();
  }
  render() {
    const { loading } = this.state
    return (
      !loading ? <View style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            flexDirection: "row",
            justifyContent: "space-between",
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
              <Icon
                style={{ fontSize: 18, color: "#444", marginRight: 10 }}
                name="city"
              />
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "Montserrat-SemiBold",
                  maxWidth: "100%"
                }}
              >
                {this.state.currentCity.split(",")[0]}
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
                {this.state.currentCity.split(",")[1]}
              </Text>
            </View>
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
                width: '100%',
                borderRadius: 15,
                backgroundColor: "#F77F00",
                height: 30,
                paddingRight: 5
              }}
            />
            <Button
              buttonStyle={{
                backgroundColor: "transparent"
              }}
              icon={
                <TabBarIcon
                  style={{ fontSize: 22, color: "#fff", marginRight: 5 }}
                  name="star"
                />
              }
              title="Add to favorite"
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
                backgroundColor: "#bfd74a",
                height: 30,
                borderRadius: 15,
                paddingRight: 5
              }}
            />
          </View>
          <View
            style={{
              overflow: "hidden",
              width: 200,
              height: 200,
              // borderBottomLeftRadius: 100,
              alignSelf: "flex-end",
              // marginBottom: 10
            }}
          >
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ width: 200, height: 200 }}
              showsMyLocationButton={false}
              region={this.state.position}
              onPress={() => alert("Zoooooom")}
              customMapStyle={mapStyle}
            >
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey="AIzaSyD1sWhU-o3qsbZggogkKh9ovPHqf9y62B4"
              />
              <Marker draggable coordinate={this.state.position}>
                <Image
                  source={require("../../assets/images/pinRed.png")}
                  style={{ width: 32, height: 50 }}
                />
              </Marker>
            </MapView>
          </View>
        </View>
      </View> : <LoadingScreen />
    );
  }
}

export default connect(
  null,
  {}
)(DashboardScreen);
