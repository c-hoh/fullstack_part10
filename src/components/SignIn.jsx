import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import Text from './Text';
import { style } from '../css/theme';
import useSignIn from '../hooks/useSignIn';


const signInValidationSchema = yup.object().shape({
  username: yup.string().trim().required('Username is required.'),
  password: yup.string().trim().required('Password is required.')
});


const SignIn = () => {
  const [doSignIn] = useSignIn();
  const history = useHistory();

  const submitValues = async (values, { resetForm }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await doSignIn({ 
        username: values.username, password: values.password });
      resetForm({});
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  
  return <SignInContainer submitValues={ submitValues } />;
};

export const SignInContainer = ({ submitValues }) => {
  const initialFormValues = {
    username: '',
    password: ''
  };

  return (
    <View style={ style.view }>
      <Formik
        initialValues={ initialFormValues }
        onSubmit={ submitValues }
        validationSchema={ signInValidationSchema }
      >
        { ({ handleSubmit }) => (
          <View>
            <FormikTextInput name="username" placeholder="username" 
              testID="username" />
            <FormikTextInput name="password" placeholder="password" 
              testID="password" secureTextEntry />
            <View style={ style.buttonArea }>
              <TouchableWithoutFeedback onPress={ handleSubmit }>
                <Text style={ style.buttonStyle } testID="loginBtn">
                  Sign In
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;