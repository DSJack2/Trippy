import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
import Geocoder from 'react-native-geocoding';
import * as constants from '../constants/ApiKeys';
import MapViewDirections from 'react-native-maps-directions'

const initialLat= 39.8283;
const initialLng = -98.5795;

var markers = [
    {
        latitude: 45.65,
        longitude: -78.90,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
    }
];

export default class MapScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startLat: 0,
            startLng: 0,
            endLat: 0,
            endLng: 0,
        }
        this.setMarkers();

    }




    setMarkers() {
        const { navigation } = this.props;
        const origin = navigation.getParam('origin', 'Not a Valid Address');
        const destination = navigation.getParam('destination', 'Not a Valid Address');
        const blah = navigation.getParam('tripCriteria', '');
        console.log(blah);
        Geocoder.init(constants.GAPIKEY);
        Geocoder.from(JSON.stringify(origin))
            .then(json => {
                this.setState({ 'startLat': json.results[0].geometry.location.lat });
                this.setState({ 'startLng': json.results[0].geometry.location.lng });
            })
            .catch(error => console.warn(error));
        Geocoder.from(JSON.stringify(destination))
            .then(json => {
                this.setState({ 'endLat': json.results[0].geometry.location.lat });
                this.setState({ 'endLng': json.results[0].geometry.location.lng });
            })
            .catch(error => console.warn(error));

    }



    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={{ flex: 1, zIndex: -1}}
                    provider="google"
                    initialRegion={{
                        latitude: initialLat,
                        longitude: initialLng,
                        latitudeDelta: 35,
                        longitudeDelta: 35,
                    }}
                    showsUserLocation = {true}
                    rotateEnabled = {false}
                    loadingEnabled = {true}
                >
                    <MapViewDirections apikey={constants.GAPIKEY}
                    origin= {{latitude: this.state.startLat, longitude: this.state.startLng}}
                                       waypoints={[{latitude: initialLat, longitude:initialLng}]}
                    destination={{latitude: this.state.endLat, longitude: this.state.endLng}}
                    strokeWidth={3}
                    strokeColor='#4a89f3'
                    lineJoin='round'
                    />

                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.startLat,
                            longitude: this.state.startLng,
                        }}

                        title={"Origin"}
                    />
                    <MapView.Marker
                        pinColor={"blue"}
                        coordinate={{
                            latitude: initialLat,
                            longitude: initialLng,
                        }}

                        title={"Blah"}
                    />

                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.endLat,
                            longitude: this.state.endLng
                        }}
                        title={"Destination"}
                    />
                </MapView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

