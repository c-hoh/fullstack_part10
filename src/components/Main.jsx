import React from 'react';
import { StyleSheet, View } from 'react-native';
import appTheme from '../css/theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';

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
      <RepositoryList style={ mainStyle.mainContainer }/>
    </View>
  );
};

export default Main;