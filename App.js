import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomeScreen from './app/screens/HomeScreen';

import SearchScreen from './app/screens/SearchScreen'


class One extends Component {

  constructor(props) {
    super(props)

    var navigation = this.props.navigation

  }

  render() {
    return (

      // <View>
      //   <Text>
      //     One

      //   </Text>
      // </View>

      <HomeScreen />
    )
  }
}


class Two extends Component {

  constructor(props) {
    super(props)

    var navigation = this.props.navigation

  }

  render() {
    return (
      <View>
        <Text>
          Two
        </Text>
      </View>
    )
  }
}


class Search extends Component {

  constructor(props) {
    super(props)

    var navigation = this.props.navigation

  }

  render() {
    return (
      <View>
        <Text>
          Search Tab
        </Text>
      </View>
    )
  }
}




const MainStack = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen }
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }

  })



export default createAppContainer(MainStack)


// export default class App extends Component {
//   render() {

//     return (
//       <View style={styles.container} >
//         <Text>Welcome to New City Weather App</Text>
//       </View>
//     );



//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
