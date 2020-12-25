import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import appTheme from '../css/theme';
import { Heading } from './Text';

const appBarStyle = StyleSheet.create({
  appBar: {
    height: 100,
    backgroundColor: appTheme.colours.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    paddingTop: Constants.statusBarHeight
  }
});

const AppBarTab = ({ title }) => {
  return (
    <TouchableWithoutFeedback>
      <Heading contrast={ true }>{ title }</Heading>
    </TouchableWithoutFeedback>
  );
};

const AppBar = () => {
  return (
    <View style={ appBarStyle.appBar }>
      <AppBarTab title='Repositories' /> 
    </View>
  );
};

export default AppBar;