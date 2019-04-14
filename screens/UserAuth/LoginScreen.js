import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                //Do nothing
            }, (error) => {
                Alert.alert(error.message);
            });


    }

    onCreateAccountPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Signup' })
            ],

        });

        this.props.navigation.dispatch(navActions);
    }

    onForgotPasswordPress = () => {
        var navActions = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'ForgotPassword' })
            ]
        });

        this.props.navigation.dispatch(navActions);
    }

    render() {
        return (
            <View style={{ paddingTop: 50, alignItems: 'center', flex: 1}}>

                <Text>Login Screen</Text>
                <Input style={{ width: 100, height: 40}}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    placeholder='Email Address'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    leftIcon={
                        <Icon 
                            name='envelope-o'
                            size={20}
                            style={{marginRight: 5}}/>
                    }
                />

                <View style={{ paddingTop: 15 }} />

                <Input style={{ width: 100, height: 40}}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    placeholder='Password'
                    secureTextEntry={true}
                    leftIcon={
                        <Icon 
                            name='lock'
                            size={20}
                            style={{marginRight: 5}}/>
                    }
                />

                <Button title='Login' onPress={this.onLoginPress} />
                <Button title='Create Account' onPress={this.onCreateAccountPress} />
                <Button title='Forgot Password' color='red' onPress={this.onForgotPasswordPress} />

            </View>
        );


    }
}

const styles = StyleSheet.create({

});