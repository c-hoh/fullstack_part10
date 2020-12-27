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
    fontSize: appTheme.textProperties.defaultSize,
    borderRadius: 5
  },
  errorBorder: {
    borderColor: appTheme.colours.error,
    borderWidth: 2
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [ styles.textInput, style ];
  if (error) {
    textInputStyle.push(styles.errorBorder);
  }
  return <NativeTextInput style={ textInputStyle } { ...props } />;
};

export default TextInput;