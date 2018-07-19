import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './src/components/Login';
import Produtos from './src/components/Produtos';


const Application = createStackNavigator({
  Home: { screen: Produtos},
  Produtos: { screen: Produtos },
  },{
    navigationOptions:{
      header:() =>{},
    }
})

export default class App extends React.Component {
  render() {
    return (
      <Application / >
    );
  }
}
