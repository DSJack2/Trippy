import React from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Button, ImageBackground, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class NewTripScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            dailyDriveTime: '',
            tripName: 'New Trip',
            scenic: false
        };
    }

    writeNewTrip = () => {
        const {navigation} = this.props;
        let fbOrigin = navigation.getParam('origin', '');
        let fbDestination = navigation.getParam('destination', '');

        firebase.database().ref('Trips/').push({
            origin: fbOrigin,
            desination: fbDestination,
            dailyDriveTime: this.state.dailyDriveTime,
            tripName: this.state.tripName,
            scenic: false
        }).then((data) => {
            console.log('data:', data);
        }).catch((error) => {
            console.log('error', error);
        });

    }

    navigateToMap = () => {
        const { navigation } = this.props;
        var navActions = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Map',
                    params: { origin: navigation.getParam('origin', ''), destination: navigation.getParam('destination', '') }
                })
            ],

        });

        this.props.navigation.dispatch(navActions);
    }

    onStartTripPress = () => {
        this.writeNewTrip();
        this.navigateToMap();
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/road-mountains.jpg')} style={styles.ImageBackgroundContainer}>
                <ScrollView keyboardDismissMode='on-drag' ContentContainerStyle={{ alignItems: 'center' }}>
                    <Text style={styles.textInputText}>Start Location</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => { this.setState({ tripName: text }) }}
                        value={this.state.tripName}
                        editable={true} />

                    <Text style={styles.textInputText}>End Location</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => { this.setState({ dailyDriveTime: text }) }}
                        value={this.state.dailyDriveTime}
                        editable={true} />

                    <Text style={styles.textInputText}>Daily Drivetime</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => { this.setState({ dailyDriveTime: text }) }}
                        value={this.state.dailyDriveTime}
                        editable={true} />

                    <Button title='StartTrip' buttonStyle={styles.button} style={styles.newTripButton} onPress={this.onStartTripPress.bind(this)} />

                </ScrollView>
            </ImageBackground>


        );
    }
}

const styles = StyleSheet.create({
    startLoc: {
        borderColor: '#000',
        flex: 0,
        height: 40,
        width: 200,
        backgroundColor: '#ffffff'
    },

    ImageBackgroundContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },

    newTripButton: {
        textAlign: 'center',
        alignSelf: 'center',
        width: 200
    },

    textInputText: {
        alignItems: 'center',
        marginTop: 10,
        fontSize: 20,
        color: '#ffffff'

    }

});