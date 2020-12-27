import { Platform } from 'react-native';

const appTheme = {
  textColours: {
    main: '#202020',
    light: '#606060',
    contrast: '#f0f0f0'
  },
  textProperties: {
    defaultSize: 16,
    smallSize: 14,
    largeSize: 20,
    headingSize: 22,
    fontFamily: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'system'
    }),
    fontWeight: '400',
    boldWeight: '700'
  },
  colours: {
    primary: '#02888a',
    primaryLight: '#82e2e3',
    secondary: '#202020',
    secondaryLight: '#9d9d9d',
    veryLight: '#e1e4e8',
    white: '#ffffff',
    error: '#831b0e'
  },
  smallImage: {
    height: 40,
    width: 40
  },
  input: {
    inputHeight: 40
  }
};

export default appTheme;