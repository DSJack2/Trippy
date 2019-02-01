import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                   startAddress: '',
                   destinationAddress: ''
                 }
  }
  static navigationOptions = {
    title: 'Map',
  }

  render() {
    return (
      <View style ={styles.container}>
      <TextInput style={styles.textInputContainer} placeholder='Enter Start Address' onChangeText={(startAddress) => this.setState({ startAddress })}
        value={this.state.startAddress}
        editable={true} />
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
      />
      <TextInput style={styles.textInputContainer} placeholder='Enter Destination Address' onChangeText={(destinationAddress) => this.setState({ destinationAddress })}
          value={this.state.destinationAddress}
          editable={true}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  textInputContainer:{
    flex:0,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 40,
    width: 200,
  }
});
