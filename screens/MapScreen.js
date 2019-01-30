import React from 'react';
//import { MapView } from 'expo';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }
  static navigationOptions = {
    title: 'Map',
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider="google"
        initialRegion={{
          latitude: 36.174465,
          longitude: -86.767960,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      //showsUserLocation = "true"
      >
        <TextInput style={styles.textInputContainer} placeholder='Enter Start Address' onChangeText={(text) => this.setState({ text })} value={this.state.text} 
          editable={true} />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer:{
    backgroundColor: '#fefefe',
    alignSelf: 'center',
    height: 40,
    width: 200,
  }
});
