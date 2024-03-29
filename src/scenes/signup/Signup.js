import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate';
import TextInputBox from '../../components/TextInputBox';
import Button from '../../components/Button';
import ScreenImage from '../../components/ScreenImage';
import { firestore } from '../../firebase/config'
import { setDoc, doc } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { colors, fontSize } from '../../theme';
import { defaultAvatar, termsLink } from '../../config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config'
import { images } from 'theme';
import { ERROR_MAPPING } from '../../utils/Constants'
import { showErrorToast } from '../../utils/ShowToast'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    console.log('Signup screen')
  }, [])

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = async() => {
    if (fullName.length == 0) {
      return showErrorToast(ERROR_MAPPING.nameRequired)
    }

    if (email.length == 0) {
      return showErrorToast(ERROR_MAPPING.emailRequired)
    }

    if (password.length == 0) {
      return showErrorToast(ERROR_MAPPING.passwordRequired)
    }

    if (password !== confirmPassword) {
      return showErrorToast(ERROR_MAPPING.passwordMismatch)
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
    } catch(error) {
      setSpinner(false)
      showErrorToast(ERROR_MAPPING[error.code])
    }
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        scrollEnabled={false}
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
        <ScreenImage src={images.signupImage} />
        <View style={styles.buttonContainer}>
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
        </View>
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
  buttonContainer: {
    marginTop: 250,
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
    textShadowColor: colors.black,
    textShadowOffset: { width: 2, height: 2 },
  },
  footerLink: {
    color: colors.darkGreen,
    fontWeight: "bold",
    fontSize: fontSize.large,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  link: {
    color: colors.lightGray,
    fontSize: fontSize.small,
    textAlign: 'center'
  },
  termsLink: {
    color: colors.gray,
    fontSize: fontSize.small
  }
})