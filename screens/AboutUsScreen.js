import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Picker,
    TextInput
} from "react-native";
import { Snackbar, Button, Avatar } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";

export default class AboutUsScreen extends React.Component {

    render() {

        return (
            <View><Text>О приложении</Text></View>
        )
    }
}

AboutUsScreen.navigationOptions = {
    title: "О приложении"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: "whitesmoke"
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    button: {
        margin: 3
    },

})