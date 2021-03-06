import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import appTheme from '../css/theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: appTheme.colours.error
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const height = props.multiline ? 80 : 40;

  return (
    <>
      <TextInput style={{ minHeight: height }}
        onChangeText={ value => helpers.setValue(value) }
        onBlur={ () => helpers.setTouched(true) }
        value={ field.value }
        error={ showError }
        { ...props }
      />
      { showError && <Text style={ styles.errorText }>{ meta.error }</Text> }
    </>
  );
};

export default FormikTextInput;