import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import appTheme from '../css/theme';

const styles = StyleSheet.create({
  textInput: {
    height: appTheme.input.inputHeight,
    borderWidth: 1,
    borderColor: appTheme.colours.secondaryLight,
    marginTop: 10,
    padding: 10,
    fontSize: appTheme.textProperties.defaultSize 
  }
});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [ style, styles.textInput ];
  return <NativeTextInput style={ textInputStyle } { ...props } />;
};

export default TextInput;