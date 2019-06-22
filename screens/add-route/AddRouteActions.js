import { GoogleApiKey } from "../../config/keys";
import * as firebase from "react-native-firebase";
import { errorToast, successToast } from "../../constants/Functions";

export const FETCH_GOOGLE_MAP = "fetch_google_map";
export const FETCH_GOOGLE_MAP_SUCCESS = "fetch_google_map_success";
export const FETCH_GOOGLE_MAP_FAIL = "fetch_google_map_fail";

// async function callMeBaby(places) {
//   const instance = firebase.functions().httpsCallable("computeStuff");
//   try {
//     console.log(
//       await instance({
//         places
//       })
//     );
//   } catch (e) {
//     console.error(e);
//   }
// }

export const fetchPOI = (latitude, longitude) => dispatch => {
  // dispatch({ type: FETCH_GOOGLE_MAP });
  // // callMeBaby(places)
  // const url =
  //   "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
  //   latitude +
  //   "," +
  //   longitude +
  //   "&radius=100&key=" +
  //   GoogleApiKey;
  // console.log(url);
  // dispatch(
  //   async () =>
  //     await fetch(url)
  //       .then(response => console.log(response.body))
  //       .catch(err => console.log(err))
  // );
};

export const STORE_ROUTE = "store_add_route";

export const storeRoute = route => ({
  type: STORE_ROUTE,
  payload: route
});

export const START_COMPUTE_CENTER = "START_COMPUTE_CENTER";
export const START_COMPUTE_CENTER_SUCCESS = "START_COMPUTE_CENTER_SUCCESS";

export const computeCenter = markers => dispatch => {
  alert("hello I am computing the center");
  dispatch({ type: START_COMPUTE_CENTER });
  let lng = 0,
    lat = 0,
    maxLng = 0,
    minLng = 200,
    maxLat = 0,
    minLat = 2000;
  markers.forEach(m => {
    lng = lng + m.longitude;
    lat = lat + m.latitude;
    if (Math.abs(m.longitude) > Math.abs(maxLng)) maxLng = m.longitude;
    if (Math.abs(m.longitude) < Math.abs(minLng)) minLng = m.longitude;
    if (Math.abs(m.latitude) > Math.abs(maxLat)) maxLat = m.latitude;
    if (Math.abs(m.latitude) < Math.abs(minLat)) minLat = m.latitude;
  });
  console.log(((maxLng - minLng) / 100) * 80);
  console.log(maxLat - minLat);
  const center = {
    latitude: lat / markers.length,
    longitude: lng / markers.length,
    longitudeDelta: (Math.abs(maxLng - minLng) * 10) / 8,
    latitudeDelta: (Math.abs(maxLat - minLat) * 10) / 8
  };
  console.log(center);
  dispatch({
    type: START_COMPUTE_CENTER_SUCCESS,
    payload: center
  });
};

export const SUBMIT_ROUTE = "SUBMIT_ROUTE";
export const SUBMIT_ROUTE_SUCCESS = "SUBMIT_ROUTE_SUCCESS";
export const SUBMIT_ROUTE_FAIL = "SUBMIT_ROUTE_FAIL";

export const submitRoute = (route, navigate) => dispatch => {
  dispatch({
    type: SUBMIT_ROUTE
  });

  try {
    firebase
    .database()
    .ref()
    .child("routes")
    .push()
    .set(route, function(error) {
      if (error) {
        errorToast(`Something went wrong: ${error.message}`);
      } else {
        successToast(`Route added successfully!`);
        dispatch(() => navigate("Dashboard"));
      }
    });
  }
  catch (err) {
    console.log('err catch submitRoute', err)
  }
  console.log("SUBMITTED_ROUTE", route);
};
