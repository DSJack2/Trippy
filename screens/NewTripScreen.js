import React from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Button, ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class NewTripScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            dailyDriveTime: '',
            tripName: '',
            scenic: false
        };
    }

    writeNewTrip = () => {
        // console.log('startLoc: ' + this.state.startLoc);
        // console.log('endloc: ' + this.state.endLoc);
        // console.log('dailyDriveTime: ' + this.state.dailyDriveTime);
        firebase.database().ref('Trips/').push({
            startLoc,
            endLoc,
            dailyDriveTime
        }).then((data) => {
            console.log('data:', data);
        }).catch((error) => {
            console.log('error', error);
        });
    }

    onStartTripPress = () => {
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

    render() {
        return (
            <ImageBackground source={require('../assets/images/road-mountains.jpg')} style={styles.ImageBackgroundContainer}>
                <ScrollView keyboardDismissMode='on-drag' ContentContainerStyle={{ alignItems: 'center' }}>
                    <Text style={{ alignItems: 'center' }}>Start Location</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => { this.setState({ origin: text }) }}
                        value={this.state.startLoc}
                        editable={true} />

                    <Text style={{ alignItems: 'center' }}>End Location</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => { this.setState({ desination: text }) }}
                        value={this.state.endLoc}
                        editable={true} />

                    <Text style={{ alignItems: 'center' }}>Daily Drivetime</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => { this.setState({ dailyDriveTime: text }) }}
                        value={this.state.dailyDriveTime}
                        editable={true} />

                    <Button buttonStyle={styles.button} title='StartTrip' style={styles.newTripButton} onPress={this.onStartTripPress} />

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

});