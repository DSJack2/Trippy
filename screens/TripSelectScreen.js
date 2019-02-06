import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

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
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            console.log(data);
                            this.state.startAddress = data.description;
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            key: 'AIzaSyCzi89qp2jzxu5jFYvaeQU6xfQjfr5JN1Y',
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
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GoogleReverseGeocoding'
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            // rankby: 'prominance',
                            // types: 'food'
                        }}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                    />

                    <GooglePlacesAutocomplete
                        placeholder='Destination Address'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            //console.log(data, details);
                            this.state.destinationAddress = data.description;
                            //console.log(this.state.destinationAddress);
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyCzi89qp2jzxu5jFYvaeQU6xfQjfr5JN1Y',
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
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'food'
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
    googleAutoCompleteContainer:{

    }
});
