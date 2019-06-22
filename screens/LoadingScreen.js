import React from "react";
import { View, StyleSheet, Image } from "react-native";
import ImageSequence from "react-native-image-sequence";

const images = [
  require("../assets/images/loading/animation1.png"),
  require("../assets/images/loading/animation2.png"),
  require("../assets/images/loading/animation3.png"),
  require("../assets/images/loading/animation4.png"),
  require("../assets/images/loading/animation5.png"),
  require("../assets/images/loading/animation6.png"),
  require("../assets/images/loading/animation7.png"),
  require("../assets/images/loading/animation8.png"),
  require("../assets/images/loading/animation9.png")
];

const centerIndex = Math.round(images.length / 2);
export default class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ImageSequence
          images={images}
          startFrameIndex={centerIndex}
          framesPerSecond={3}
          style={{ width: '50%', height: 130 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#rgba(0,48,73,0.9)"
  }
});
