import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { colors } from 'theme'
import { fontSize } from '../theme'

export default function TextInputBox(props) {
  const { 
    secureTextEntry,
    placeholder,
    onChangeText,
    value,
    autoCapitalize,
    keyboardType
  } = props

  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={colors.lightGray}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      underlineColorAndroid="transparent"
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 30,
    backgroundColor: colors.textBox,
    color: colors.black,
    fontSize: fontSize.text
  },
})
