import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import { StackActions, NavigationActions, } from 'react-navigation';
import { Button, Input } from 'react-native-elements';
import * as firebase from 'firebase';
import Modal from "react-native-modal";
import ModalSelector from 'react-native-modal-selector';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Swipeout from 'react-native-swipeout'
//import Data from '../Data/TripCategories'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


const { WIDTH, HEIGHT } = Dimensions.get('window');
var id = 0;

export default class NewTripScreen extends React.Component {

    constructor(props) {
        super(props);
        this.array = [];
        this.state = {
            origin: '',
            destination: '',
            dailyDriveTime: '',
            tripName: '',
            numberOfDrivers: '1',
            scenic: false,
            tripCriteria: [],
            category: '', // category of trip param/criteria
            criteriaName: '',//criteria name
            time: null,
            isModalVisible: false,
            foodVisible: false,
            gasStationVisible: false,
            restStopVisible: false,
            attractionsVisible: false,
            hotelVisible: false,
            isDateTimePickerVisible: false,
            otherVisible: false,
            submitVisible: false,
            timeVisible: false,
            activityRowKey: null,
        };
    }

    writeNewTrip = () => {
        const { navigation } = this.props;
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
                    // console.log('data:', data);
                }).catch((error) => {
                    console.log('error', error);
                });
            }
        });
    };

    navigateToMap = () => {
        const { navigation } = this.props;
        var navActions = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Map',
                    params: {
                        origin: navigation.getParam('origin', ''),
                        destination: navigation.getParam('destination', ''),
                        tripInfo: navigation.getParam('tripCriteria', ''),
                        tripCriteria: this.state.tripCriteria
                    }
                })
            ],

        });

        this.props.navigation.dispatch(navActions);
    };

    onStartTripPress = () => {
        this.writeNewTrip();
        this.navigateToMap();
    };


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%",
                    marginTop: 5
                }}
            />
        );
    };


    componentDidMount() {
        this.setState({ tripCriteria: [...this.array] })
    };

    componentWillUnmount() {
        this.state.tripCriteria.splice();
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    setCriteria = (option) => {

        if (option.label == "Food") {
            this.state.category = "Food";
            this.setState({ foodVisible: true });
            this.setState({ gasStationVisible: false });
            this.setState({ hotelVisible: false });
            this.setState({ attractionsVisible: false });
            this.setState({ restStopVisible: false });
            this.setState({ otherVisible: false });
        } else if (option.label == "Gas Station") {
            this.state.category = "Gas Station";
            this.setState({ foodVisible: false });
            this.setState({ gasStationVisible: true });
            this.setState({ hotelVisible: false });
            this.setState({ attractionsVisible: false });
            this.setState({ restStopVisible: false });
            this.setState({ otherVisible: false });
        } else if (option.label == "Attractions") {
            this.state.category = "Attractions";
            this.setState({ foodVisible: false });
            this.setState({ gasStationVisible: false });
            this.setState({ hotelVisible: false });
            this.setState({ attractionsVisible: true });
            this.setState({ restStopVisible: false });
            this.setState({ otherVisible: false });
        } else if (option.label == "Hotels") {
            this.state.category = "Hotels";
            this.setState({ foodVisible: false });
            this.setState({ gasStationVisible: false });
            this.setState({ hotelVisible: true });
            this.setState({ attractionsVisible: false });
            this.setState({ restStopVisible: false });
            this.setState({ otherVisible: false });
        } else if (option.label == "Rest Stops") {
            this.state.category = "Rest Stops";
            this.setState({ foodVisible: false });
            this.setState({ gasStationVisible: false });
            this.setState({ hotelVisible: false });
            this.setState({ attractionsVisible: false });
            this.setState({ restStopVisible: true });
            this.setState({ otherVisible: false });
        } else if (option.label == "Other") {
            this.setState({ foodVisible: false });
            this.setState({ gasStationVisible: false });
            this.setState({ hotelVisible: false });
            this.setState({ attractionsVisible: false });
            this.setState({ restStopVisible: false });
            this.setState({ otherVisible: true });
        } this.setState({ timeVisible: true });

    };



    //
    // _renderListItem(item) {
    //     console.log(item.criteriaName);
    //     return (
    //         <TouchableOpacity
    //             style={{
    //                 backgroundColor: 'white',
    //                 borderRadius: 3,
    //                 borderWidth: 1,
    //                 borderColor: 'black',
    //                 width: WIDTH,
    //                 height: 50
    //             }}
    //             onPress={() => {
    //
    //             }}>
    //
    //             <Text style={{color: 'black', textAlign: 'center', textAlignVertical: 'center'}}>
    //                 {item.category}: {item.criteriaName}</Text>
    //             <Text style={{color: 'black', textAlign: 'center', textAlignVertical: 'center'}}>
    //                 {item.time}</Text>
    //         </TouchableOpacity>);
    // };

    renderListItem(item, index) {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activityRowKey != null) {
                    this.setState({ activityRowKey: null })
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activityRowKey: item.key })
            },
            right: [
                {
                    onPress: () => {
                        Alert.alert('Alert', 'Are you sure you want to delete?',
                            [
                                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                {
                                    text: 'Yes', onPress: () => { this.deleteItemById(id) }
                                }], { cancelable: true }
                        );
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: index,
            sectionId: 1
        };
        return (
            <Swipeout {...swipeSettings} >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white'
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                        }}>

                            <Text style={{ color: 'black', textAlign: 'center', textAlignVertical: 'center' }}>
                                {item.category}: {item.criteriaName}</Text>
                            <Text style={{ color: 'black', textAlign: 'center', textAlignVertical: 'center' }}>
                                {item.time.toLocaleTimeString()}</Text>
                        </View>
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor: 'white'
                    }}>
                    </View>
                </View>
            </Swipeout>
        );
    }

    deleteItemById = (id) => {
        const filteredData = this.state.tripCriteria.filter(item => item.id != id);
        this.array = filteredData;
        this.setState({ tripCriteria: filteredData });
        console.log(this.state.tripCriteria)
    };

    _addTripInfo = () => {
        id++;
        this.array.push({
            category: this.state.category,
            time: this.state.time,
            criteriaName: this.state.criteriaName,
            id: id.toString(10)
        });
<<<<<<< HEAD
        this.setState({ tripCriteria: [...this.array] },
            function () {
                // console.log(this.state.tripCriteria);
            });
        this.setState({ hidden: false });
        this.setState({ isModalVisible: false });
        this.setState({ foodVisible: false });
        this.setState({ gasStationVisible: false });
        this.setState({ hotelVisible: false });
        this.setState({ attractionsVisible: false });
        this.setState({ restStopVisible: false });
        this.setState({ otherVisible: false });
        this.setState({ timeVisible: false });
        this.setState({ submitVisible: false });
        this.setState({ category: '' });
=======
        this.setState({tripCriteria: [...this.array]},
        function(){
           console.log(this.state.tripCriteria);
        } );
        this.setFalse();
        this.setState({category: ''});
>>>>>>> 88630a19e427a33ef063240509f94947265d8d48
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
        this.setState({ submitVisible: true });
    }
        ;

    _handleDatePicked = (date) => {
        this.setState({ time: date });
        this._hideDateTimePicker();
    };

    //converts time to hrs:minutes time period format
    formatTime = (date) => {
        console.log(date);
        var hrs = date.getHours();
        var timePeriod = "AM";
        if (hrs >= 12) {
            hrs = hrs - 12;
            timePeriod = "PM";
        }
        if (hrs === 0) {
            hrs = 12;
            timePeriod = "PM"
        }
        var min = date.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        var str = "" + hrs + ":" + min + " " + timePeriod;
        return str;
    };

    setFalse = () => {
        this.setState({
            isModalVisible: false,
            foodVisible: false,
            gasStationVisible: false,
            hotelVisible: false,
            attractionsVisible: false,
            restStopVisible: false,
            otherVisible: false,
            timeVisible: false,
            submitVisible: false
        })};

    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Categories' },
            { key: index++, label: 'Food' },
            { key: index++, label: 'Gas Station' },
            { key: index++, label: 'Attractions', },
            { key: index++, label: 'Hotels' },
            { key: index++, label: 'Rest Stops' },
            { key: index++, label: 'Other' }
        ];
        const food = [
            { key: index++, section: true, label: 'Food Genre' },
            { key: index++, label: 'American' },
            { key: index++, label: 'Chinese' },
            { key: index++, label: 'Italian', },
            { key: index++, label: 'Greek' },
            { key: index++, label: 'Mexican' },
            { key: index++, label: 'Fast Food' },
            { key: index++, label: 'Thai' },
            { key: index++, label: 'Japanese', },
            { key: index++, label: 'Indian' },
            { key: index++, label: 'Vietnamese' }
        ];
        const hotels = [
            { key: index++, section: true, label: 'Hotels' },
            { key: index++, label: 'Cheap' },
            { key: index++, label: 'Average' },
            { key: index++, label: 'Expensive' }
        ];
        const attractions = [
            { key: index++, section: true, label: 'Attractions' },
            { key: index++, label: 'Museum' },
            { key: index++, label: 'Scenic' },
            { key: index++, label: 'Park' },
            { key: index++, label: 'Zoo' },
            { key: index++, label: 'Child Friendly' },
        ];

        return (
            <ImageBackground source={require('../assets/images/road-mountains.jpg')}
                style={styles.ImageBackgroundContainer}>
                <ScrollView keyboardDismissMode='on-drag' ContentContainerStyle={{ alignItems: 'center' }}>
                    <Text style={styles.textInputText}>Trip Name</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => {
                        this.setState({ tripName: text })
                    }}
                        value={this.state.tripName}
                        editable={true} />

                    <Text style={styles.textInputText}>Daily Drive Time(hrs)</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => {
                        this.setState({ dailyDriveTime: text })
                    }}
                        value={this.state.dailyDriveTime}
                        editable={true} />

                    <Text style={styles.textInputText}>Number of Drivers</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text) => {
                        this.setState({ numberOfDrivers: text })
                    }}
                        value={this.state.numberOfDrivers}
                        editable={true} />

                    <Button title='Add Trip Criteria' onPress={this._toggleModal} style={styles.newTripButton}
                        position='center' />





                    <Modal isVisible={this.state.isModalVisible}
                           animationIn='bounceIn'
                           onBackdropPress={() => this.setFalse()}
                    >
                        <View style={{
                            flex: 0.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                        }}>

                            <ModalSelector
                                data={data}
                                initValue="Categories"
                                onChange={(option) => this.setCriteria(option)} />
                            {this.state.foodVisible ? <ModalSelector
                                data={food}
                                style={{ marginTop: 5 }}
                                initValue="Food Type"
                                onChange={(option) => this.setState({ criteriaName: option.label })} /> : null}
                            {this.state.attractionsVisible ? <ModalSelector
                                data={attractions}
                                style={{ marginTop: 5 }}
                                initValue="Attractions"
                                onChange={(option) => this.setState({ criteriaName: option.label })} /> : null}
                            {this.state.hotelVisible ? <ModalSelector
                                data={hotels}
                                style={{ marginTop: 5 }}
                                initValue="Hotel Price"
                                onChange={(option) => this.setState({ criteriaName: option.label })} /> : null}
                            {this.state.otherVisible ?
                                <Input
                                    style={styles.input}
                                    placeholder="Category"
                                    defaultValue={''}
                                    onChangeText={(text) => this.setState({ category: text })} />
                                : null}
                            {this.state.timeVisible ? <TouchableOpacity onPress={this._showDateTimePicker}>
                                <Text style={{ color: 'green', marginTop: 5 }}>Pick a Time</Text>
                            </TouchableOpacity> : null}

                            <DateTimePicker
                                titleIOS={"Choose a Time"}
                                mode='time'
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                            />
                            {this.state.submitVisible ? <TouchableOpacity onPress={this._addTripInfo} style={{ marginTop: 50 }}>
                                <Text style={{ color: 'blue' }}>Add</Text>
                            </TouchableOpacity> : null}
                        </View>
                    </Modal>

                    <FlatList
                        data={this.state.tripCriteria}
                        width='100%'
                        extraData={this.state.tripCriteria}
                        keyExtractor={(x, i) => i.toString()}
                        style={{ marginTop: 10 }}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={({ item, index }) => this.renderListItem(item, index)}
                    />

                    <Button title='StartTrip' buttonStyle={styles.button} style={styles.newTripButton}
                        onPress={this.onStartTripPress.bind(this)} />

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
        width: 200,
        marginTop: 10
    },

    textInputText: {
        alignItems: 'center',
        marginTop: 10,
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    flatList: {
        marginTop: 100
    },
    buttonText: {
        color: 'white',

    },
    textStyle: {
        color: 'red',
        textAlign: 'center',
        textAlignVertical: 'center',

    },
    container: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    modalTextCategory: {
        fontWeight: 'bold',
        alignContent: 'center',
    },
    modalTextTripCriteria: {
        fontWeight: 'bold',
        alignContent: 'center',
    },
    modalHoursCategory: {
        fontWeight: 'bold',
        alignContent: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 10,
    },


});