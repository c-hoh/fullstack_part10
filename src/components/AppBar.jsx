import React, { useContext } from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, 
         TouchableOpacity, ScrollView } from 'react-native';
import { Link, useHistory } from 'react-router-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/client';
import appTheme from '../css/theme';
import { Heading } from './Text';
import AuthStorageContext from '../contexts/AuthStorageContext';


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

const AppBarTabFunc = ({ title, func }) => {
  return (
    <TouchableWithoutFeedback onPress={ func }>
      <Heading contrast={ true } style={ appBarStyle.appBarTab }>
        { title }
      </Heading>
    </TouchableWithoutFeedback>
  );
};

const AppBar = ({ user }) => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/signin');
  };

  return (
    <View style={ appBarStyle.appBar }>
      <ScrollView showsHorizontalScrollIndicator={ false } horizontal>
        <AppBarTab title='Repositories' target="/" /> 
        { user
          ? <AppBarTabFunc title="Sign Out" func={ signOut } />
          : <AppBarTab title='Sign In' target="/signin" />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;