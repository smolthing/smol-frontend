import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { fontSize, colors } from "../theme";

export default function Button(props) {
  const { label, onPress, color, disable } = props

  if (disable) {
    return (
      <View style={[styles.button, { backgroundColor: color, opacity: 0.9 }]}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    )
  }
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 65,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.button,
    fontWeight: "bold",
  },
})