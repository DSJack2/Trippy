import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import * as constants from '../constants/ApiKeys'

export default class TripSelectScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startAddress: '',
            destinationAddress: ''
        }
    }

    static navigationOptions = {
        title: 'TripSelect',
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/images/NewZ.jpg')} style={styles.ImageBackgroundContainer}>
                    <GooglePlacesAutocomplete
                        placeholder='Start Address'
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={'search'}
                        listViewDisplayed='auto'
                        fetchDetails={true}
                        renderDescription={row => row.description}
                        onPress={(data, details = null) => {
                            //console.log(data);
                            this.state.startAddress = data.description;
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            key: constants.GAPIKEY,//need to load key
                            language: 'en', // language of the results
                            types: ['address', 'establishment']
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold',
                                color: 'white'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}
                        currentLocation={true}
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GoogleReverseGeocoding'
                        GooglePlacesSearchQuery={{
                            // rankby: 'prominance',
                            // types: 'food'
                        }}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                    />

                    <GooglePlacesAutocomplete
                        placeholder='Destination Address'
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={'search'}
                        listViewDisplayed='auto'
                        fetchDetails={true}
                        renderDescription={row => row.description}
                        onPress={(data, details = null) => {
                            this.state.destinationAddress = data.description;
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            key: constants.GAPIKEY,
                            language: 'en', // language of the results
                            types: ['address', 'establishment']
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold',
                                color: 'white'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}
                        currentLocation={true}
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch'
                        GooglePlacesSearchQuery={{
                            // rankby: 'distance',
                            // types: 'food'
                        }}
                        debounce={200}
                    />
                    <Button style={styles.startTripButton} title="Start Trip"

                    onPress={() => this.props.navigation.navigate('Map', {
                                origin: this.state.startAddress,
                                destination: this.state.destinationAddress
                            })}/>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ImageBackgroundContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    startTripButton: {
        textAlign: 'center',
        alignSelf: 'center',
        width: 200,
        marginBottom: 10,

    },
});
