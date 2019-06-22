import React from "react";
import { View, Image, ImageBackground } from "react-native";
import { primaryBlue } from "./Colors";

export const navigationOptions = {
  headerStyle: {
    borderWidth: 0,
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 2,
    color: '#fff',
    borderBottomWidth: 0.2,
    borderBottomColor: "rgba(0,0,0,0.3)",
    backgroundColor: primaryBlue
  },
  headerTitle: (
    <View
      style={{
        justifyContent: "center",
        borderWidth: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: "flex",
        alignItems: "center"
      }}
    >
      <ImageBackground
        style={{ width: 140, height: 50 }}
        source={require("../assets/images/logoSimple.png")}
      />
    </View>
  )
};
