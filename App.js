import React, { Component } from "react";
import { Provider } from "react-redux";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import appReducer from "./config/store";
import * as firebase from "firebase";
import { firebaseConfig } from "./config/firebaseConfig";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from './config/store'

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#888"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
