import React from 'react';
import { Formik } from 'formik';
import { View, TouchableWithoutFeedback } from 'react-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { style } from '../css/theme';
import useNewReview from '../hooks/useNewReview';
import { useHistory } from 'react-router-native';



const sumbitValidationSchema = yup.object().shape({
  repoOwner: yup.string().trim().required('Repository owner is required.'),
  repoName: yup.string().trim().required('Repository name is required.'),
  repoRating: yup.number()
    .typeError('Rating must be a number')
    .min(0, 'Rating can not be lower than 0')
    .max(100, 'Rating can not be larger than 100')
    .integer('Rating must be an integer')
    .required('Rating is required'),
  repoReview: yup.string().trim().required('Review is required')
});

const CreateReview = () => {
  const initialFormValues = {
    repoOwner: '',
    repoName: '',
    repoRating: '',
    repoReview: ''
  };

  const [postMutation] = useNewReview();
  const history = useHistory();

  const onSubmit = async (values, { resetForm }) => {
    try {
      await postMutation(values);
      resetForm({});
      const repoId = values.repoOwner + '/' + values.repoName;
      history.push(`/repo/${repoId}`);
    } catch {
      console.log('could not post review');
    }
  };

  return (
    <View style={ style.view }>
      <Formik
        initialValues={ initialFormValues }
        onSubmit={ onSubmit }
        validationSchema={ sumbitValidationSchema }
      >
        { ({ handleSubmit }) => (
          <View>
            <FormikTextInput name="repoOwner" placeholder="Repository owner" 
              testID="repoOwner" />
            <FormikTextInput name="repoName" placeholder="Repository name" 
              testID="repoName" />
            <FormikTextInput name="repoRating" 
              placeholder="Rating from 0 to 100"
              testID="repoRating" />
            <FormikTextInput name="repoReview" placeholder="Review"
              testID="repoReview" multiline={ true } />
            <View style={ style.buttonArea }>
              <TouchableWithoutFeedback onPress={ handleSubmit }>
                <Text style={ style.buttonStyle } testID="submitBtn">
                  Post review
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateReview;