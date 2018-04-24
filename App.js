/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

import ListPage from './ListPage.js';

export default class App extends Component<{}> {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Pulse RSS Viewer',
          component: ListPage,
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

