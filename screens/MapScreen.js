import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
import Geocoder from 'react-native-geocoding';
import * as constants from '../constants/ApiKeys'

export default class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
    };

    constructor(props) {
        super(props);
        this.state = {
            startLat: 0,
            startLng: 0,
            endLat: 0,
            endLng: 0,

        }
    }


    setMarkers() {
        const { navigation } = this.props;
        const origin = navigation.getParam('origin', 'Not a Valid Address');
        const destination = navigation.getParam('destination', 'Not a Valid Address');
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
        this.setMarkers();
        return (
            <View style={styles.container}>
                {/*//<Text>origin: {JSON.stringify(origin)}</Text>*/}
                <MapView
                    style={{ flex: 1 }}
                    provider="google"
                    initialRegion={{
                        latitude: 36.174465,
                        longitude: -86.767960,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.startLat,
                            longitude: this.state.startLng,
                        }}
                        title={"Origin"}
                    />
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.endLat,
                            longitude: this.state.endLng
                        }}
                        title={"Destination"}
                    />
                </MapView>
                {/*<Text>destination: {JSON.stringify(destination)}</Text>*/}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

