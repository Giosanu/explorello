import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import Modal from "react-native-modal";
import { Image, Button } from "react-native-elements";
import {
  primaryBlue,
  primaryRed,
  primaryYellow,
  white,
  stridentRed
} from "../../constants/Colors";
import { storeRoute } from "./AddRouteActions";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { mapStyle } from "../../constants/Styles";
import { connect } from "react-redux";
import TabBarIcon from "../../components/TabBarIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GoogleApiKey } from "../../config/keys";
import { navigationOptions } from "../../constants/headerStyles";
import { informativeToast } from "../../constants/Functions";

class AddRouteManually extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      showEndModal: false,
      cityConfirmed: false,
      formattedAddress: "",
      startedRoute: false,
      endedRoute: false,
      markers: []
    };
  }
  componentDidMount() {
    const { state } = this.props.navigation;
    console.log(state.params);
    if (state.params) {
      this.setState({
        location: {
          longitude: state.params.lng,
          latitude: state.params.lat,
          longitudeDelta: 0.01,
          latitudeDelta: 0.022
        },
        cityConfirmed: true,
        formattedAddress: state.params.formattedAddress,
        markers: [
          {
            longitude: state.params.lng,
            latitude: state.params.lat,
            longitudeDelta: 0.01,
            latitudeDelta: 0.022
          }
        ]
      });
    }
  }
  static navigationOptions = {
    ...navigationOptions,
    ...{
      headerLeft: props => {
        return (
          <Button
            containerStyle={{ backgroundColor: "transparent" }}
            buttonStyle={{ backgroundColor: "transparent" }}
            title=""
            onPress={props.onPress}
            icon={
              <Icon name="arrow-left" style={{ color: "#fff", fontSize: 24 }} />
            }
          />
        );
      },
      headerRight: <View />
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal isVisible={this.state.showEndModal}>
          <View
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                textAlign: "center",
                fontFamily: "Montserrat-Regular"
              }}
            >
              Continue to the next step?
            </Text>
            <View
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                paddingTop: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                buttonStyle={{
                  backgroundColor: "transparent"
                }}
                containerStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100,
                  marginRight: 40,
                  borderRadius: 25,
                  backgroundColor: "#eee",
                  height: 40
                }}
                title="No"
                titleStyle={{
                  fontSize: 15,
                  color: primaryBlue,
                  fontFamily: "Montserrat-Bold"
                }}
                onPress={() =>
                  this.setState({ showEndModal: false, endedRoute: true })
                }
              />
              <Button
                buttonStyle={{
                  backgroundColor: "transparent"
                }}
                containerStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100,
                  borderRadius: 25,
                  backgroundColor: "#ff4d00",
                  height: 40
                }}
                title="Yes"
                titleStyle={{
                  fontSize: 15,
                  color: "#fff",
                  fontFamily: "Montserrat-Bold"
                }}
                onPress={() =>
                  this.setState(
                    { showEndModal: false, endedRoute: true },
                    () => {
                      setTimeout(
                        () =>
                          this.props.navigation.navigate(
                            "EndAddRoute",
                            this.state.markers
                          ),
                        1000
                      );
                      this.props.storeRoute({
                        markers: this.state.markers,
                        formattedAddress: this.state.formattedAddress
                      });
                    }
                  )
                }
              />
            </View>
          </View>
        </Modal>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={false}
          region={this.state.location}
          style={{ flex: 1 }}
          onRegionChangeComplete={location => this.setState({ location })}
          customMapStyle={mapStyle}
        >
          {this.state.location &&
            this.state.cityConfirmed &&
            this.state.markers.map((marker, index) => (
              <Marker
                coordinate={marker}
                key={index}
                draggable
                tracksViewChanges={false}
                onDragEnd={e => {
                  let newMarkers = [];
                  this.state.markers.map((mark, ind) => {
                    if (index !== ind) {
                      newMarkers.push(mark);
                    } else {
                      newMarkers.push({
                        longitude: e.nativeEvent.coordinate.longitude,
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitudeDelta: 0.03,
                        latitudeDelta: 0.04
                      });
                    }
                  });

                  this.setState({ markers: newMarkers });
                }}
                title={`${index+1}`}
                pinColor={
                  (index === 0 && stridentRed) ||
                  ((index !== this.state.markers.length - 1) && primaryBlue) ||
                  primaryYellow
                }
              />
              /* <ImageBackground
                  style={{
                    width: 35,
                    height: 50,
                    display: "flex",
                    alignItems: "center"
                  }}
                  source={
                    (index === 0 &&
                      require(`../../assets/images/thickPin.png`)) ||
                    (index === this.state.markers.length - 1 &&
                      require(`../../assets/images/thickYellow.png`)) ||
                    require(`../../assets/images/thickBlue.png`)
                  }
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Montserrat-Black",
                      color:
                        (index === 0 && "#fff") ||
                        (index === this.state.markers.length - 1 &&
                          primaryBlue) ||
                        "#f9b332"
                    }}
                  >
                    {(index === 0 && "S") ||
                      (index === this.state.markers.length - 1 && "E") ||
                      index}
                  </Text>
                </ImageBackground> 
              </Marker>*/
            ))}
        </MapView>
        <View
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            left: 0
          }}
        >
          {!this.state.cityConfirmed && (
            <View
              style={{
                flex: 1,
                backgroundColor: "#14445A",
                borderWidth: 0,
                position: "relative"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#ff4d00",
                  position: "absolute",
                  width: "100%",
                  top: "40%",
                  paddingTop: 10,
                  paddingBottom: 10,
                  textAlign: "center",
                  fontFamily: "Montserrat-Bold"
                }}
              >
                First, let's choose the city
              </Text>
              <GooglePlacesAutocomplete
                placeholder="Search city here.."
                minLength={2}
                autoFocus={false}
                returnKeyType={"default"}
                listViewDisplayed={!this.state.location}
                currentLocationLabel="Current location"
                query={{
                  key: "AIzaSyD1sWhU-o3qsbZggogkKh9ovPHqf9y62B4"
                }}
                styles={{
                  container: {
                    fontFamily: "Montserrat-SemiBold"
                  },
                  textInputContainer: {
                    width: "100%",
                    borderRadius: 25,
                    borderWidth: 0,
                    borderTopColor: primaryBlue,
                    marginTop: 0,
                    paddingRight: 20,
                    paddingLeft: 20,
                    paddingTop: 20,
                    backgroundColor: "transparent",
                    fontFamily: "Montserrat-SemiBold",
                    height: 50
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: "#5d5d5d",
                    borderWidth: 0,
                    fontSize: 20,
                    paddingRight: 10,
                    paddingLeft: 20,
                    borderRadius: 25,
                    fontFamily: "Montserrat-Bold"
                  },
                  description: {
                    fontSize: 16,
                    backgroundColor: "#fff",
                    color: "#444",
                    fontFamily: "Montserrat-SemiBold"
                  },
                  row: {
                    backgroundColor: "#fff"
                  },
                  listView: {
                    marginTop: 35,
                    backgroundColor: "#fff"
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb"
                  }
                }}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log(details);
                  this.setState({
                    location: {
                      longitude: details.geometry.location.lng,
                      latitude: details.geometry.location.lat,
                      longitudeDelta: 0.03,
                      latitudeDelta: 0.04
                    },
                    cityConfirmed: true,
                    formattedAddress: details.formatted_address.split(", "),
                    markers: [
                      {
                        longitude: details.geometry.location.lng,
                        latitude: details.geometry.location.lat,
                        longitudeDelta: 0.03,
                        latitudeDelta: 0.04
                      }
                    ]
                  });
                }}
                currentLocation={false}
              />
            </View>
          )}
          {this.state.location && !this.state.cityConfirmed && (
            <Button
              buttonStyle={{
                backgroundColor: "transparent"
              }}
              icon={
                <TabBarIcon
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    color: "#ff4d00",
                    marginLeft: 5
                  }}
                  name="check"
                />
              }
              iconRight
              title="Yep, this is the city"
              titleStyle={{
                fontSize: 20,
                color: "#ff4d00",
                fontFamily: "Montserrat-Bold"
              }}
              onPress={() => {
                this.setState({
                  cityConfirmed: true
                });
              }}
              containerStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                backgroundColor: "#fff",
                height: 40,
                paddingRight: 5
              }}
            />
          )}
          {this.state.location &&
            this.state.cityConfirmed &&
            !this.state.startedRoute && (
              <View
                style={{
                  display: "flex",
                  height: "100%",
                  paddingBottom: 20,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "white",
                    fontFamily: "Montserrat-Light",
                    fontSize: 18
                  }}
                >
                  Hold the pin and then drag it to the starting point of your
                  route.
                </Text>
                <Button
                  buttonStyle={{
                    backgroundColor: "transparent",
                    width: "100%"
                  }}
                  title="Start route"
                  titleStyle={{
                    fontSize: 15,
                    color: "#fff",
                    fontFamily: "Montserrat-Bold"
                  }}
                  onPress={() => {
                    this.setState({
                      startedRoute: true
                    });
                  }}
                  containerStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "80%",
                    borderRadius: 15,
                    backgroundColor: "#ff4d00",
                    height: 40
                  }}
                />
              </View>
            )}
          {this.state.location &&
            this.state.cityConfirmed &&
            this.state.startedRoute && (
              <View
                style={{
                  paddingBottom: 20,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  buttonStyle={{
                    backgroundColor: "transparent"
                  }}
                  containerStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "45%",
                    borderRadius: 25,
                    backgroundColor: primaryBlue,
                    height: 40,
                    paddingRight: 5
                  }}
                  title="Add waypoint"
                  titleStyle={{
                    fontSize: 15,
                    color: "#f9b332",
                    fontFamily: "Montserrat-Bold"
                  }}
                  onPress={() => {
                    if (this.state.markers.length < 2) {
                      informativeToast(
                        "Hint: the more waypoints you add, the more accurate the route will be!"
                      );
                    }
                    this.setState({
                      markers: [...this.state.markers, this.state.location]
                    });
                  }}
                />
                <Button
                  buttonStyle={{
                    backgroundColor: "transparent",
                    width: "100%",
                    borderRadius: 25
                  }}
                  disabled={this.state.markers.length === 1}
                  disabledStyle={{
                    backgroundColor: "#eee"
                  }}
                  title="End route"
                  titleStyle={{
                    fontSize: 15,
                    color: primaryBlue,
                    fontFamily: "Montserrat-Bold"
                  }}
                  onPress={() => {
                    this.setState({ showEndModal: true });
                  }}
                  containerStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "45%",
                    borderRadius: 25,
                    backgroundColor: "#f9b332",
                    height: 40
                  }}
                />
              </View>
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default connect(
  null,
  { storeRoute }
)(AddRouteManually);
