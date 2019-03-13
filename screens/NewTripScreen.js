import React from 'react';
import {StyleSheet, View, ScrollView, Text, TextInput, Button, ImageBackground, Alert} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import * as firebase from 'firebase';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NewTripScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            dailyDriveTime: '',
            tripName: 'New Trip',
            numberOfDrivers: '1',
            scenic: false
        };
    }

    writeNewTrip = () => {
        const {navigation} = this.props;
        let fbOrigin = navigation.getParam('origin', '');
        let fbDestination = navigation.getParam('destination', '');

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref('Trips/' + user.uid + '/').push({
                    origin: fbOrigin,
                    desination: fbDestination,
                    dailyDriveTime: this.state.dailyDriveTime,
                    tripName: this.state.tripName,
                    numberOfDrivers: this.state.numberOfDrivers,
                    scenic: false
                }).then((data) => {
                    console.log('data:', data);
                }).catch((error) => {
                    console.log('error', error);
                });
            }
        });


    }

    navigateToMap = () => {
        const {navigation} = this.props;
        var navActions = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Map',
                    params: {
                        origin: navigation.getParam('origin', ''),
                        destination: navigation.getParam('destination', '')
                    }
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
            <ImageBackground source={require('../assets/images/road-mountains.jpg')}
                             style={styles.ImageBackgroundContainer}>
                <ScrollView keyboardDismissMode='on-drag' ContentContainerStyle={{alignItems: 'center'}}>
                    <Text style={styles.textInputText}>Trip Name</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => {
                        this.setState({tripName: text})
                    }}
                               value={this.state.tripName}
                               editable={true}/>

                    <Text style={styles.textInputText}>Daily Drive Time</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => {
                        this.setState({dailyDriveTime: text})
                    }}
                               value={this.state.dailyDriveTime}
                               editable={true}/>

                    <Text style={styles.textInputText}>Number of Drivers</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => {
                        this.setState({numberOfDrivers: text})
                    }}
                               value={this.state.numberOfDrivers}
                               editable={true}/>
                    <ActionButton buttonColor="red"
                                  position={'center'}
                                  offsetY={490}>
                        <ActionButton.Item buttonColor='green' title="Food" onPress={() => console.log("add criteria")}>
                            <Icon name="md-create" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        {/*<ActionButton.Item buttonColor='purple' title="Gas station"*/}
                                           {/*onPress={() => console.log("add criteria")}>*/}
                            {/*<Icon name="md-create" style={styles.actionButtonIcon}/>*/}
                        {/*</ActionButton.Item>*/}
                        {/*<ActionButton.Item buttonColor='yellow' title="Sightseeing"*/}
                                           {/*onPress={() => console.log("add criteria")}>*/}
                            {/*<Icon name="md-create" style={styles.actionButtonIcon}/>*/}
                        {/*</ActionButton.Item>*/}
                        {/*<ActionButton.Item buttonColor='white' title="Lounging"*/}
                                           {/*onPress={() => console.log("add criteria")}>*/}
                            {/*<Icon name="md-create" style={styles.actionButtonIcon}/>*/}
                        {/*</ActionButton.Item>*/}
                        {/*<ActionButton.Item buttonColor='black' title="Rest Stop"*/}
                                           {/*onPress={() => console.log("add criteria")}>*/}
                            {/*<Icon name="md-create" style={styles.actionButtonIcon}/>*/}
                        {/*</ActionButton.Item>*/}
                    </ActionButton>
                    <Button title='StartTrip' buttonStyle={styles.button} style={styles.newTripButton}
                            onPress={this.onStartTripPress.bind(this)}/>

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