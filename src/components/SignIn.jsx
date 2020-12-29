import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import Text from './Text';
import appTheme from '../css/theme';
import useSignIn from '../hooks/useSignIn';

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
    padding: 6,
    borderRadius: 5
  }
});

const signInValidationSchema = yup.object().shape({
  username: yup.string().trim().required('Username is required.'),
  password: yup.string().trim().required('Password is required.')
});

const SignIn = () => {
  const [doSignIn] = useSignIn();

  const initialFormValues = {
    username: '',
    password: ''
  };

  const submitValues = async (values, { resetForm }) => {
    try {
      const { data } = await doSignIn({ 
        username: values.username, password: values.password });
      console.log(data.authorize.accessToken);
      resetForm({});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={ signInView.view }>
      <Formik
        initialValues={ initialFormValues }
        onSubmit={ submitValues }
        validationSchema={ signInValidationSchema }
      >
        { ({ handleSubmit }) => (
          <View>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" 
              secureTextEntry />
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