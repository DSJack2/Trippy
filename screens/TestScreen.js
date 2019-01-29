import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import ExpoLinksView from '@expo/samples/ExpoConfigView';

export default class TestScreen extends React.Component {
    static navigationOptions = {
        title: 'Test',
        header: null,
    };

    render() {
        return (
            <ScrollView style={StyleSheet.container}>
                <ExpoLinksView />
            </ScrollView>
        );
        
    }
}
