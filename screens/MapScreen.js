import React from 'react';
//import { MapView } from 'expo';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default class MapScreen extends React.Component  {
  static navigationOptions = {
    title: 'Map',
  }

  render() {
      return (
        <MapView
          style={{ flex: 1 }}
          provider = "google"
          initialRegion={{
            latitude: 	36.174465,
            longitude: -86.767960,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          //showsUserLocation = "true"
        />
      );
    }
  }
