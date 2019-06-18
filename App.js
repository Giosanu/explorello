import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import appReducer from "./config/store";
import thunk from "redux-thunk";
import * as firebase from "firebase";
import { firebaseConfig } from "./config/firebaseConfig";

firebase.initializeApp(firebaseConfig);

const store = createStore(appReducer, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
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
