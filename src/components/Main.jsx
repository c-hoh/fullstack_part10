import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import appTheme from '../css/theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import useAuthUser from '../hooks/useAuthUser';
import RepositoryItem from './RepositoryItem';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';


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
  const { user } = useAuthUser();

  return(
    <View style={ mainStyle.appContainer }>
      <AppBar user={ user } />
      <Switch>
        <Route path="/" exact>
          <RepositoryList 
            style={ mainStyle.mainContainer } 
          />
        </Route>
        <Route path="/review" exact>
          <CreateReview />
        </Route>
        <Route path="/myreviews" exact>
          <MyReviews />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/repo/:repo+">
          <RepositoryItem showOpen={ true } />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;