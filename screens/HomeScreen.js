import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button, ImageBackground, PickerItem } from "react-native";
import { MenuCard } from "../components/MenuCard";
import { Icon, Image } from "react-native-elements";

import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Picker } from "react-native";

export default function HomeScreen() {
  const { navigate } = useNavigation();
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/background.png')}

    >

      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <MenuCard
          color="#f698a7"
          navigate="Media"
          icon_name="ios-play-circle"
          text="Медиа"
        />

        <MenuCard
          color="#abc5d2"
          navigate="Settings"
          icon_name="ios-settings"
          text="Настройки"
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 70 }}>
        <Image
          source={require('../assets/logo.png')}
          style={{ flex: 1, width: 270, height: 120 }}
        />

      </View>
      <TouchableOpacity
        style={{ marginBottom: 40 }}
        onPress={() => {

          navigate('AboutUs');

        }}
      >
        <View style={styles.cardTextContainer}>
          <Icon
            name="ios-information-circle-outline"
            type="ionicon"
            color="black"
            size={52}
          />
          <Text style={styles.title}>О нас</Text>
        </View>
      </TouchableOpacity>


    </ImageBackground>
  );
}

HomeScreen.navigationOptions = {
  headerShown: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: 'center',
    backgroundColor: "#eaeaea",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: 60,
  },
  cardTextContainer: {
    flexDirection: "column",
    flexDirection: "row",
    alignItems: "center"

  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "Roboto"
  }
});
