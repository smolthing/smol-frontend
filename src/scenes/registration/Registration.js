import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, View, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate';
import TextInputBox from '../../components/TextInputBox';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { firestore } from '../../firebase/config'
import { setDoc, doc } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { colors, fontSize } from '../../theme';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { defaultAvatar, termsLink } from '../../config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config'

export default function Registration() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primary
  }

  useEffect(() => {
    console.log('Registration screen')
  }, [])

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = async() => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    try {
      setSpinner(true)
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const uid = response.user.uid
      const data = {
        id: uid,
        email,
        fullName,
        avatar: defaultAvatar,
      };
      const usersRef = doc(firestore, 'users', uid);
      await setDoc(usersRef, data)
    } catch(e) {
      setSpinner(false)
      alert(e)
    }
  }

  const header = <Text style={styles.headerStyle}>Sign up an account</Text>;
  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
        <Logo />
        {header}
        <TextInputBox
          placeholder='Name'
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          autoCapitalize="none"
        />
        <TextInputBox
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType='email-address'
        />
        <TextInputBox
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <TextInputBox
          secureTextEntry={true}
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
        />
        <Button
          label='Create an account'
          color={colors.primary}
          onPress={() => onRegisterPress()}
        />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Already have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
        </View>
        <Text style={[styles.link]} onPress={ ()=>{ Linking.openURL(termsLink)}}>By signing up, you agree to the <Text style={styles.termsLink}>Terms of Services and Privacy Policy.</Text></Text>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  headerStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSize.header,
    paddingBottom: 10
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20
  },
  footerText: {
    color: colors.gray,
    fontSize: fontSize.large,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: fontSize.large
  },
  link: {
    color: colors.grayLight,
    fontSize: fontSize.small,
    textAlign: 'center'
  },
  termsLink: {
    color: colors.gray,
    fontSize: fontSize.small
  }
})