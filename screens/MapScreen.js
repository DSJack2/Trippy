import React from 'react';
import {StyleSheet, View,Text} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {TextInput} from 'react-native-gesture-handler';
import Geocoder from 'react-native-geocoding';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
    };

    render() {
        var startLat = '';
        var startLng = '';
        var endLat = '';
        var endLng = '';
        const {navigation} = this.props;
        const origin = navigation.getParam('origin', 'Not a Valid Address');
        const destination = navigation.getParam('destination', 'Not a Valid Address');
        Geocoder.init('AIzaSyCzi89qp2jzxu5jFYvaeQU6xfQjfr5JN1Y');
        Geocoder.from(JSON.stringify(origin))
            .then(json => {
                 startLat = json.results[0].geometry.location.lat;
                 startLng = json.results[0].geometry.location.lng;
            })
            .catch(error => console.warn(error));
        Geocoder.from(JSON.stringify(destination))
            .then(json => {
                endLat = json.results[0].geometry.location.lat;
                endLng = json.results[0].geometry.location.lng;
            })
            .catch(error => console.warn(error));

        var markers = [
            {
                latitude: startLat,
                longitude: startLng,
                title: 'Origin',
            },
            {
                latitude: endLat,
                longitude: endLng,
                title: 'Destination',
            },
        ];

        return (
            <View style={styles.container}>
                <Text>origin: {JSON.stringify(origin)}</Text>
                <MapView
                    style={{flex: 1}}
                    provider="google"
                    initialRegion={{
                        latitude: 36.174465,
                        longitude: -86.767960,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    annotations={markers}

                />
                <Text>destination: {JSON.stringify(destination)}</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
