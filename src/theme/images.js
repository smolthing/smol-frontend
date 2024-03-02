import { Asset } from 'expo-asset'

import Logo from '../../assets/images/logo.svg'

export const svgs = {
  logo: Logo,
}

export const images = {
  logo_sm: require('../../assets/images/logo-sm.png'),
  logo_lg: require('../../assets/images/logo-lg.png'),
  signupImage: require('../../assets/images/signup.png'),
  loginImage: require('../../assets/images/login.png')
}

// image preloading
export const imageAssets = Object.keys(images).map((key) => Asset.fromModule(images[key]).downloadAsync())
