import React from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Button, ImageBackground} from 'react-native';

export default class NewTripScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            startLoc:'',
            endLoc:'',
            dailyDriveTime: 0,
            tripName: '',
            scenic: false
        };
    }

    render() {
        return(
            <ImageBackground source={require('../assets/images/road-mountains.jpg')} style={styles.ImageBackgroundContainer}>
                <ScrollView keyboardDismissMode='on-drag' ContentContainerStyle={{alignItems: 'center'}}>
                    <Text style={{alignItems:'center'}}>Test Text 1</Text>
                    <TextInput style={styles.startLoc} onChangeText={(text)=>this.setState(startLoc)} 
                        value={this.state.startLoc}
                        editable={true} />
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
    }

});