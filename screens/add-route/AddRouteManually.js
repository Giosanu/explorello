import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image, Button } from "react-native-elements";
import {
  primaryBlue,
  primaryRed,
  primaryYellow,
  white
} from "../../constants/Colors";
import { fetchLatLngByPlaceId } from "./AddRouteActions";
import MapViewDirections from "react-native-maps-directions";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { mapStyle } from "../../constants/Styles";
import { connect } from "react-redux";
import TabBarIcon from "../../components/TabBarIcon";
import { GoogleApiKey } from "../../config/keys";

class AddRouteManually extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      cityConfirmed: false,
      startedRoute: false,
      endedRoute: false,
      markers: []
    };
  }
  static navigationOptions = {
    headerLeft: null,
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
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={false}
          region={this.state.location}
          style={{ flex: 1 }}
          customMapStyle={mapStyle}
        >
          {this.state.endedRoute && (
            <MapViewDirections
              strokeWidth={4}
              strokeColor={primaryBlue}
              origin={{
                longitude: this.state.markers[0].longitude,
                latitude: this.state.markers[0].latitude
              }}
              waypoints={this.state.markers.map((m, i) => {
                if (i !== 0 || i !== this.state.markers.length) {
                  return {
                    longitude: m.longitude,
                    latitude: m.latitude
                  };
                }
              })}
              destination={{
                longitude: this.state.markers[this.state.markers.length - 1]
                  .longitude,
                latitude: this.state.markers[this.state.markers.length - 1]
                  .latitude
              }}
              apikey={GoogleApiKey}
            />
          )}
          {this.state.location &&
            this.state.cityConfirmed &&
            this.state.markers.map((marker, index) => (
              <Marker
                coordinate={marker}
                key={index}
                draggable
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
                  newMarkers.map(m =>
                    console.log(m.latitude + " " + m.longitude)
                  );

                  this.setState({ markers: newMarkers });
                }}
              />
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
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
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
              this.setState({
                location: {
                  longitude: details.geometry.location.lng,
                  latitude: details.geometry.location.lat,
                  longitudeDelta: 0.03,
                  latitudeDelta: 0.04
                },
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
          {this.state.location ? (
            !this.state.cityConfirmed && (
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
            )
          ) : (
            <Text
              style={{
                fontSize: 20,
                color: "#ff4d00",
                backgroundColor: "#fff",
                width: "100%",
                paddingTop: 10,
                paddingBottom: 10,
                textAlign: "center",
                fontFamily: "Montserrat-Bold"
              }}
            >
              {" "}
              First, let's choose the city{" "}
            </Text>
          )}
          {this.state.location &&
            this.state.cityConfirmed &&
            !this.state.startedRoute && (
              <Button
                buttonStyle={{
                  backgroundColor: "transparent"
                }}
                title="Place the pin at the start and let's go!"
                titleStyle={{
                  fontSize: 15,
                  color: "#ff4d00",
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
                  width: "100%",
                  backgroundColor: "#fff",
                  height: 40,
                  paddingRight: 5
                }}
              />
            )}
          {this.state.location &&
            this.state.cityConfirmed &&
            this.state.startedRoute && (
              <View
                style={{
                  marginBottom: 20,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  buttonStyle={{
                    backgroundColor: "transparent"
                  }}
                  title="Add waypoint"
                  titleStyle={{
                    fontSize: 15,
                    color: "#fff",
                    fontFamily: "Montserrat-Bold"
                  }}
                  onPress={() => {
                    this.setState({
                      markers: [...this.state.markers, this.state.location]
                    });
                  }}
                  containerStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "45%",
                    borderRadius: 25,
                    backgroundColor: "#ff4d00",
                    height: 40,
                    paddingRight: 5
                  }}
                />
                <Button
                  buttonStyle={{
                    backgroundColor: "transparent"
                  }}
                  title="End route"
                  titleStyle={{
                    fontSize: 15,
                    color: "#ff4d00",
                    fontFamily: "Montserrat-Bold"
                  }}
                  onPress={() => {
                    this.setState({ endedRoute: true });
                    console.log(this.state.markers);
                  }}
                  containerStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "45%",
                    borderRadius: 25,
                    backgroundColor: "#fff",
                    height: 40,
                    paddingRight: 5
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
  { fetchLatLngByPlaceId }
)(AddRouteManually);
