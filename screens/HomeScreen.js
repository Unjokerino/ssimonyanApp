import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button } from "react-native";
import { MenuCard } from "../components/MenuCard";
import { Icon } from "react-native-elements";

import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
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

      <MenuCard
        navigate="AboutUs"
        icon_name="ios-information-circle-outline"
        text="О нас"
      />
      <TouchableOpacity
        onPress={() => {
          if (props.navigate != undefined) {
            navigate(props.navigate);
          }
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
    </View>
  );
}

HomeScreen.navigationOptions = {
  headerShown: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: "#eaeaea",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 60
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
