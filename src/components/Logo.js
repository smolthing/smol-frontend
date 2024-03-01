import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/signup.png')}
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
    height: 650,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden' // Ensures that the image does not overflow its container
  },
  logo: {
    width: "100%",
    height: "100%",
  },
})