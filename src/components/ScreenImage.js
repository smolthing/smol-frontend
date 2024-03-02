import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function ScreenImage({ src, height }) {
  return (
    <View style={[styles.container, height && { height } ]}>
      <Image
        style={[styles.image]}
        source={src}
        resizeMode="cover"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 310,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden'
  },
  image: {
    width: "100%",
    height: "100%",
  },
})