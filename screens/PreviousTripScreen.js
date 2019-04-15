import React from 'react';
import {StyleSheet, View, ScrollView, Text, TextInput,ImageBackground, FlatList,TouchableOpacity,Dimensions} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Modal from "react-native-modal";
import * as firebase from 'firebase';
import { Button, colors } from 'react-native-elements';
const{WIDTH,HEIGHT}  =  Dimensions.get('window');

export default class NewTripScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: firebase.auth().currentUser,
            data: [],
            origin: '',
            destination: '',
            dailyDriveTime: '',
            tripName: 'New Trip',
            numberOfDrivers: '',
            scenic: false,
            previousTripsVisible: true,
            isModalVisible: false,
        };
    }

    componentDidMount(){
        this.getUserTrips();
        // const user = firebase.auth().currentUser;
        // this.setState({
        //     currentUser: user
        // });
    }

    getUserTrips = () => {
        let tripArray = [];
        let trips = firebase.database().ref(`Trips/` + this.state.currentUser.uid);
        //console.log(trips);
        trips.on('value', (snapshot) => {
            snapshot.forEach((child) => {
                //console.log(child);
                tripArray.push(child);
            });
            this.setState({data: tripArray});
        });
        this.setState({previousTripVisible: false});
        //console.log(typeof this.state.data)
    };

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
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%",
                    marginTop: 10
                }}
            />
        );
    };

    onStartTripPress = () => {

    };


    _renderListItem(item) {
        var x = JSON.stringify(item);
        var y = JSON.parse(x);
        let start = y['origin'];
        let end = y['desination'];
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: 'black',
                    width: WIDTH,
                    height: 50
                }}
                onPress={() => {
                    this._toggleModal();
                    this.setState({origin: item.start, destination: item.end});

                }}>
                <Text style={{color: 'black', textAlign: 'center', textAlignVertical: 'center'}}>
                    {start}</Text>
                <Text style={{color: 'black', textAlign: 'center', textAlignVertical: 'center',fontWeight:'bold'}}>
                    TO</Text>
                <Text style={{color: 'black', textAlign: 'center', textAlignVertical: 'center'}}>
                    {end} </Text>
            </TouchableOpacity>);
    };


    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    render() {
        return (
            <ImageBackground source={require('../assets/images/road-mountains.jpg')} style={styles.ImageBackgroundContainer}>
                {/*<Button title="Click to get Previous Trips" onPress={this.getUserTrips}/>*/}
                <FlatList
                    data={this.state.data}
                    width='100%'
                    extraData={this.state.data}
                    keyExtractor={(x, i) => i.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item}) => this._renderListItem(item)}
                />
                <Modal isVisible={this.state.isModalVisible}
                       animationIn='bounceIn'
                       onBackdropPress={() => this.setState({isModalVisible: false})}
                >
                    <View style={{
                        flex: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                    }}>
                        <Text>{this.state.origin} </Text>
                        <Button onPress={this.onStartTripPress}
                                color='red' title="Create Trip">
                        </Button>
                    </View>
                </Modal>
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