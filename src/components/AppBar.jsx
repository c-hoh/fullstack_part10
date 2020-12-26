import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, 
         TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
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
  },
  appBarTab: {
    marginRight: 20
  }
});

const AppBarTab = ({ title, target }) => {
  return (
    <TouchableWithoutFeedback>
      <Link to={ target } component={ TouchableOpacity }>
        <Heading contrast={ true } style={ appBarStyle.appBarTab }>
          { title }
        </Heading>
      </Link>
    </TouchableWithoutFeedback>
  );
};

const AppBar = () => {
  return (
    <View style={ appBarStyle.appBar }>
      <ScrollView showsHorizontalScrollIndicator={ false } horizontal>
        <AppBarTab title='Repositories' target="/" /> 
        <AppBarTab title='Sign In' target="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;