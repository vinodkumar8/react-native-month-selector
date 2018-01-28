/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import MonthSelectorCalendar  from 'react-native-month-selector'

export default class App extends Component {


  componentWillMount() {
    this.setState({ month: moment() });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Selected Month is { this.state.month && this.state.month.format('MMM YYYY')}
        </Text>
        <MonthSelectorCalendar
           selectedDate={this.state.month}
           monthTapped={(date) => this.setState({ month: date })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
