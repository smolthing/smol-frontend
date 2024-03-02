import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../theme";
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

export default function ScreenTemplate(props) {
  const { isLoading, isError } = props

  if(isLoading) {
    return <LoadingScreen />
  }

  if(isError) {
    return <ErrorScreen />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
        {props.children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
})
