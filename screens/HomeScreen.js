import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button, } from 'react-native';
import { MenuCard } from '../components/MenuCard'

import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {

    return (

        <View style={styles.container}>
         
            <MenuCard icon_name="ios-play-circle" text="Медиа" />
            <MenuCard navigate="Settings" icon_name="ios-settings" text="Настройки" />

            <MenuCard icon_name="ios-information-circle-outline" text="О нас" />
     

        </View>
    );
}

HomeScreen.navigationOptions = {
    headerShown: false,
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: 'whitesmoke',
        flexDirection: "row",
        paddingTop: 60,
    },

});

