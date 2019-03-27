import React from 'react';
import {StyleSheet, View, ScrollView, Text, TextInput, Button, ImageBackground, Alert, FlatList,TouchableOpacity, Picker,Dimensions} from 'react-native';
import {StackActions, NavigationActions,} from 'react-navigation';
import * as firebase from 'firebase';
import Modal from "react-native-modal";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const {WIDTH,HEIGHT} = Dimensions.get('window');

export default class NewTripScreen extends React.Component {

    constructor(props) {
        super(props);
        this.array = [
        ];
        this.state = {
            origin: '',
            destination: '',
            dailyDriveTime: '',
            tripName: 'New Trip',
            numberOfDrivers: '1',
            scenic: false,
            tripCriteria: [],
            category: '', // category of trip param/criteria
            criteriaName: '',//criteria name
            hoursInTrip: '',
            minutesInTrip: '',
            isModalVisible: false,
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


    };

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
    };

    onStartTripPress = () => {
        if (this.state.destination.trim() === '' || this.state.origin.trim() === '') { //not working correctly
            this.writeNewTrip();
            this.navigateToMap();
        } else{
            Alert.alert("Please enter a destination and origin address");
        }
    };


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };


    componentDidMount() {
        this.setState({ tripCriteria: [...this.array] })
    };

    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    }


    _renderListItem(item) {
        return(
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

            }}>
            <Text style={{color: 'black', textAlign: 'center', textAlignVertical: 'center'}}>
                {item.category}</Text>
            <Text style={{color: 'black', textAlign: 'center', textAlignVertical: 'center'}}>
                {item.criteriaName}</Text>
            <Text style={{color: 'black', textAlign: 'center', textAlignVertical: 'center'}}>
                {item.hoursInTrip}</Text>
        </TouchableOpacity>);
    }

    _hide = () => {
        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         firebase.database().ref('Trips/' + user.uid + '/').push({
        // some trip information
        //         }).then((data) => {
        //             console.log('data:', data);
        //         }).catch((error) => {
        //             console.log('error', error);
        //         });
        //     }
        // });
        console.log(this.state.criteriaName);
        this.array.push({
            category: this.state.category,
            criteriaLoc: this.state.criteriaName,
            criteriaName: this.state.hoursInTrip,
        });
        this.setState({tripCriteria: [...this.array] });
        this.setState({hidden : false});
        this.setState({isModalVisible: false});
    };

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

                    <Button title= 'Add Trip Criteria' color = 'red' onPress={this._toggleModal} style={styles.button} position ='center'>
                    </Button>


                    <Modal isVisible={this.state.isModalVisible}
                           animationIn='bounceIn'
                           onBackdropPress={this._toggleModal}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                        }}>
                            <Text style={styles.modalTextCategory} >Category</Text>
                            <TextInput
                                placeholder="Category"
                                defaultValue={''}
                                onChangeText={(text) => this.setState({category: text})}
                            />
                            <Text style={styles.modalTextTripCriteria} >Trip Criteria</Text>
                            <TextInput
                                placeholder="Criteria"
                                defaultValue={''}
                                onChangeText={(text) => this.setState({criteriaName: text})}
                            />
                            <Text style={styles.modalHoursCategory}>Hours in Trip</Text>
                            <TextInput
                                placeholder="Hours in Trip"
                                defaultValue={''}
                                onChangeText={(text) => this.setState({hoursInTrip: text})}
                            />
                            <TouchableOpacity onPress={this._hide}>
                                <Text style = {{ color: 'red'}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/*{*/}
                        {/*this.state.Food ?*/}
                            {/*<View  style = {styles.container} hide={false}>*/}
                                {/*<Picker*/}
                                    {/*selectedValue={this.state.category}*/}
                                    {/*onValueChange={(itemValue, itemIndex) =>*/}
                                        {/*this.setState({category: itemValue})*/}
                                    {/*}>*/}
                                    {/*<Picker.Item label="Foohahahahd" value="Food" />*/}
                                    {/*<Picker.Item label="Gas Station" value="Gas Station" />*/}
                                    {/*<Picker.Item label="Rest Station" value="Rest Station" />*/}
                                    {/*<Picker.Item label="Scenic Sight" value="Scenic Sight" />*/}
                                    {/*<Picker.Item label="Hotel" value="Hotel " />*/}
                                {/*</Picker>*/}
                                {/*<Button title={"Submit"} color= 'purple' onPress={this._hideCriteria}/>*/}
                            {/*</View> : null*/}
                    {/*}*/}

                    <FlatList
                        data={this.state.tripCriteria}
                        width='100%'
                        extraData={this.state.tripCriteria}
                        keyExtractor={(x,i) => i.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem = {({item}) => this._renderListItem(item)}
                    />

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
        color: '#ffffff',
        fontWeight: 'bold',
    },
    flatList:{
        marginTop: 100
    },
    buttonText:{
        color: 'white',

    },

    textStyle:{
        color: 'red',
        textAlign: 'center',
        textAlignVertical: 'center',

    },
    container: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    modalTextCategory:{
        fontWeight:'bold',
        alignContent:'center',
    },
    modalTextTripCriteria: {
        fontWeight:'bold',
        alignContent:'center',
    },
    modalHoursCategory: {
        fontWeight:'bold',
        alignContent:'center',
    }


});