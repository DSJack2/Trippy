import React from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Button, ImageBackground, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class NewTripScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            data: [],
            origin: '',
            destination: '',
            dailyDriveTime: '',
            tripName: 'New Trip',
            numberOfDrivers: '',
            scenic: false
        };
    }

    componentDidMount(){
        const user = firebase.auth().currentUser;
        this.setState({
            currentUser: user
        });
    }

    getUserTrips = () => {
        let tripArray = [];
        let trips = firebase.database().ref(`Trips/` + this.state.currentUser.uid);
        console.log(trips);
        trips.on('value', (snapshot) => {
            snapshot.forEach((child) => {
                console.log(child);
                tripArray.push(child);
            });
            this.setState({data: tripArray});
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

    render() {
        return (
            <ImageBackground source={require('../assets/images/road-mountains.jpg')} style={styles.ImageBackgroundContainer}>
                <Button title="Test" onPress={this.getUserTrips}/>
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