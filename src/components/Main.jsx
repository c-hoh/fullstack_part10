import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import appTheme from '../css/theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const mainStyle = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: appTheme.colours.veryLight
  },
  mainContainer: {
    padding: 5
  }
});

const Main = () => {
  return(
    <View style={ mainStyle.appContainer }>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList style={ mainStyle.mainContainer }/>
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;