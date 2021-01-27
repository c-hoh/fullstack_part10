import { Platform, StyleSheet } from 'react-native';

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
  },
  circle: {
    height: 60,
    width: 60
  }
};

export const style = StyleSheet.create({
  view: {
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: appTheme.colours.white,
    flex: 1
  },
  buttonArea: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: appTheme.colours.primary,
    fontSize: appTheme.textProperties.defaultSize,
    color: appTheme.textColours.contrast,
    fontWeight: appTheme.textProperties.boldWeight,
    height: appTheme.input.inputHeight,
    flexGrow: 1,
    textAlign: 'center',
    padding: 6,
    borderRadius: 5
  }
});


export default appTheme;