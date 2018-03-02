import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Container, Header, Content, Button, Text } from 'native-base';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // 0.18.5

export default class App extends Component {
  state = {
    locationResult: null
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
 };

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button>
            <Text>{this.state.locationResult}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
