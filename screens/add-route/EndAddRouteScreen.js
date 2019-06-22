import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ImageBackground,
  ScrollView
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { navigationOptions } from "../../constants/headerStyles";
import { connect } from "react-redux";
import {
  storeRoute,
  computeCenter,
  fetchPOI,
  submitRoute
} from "./AddRouteActions";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { routeMapStlye } from "../../constants/Styles";
import { GoogleApiKey } from "../../config/keys";
import {
  primaryRed,
  primaryBlue,
  primaryYellow,
  stridentRed
} from "../../constants/Colors";
import LoadingScreen from "../LoadingScreen";
import { errorToast, successToast } from "../../constants/Functions";

let goBack;

class EndAddRoute extends React.Component {
  state = {
    mapLoading: true,
    confirmed: false,
    routeLoading: true,
    goBack: null,
    name: "",
    distance: 0,
    description: "",
    duration: 0
  };
  static navigationOptions = {
    ...navigationOptions,
    ...{
      headerLeft: props => {
        goBack = props.onPress;
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
  addRoute = () => {
    const { route, routeCenter, userUID, navigation } = this.props;
    const { distance, duration, name, description } = this.state;
    this.setState({ confirmed: true });
    this.props.submitRoute({
      route,
      routeCenter,
      distance,
      duration,
      name,
      userUID,
      description
    }, navigation.navigate);
  };
  componentDidMount() {
    // this.props.route.markers.map(r =>
    //   this.props.fetchPOI(r.latitude, r.longitude)
    // );
    // this.props.fetchPOI(this.props.route.markers);
    const { route, computeCenter } = this.props;
    computeCenter(route.markers);
  }
  render() {
    const { markers, formattedAddress } = this.props.route;
    const { loading, routeCenter } = this.props;
    console.log(
      "ROUTE_CENTER ROUTE_CENTER ROUTE_CENTER ROUTE_CENTER ROUTE_CENTER ROUTE_CENTER ROUTE_CENTER ",
      routeCenter
    );
    const {
      mapLoading,
      routeLoading,
      distance,
      duration,
      confirmed
    } = this.state;
    return (
      <View style={styles.container}>
        {(mapLoading || loading || routeLoading) && (
          <LoadingScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              flex: 1,
              width: "100%",
              height: "100%"
            }}
          />
        )}
        <MapView
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={false}
          onMapReady={() => this.setState({ mapLoading: false })}
          loadingEnabled={true}
          liteMode
          scrollEnabled
          loadingIndicatorColor={primaryYellow}
          region={routeCenter}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.1,
            top: mapLoading ? "-100%" : 0,
            position: "absolute"
          }}
          onRegionChangeComplete={location => this.setState({ location })}
          customMapStyle={routeMapStlye}
        >
          <MapViewDirections
            strokeWidth={6}
            strokeColor={primaryRed}
            mode="WALKING"
            onReady={({ distance, duration }) =>
              this.setState({ routeLoading: false, distance, duration })
            }
            onError={error => errorToast(error)}
            origin={markers[0]}
            waypoints={markers.map(
              (m, i) => (i !== 0 || i !== markers.length) && m
            )}
            destination={markers[markers.length - 1]}
            apikey={GoogleApiKey}
          />
          {markers.map((marker, index) => (
            <Marker
              coordinate={marker}
              key={index}
              tracksViewChanges={false}
              pinColor={
                index === 0 || index === markers.length
                  ? primaryRed
                  : primaryBlue
              }
            >
              <ImageBackground
                style={{
                  width: 25,
                  height: 35,
                  display: "flex",
                  alignItems: "center"
                }}
                source={
                  (index === 0 &&
                    require(`../../assets/images/thickPin.png`)) ||
                  (index === markers.length - 1 &&
                    require(`../../assets/images/thickYellow.png`)) ||
                  require(`../../assets/images/thickBlue.png`)
                }
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Montserrat-Black",
                    color:
                      (index === 0 && "#fff") ||
                      (index === markers.length - 1 && primaryBlue) ||
                      "#f9b332"
                  }}
                >
                  {(index === 0 && "S") ||
                    (index === markers.length - 1 && "E") ||
                    index}
                </Text>
              </ImageBackground>
            </Marker>
          ))}
        </MapView>
        {!(mapLoading || loading || routeLoading) && !confirmed && (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 20,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: 20,
                width: "100%"
              }}
            >
              {this.props.route.formattedAddress.map(p => (
                <Text
                  key={p}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: 26,
                    fontFamily: "Montserrat-Black",
                    color: primaryBlue
                  }}
                >
                  {p}
                </Text>
              ))}
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  paddingTop: 15,
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <Text
                  style={{
                    width: "50%",
                    textAlign: "center",
                    fontSize: 22,
                    fontFamily: "Montserrat-SemiBold",
                    color: primaryBlue
                  }}
                >
                  <AwesomeIcon
                    style={{ fontSize: 24, paddingRight: 10 }}
                    name="ruler"
                  />{" "}
                  {Math.round(distance * 100) / 100} km
                </Text>
                <Text
                  style={{
                    width: "50%",
                    textAlign: "center",
                    fontSize: 22,
                    fontFamily: "Montserrat-SemiBold",
                    color: primaryBlue
                  }}
                >
                  <AwesomeIcon
                    style={{ fontSize: 24, paddingRight: 10 }}
                    name="walking"
                  />{" "}
                  {Math.floor(duration / 60)}h{" "}
                  {Math.round(duration) - Math.floor(duration / 60) * 60}min *
                </Text>
              </View>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 12,
                  paddingTop: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontFamily: "Montserrat-SemiBold",
                  color: primaryBlue
                }}
              >
                * Sight-seeing, taking pictures of Sasquatch, and meal breaks
                not included in the estimation above
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                bottom: 80,
                position: "absolute",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  width: "80%",
                  textAlign: "center",
                  fontSize: 18,
                  backgroundColor: "#14445A",
                  paddingTop: 5,
                  borderColor: primaryYellow,
                  borderWidth: 1,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  paddingBottom: 5,
                  fontFamily: "Montserrat-Bold",
                  color: primaryYellow
                }}
              >
                Name your route
              </Text>
              <Input
                containerStyle={{
                  backgroundColor: primaryYellow,
                  width: "80%",
                  borderWidth: 0,
                  borderColor: "transparent"
                }}
                inputContainerStyle={{
                  borderWidth: 0,
                  borderColor: "transparent"
                }}
                inputStyle={{
                  fontFamily: "Montserrat-Regular",
                  paddingLeft: 30,
                  borderWidth: 0,
                  borderColor: "transparent",
                  color: primaryBlue,
                  width: "100%",
                  fontSize: 16
                }}
                onChangeText={name => this.setState({ name })}
                placeholderTextColor={"#aaa"}
                placeholder={`Ex: Super ${formattedAddress[0]} bonanza`}
              />
              <Text
                style={{
                  width: "80%",
                  textAlign: "center",
                  fontSize: 18,
                  backgroundColor: "#14445A",
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderColor: primaryYellow,
                  borderWidth: 1,
                  fontFamily: "Montserrat-Bold",
                  color: primaryYellow
                }}
              >
                Add a description below
              </Text>
              <TextInput
                style={{
                  backgroundColor: primaryYellow,
                  width: "80%",
                  color: primaryBlue,
                  fontSize: 16,
                  fontFamily: "Montserrat-Regular",
                  paddingTop: 5,
                  paddingRight: 40,
                  paddingLeft: 40,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  height: 100
                }}
                secureTextEntry={
                  this.state.description.length <= 0 &&
                  this.state.descriptionStatus != "onFocus"
                    ? true
                    : false
                }
                multiline
                onChangeText={description => this.setState({ description })}
                placeholderTextColor={"#aaa"}
                placeholder={
                  "Ex: I added Starbucks as a waypoint because who doesnt like a frapo-moca-chino when fast traveling?"
                }
                numberOfLines={3}
              />
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                position: "absolute",
                bottom: 20,
                alignSelf: "flex-end",
                alignItems: "space-between",
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
                title="Back"
                titleStyle={{
                  fontSize: 15,
                  color: "#fff",
                  fontFamily: "Montserrat-Bold"
                }}
                onPress={goBack}
              />
              <Button
                buttonStyle={{
                  backgroundColor: "transparent",
                  width: "100%",
                  borderRadius: 25
                }}
                onPress={this.addRoute}
                title="Confirm"
                titleStyle={{
                  fontSize: 15,
                  color: "#fff",
                  fontFamily: "Montserrat-Bold"
                }}
                containerStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45%",
                  borderRadius: 25,
                  backgroundColor: stridentRed,
                  height: 40
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff"
  }
});

export default connect(
  state => ({
    route: state.addRoute.route,
    userUID: state.login.currentUser.uid,
    loading: state.addRoute.loading,
    routeCenter: state.addRoute.routeCenter
  }),
  { storeRoute, fetchPOI, submitRoute, computeCenter }
)(EndAddRoute);
