import React from 'react';
import { Formik } from 'formik';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import { style } from '../css/theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

const signUpValidationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(1, 'Username must be at least 1 character')
    .max(30, 'Username can not be longer than 30 characters'),
  password1: yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password can not be longer than 50 characters'),
  password2: yup.string()
    .oneOf([yup.ref('password1'), null], 'Passwords must match.')
    .required('Password confirmation is required')
});

const SignUp = () => {
  const initialFormValues = {
    username: '',
    password1: '',
    password2: ''
  };

  const history = useHistory();
  const [doSignIn] = useSignIn();
  const [doSignUp] = useSignUp();

  const onSubmit = async (values, { resetForm }) => {
    try {
      await doSignUp({ username: values.username, password: values.password1 });
      await doSignIn({ username: values.username, password: values.password1 });
      resetForm({});
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={ style.view }>
      <Formik
        initialValues={ initialFormValues }
        onSubmit={ onSubmit }
        validationSchema={ signUpValidationSchema }
      >
        { ({ handleSubmit }) => (
          <View>
            <FormikTextInput name="username" placeholder="Username" 
              testID="signUpUsername" />
            <FormikTextInput name="password1" placeholder="Password" 
               testID="signUpPassword1" secureTextEntry />
            <FormikTextInput name="password2" placeholder="Confirm Password" 
               testID="signUpPassword2" secureTextEntry />
            <View style={ style.buttonArea }>
              <TouchableWithoutFeedback onPress={ handleSubmit }>
                <Text style={ style.buttonStyle } testID="signUpButton">
                  Sign Up
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;