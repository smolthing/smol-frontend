import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate';
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox';
import ScreenImage from '../../components/ScreenImage';
import { firestore } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { colors, fontSize } from '../../theme';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { images } from 'theme';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()

  const onFooterLinkPress = () => {
    navigation.navigate('Signup')
  }

  useEffect(() => {
    console.log('Login screen')
  }, [])

  const onLoginPress = async() => {
    try {
      setSpinner(true)
      const response = await signInWithEmailAndPassword(auth, email, password)
      const userId = response.user.uid
      const usersReference = doc(firestore, 'users', userId)
      const firestoreDocument = await getDoc(usersReference)
      if (!firestoreDocument.exists) {
        setSpinner(false)
        alert("User does not exist anymore.")
        return;
      }
    } catch(error) {
      setSpinner(false)
      alert(error)
    }
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        scrollEnabled={false}
        style={styles.main}
        keyboardShouldPersistTaps="always">
        <ScreenImage src={images.loginImage} height={400} />
        <View style={styles.buttonContainer}>
          <TextInputBox
            placeholder='Email'
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            value={email}
            keyboardType={'email-address'}
          />
          <TextInputBox
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize="none"
          />
          <Button
            label='Login'
            color={colors.primary}
            onPress={() => onLoginPress()}
          />
          <View style={styles.footerView}>
            <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
          </View>
        </View>

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
  buttonContainer: {
    marginTop: 400,
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
})