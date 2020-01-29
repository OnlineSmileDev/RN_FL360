import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {Root} from 'native-base';

import Home from './src/screens/home';

import store from './src/redux/store';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: Home, navigationOptions: {header: null}},
});

const AppNavigator = createSwitchNavigator(
  {
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Main',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </Root>
    );
  }
}
