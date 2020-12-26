import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import appTheme from '../css/theme';

const signInView = StyleSheet.create({
  view: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    backgroundColor: appTheme.colours.white
  },
  loginButtonArea: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonStyle: {
    backgroundColor: appTheme.colours.primary,
    fontSize: appTheme.textProperties.defaultSize,
    color: appTheme.textColours.contrast,
    fontWeight: appTheme.textProperties.boldWeight,
    height: appTheme.input.inputHeight,
    flexGrow: 1,
    textAlign: 'center',
    padding: 6
  }
});

const SignIn = () => {
  const initialFormValues = {
    username: '',
    password: ''
  };

  const submitValues = (values) => {
    console.log(values);
  };

  return (
    <View style={ signInView.view }>
      <Formik
        initialValues={ initialFormValues }
        onSubmit={ values => submitValues(values) }
      >
        { ({ handleSubmit }) => (
          <View>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" />
            <View style={ signInView.loginButtonArea }>
              <TouchableWithoutFeedback onPress={ handleSubmit }>
                <Text style={ signInView.loginButtonStyle }>Sign In</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;