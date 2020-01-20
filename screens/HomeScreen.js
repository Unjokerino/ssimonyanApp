import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ImageBackground,
  PickerItem
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MenuCard } from "../components/MenuCard";
import { Icon, Image } from "react-native-elements";

import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import { Picker } from "react-native";
import Language from "../assets/localisation/localisation";

export default function HomeScreen() {
  const [visible, setVisible] = useState(0);
  const [language, setLanguage] = useState(global.language);
  const { navigate } = useNavigation();

  let lang = Language.language[global.language || "am"];

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/background.png")}
      >
        <View
          style={{
            flexDirection: "column",

            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ height: 50, width: 200, justifyContent: "center" }}>
            <RNPickerSelect
              style={{ color: "black" }}
              value={global.language}
              onValueChange={(itemValue, itemIndex) => {
                _storeData(itemValue);
              }}
              items={[
                { label: "Русский", value: "ru" },
                { label: "Հայոց լեզու", value: "am" }
              ]}
            />
          </View>

          <MenuCard
            color="#f698a7"
            navigate="Media"
            icon_name="ios-play-circle"
            text={lang.media_screen || "Медиа"}
          />

          <MenuCard
            color="#abc5d2"
            navigate="Settings"
            icon_name="ios-settings"
            text={lang.settings_screen || "Настройки"}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "column", marginTop: 70 }}>
          <Image
            source={require("../assets/logo.png")}
            style={{ flex: 1, width: 270, height: 120 }}
          />
        </View>
        <TouchableOpacity
          style={{ marginBottom: 40 }}
          onPress={() => {
            navigate("AboutUs");
          }}
        >
          <View style={styles.cardTextContainer}>
            <Icon
              name="ios-information-circle-outline"
              type="ionicon"
              color="black"
              size={52}
            />
            <Text style={styles.title}>{}</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

HomeScreen.navigationOptions = {
  headerShown: false
};

_storeData = async itemValue => {
  try {
    await AsyncStorage.setItem("localisation", itemValue || "ru");
    console.log(value);
  } catch (error) {
    // Error saving data
  }
};

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("localisation");
    if (value !== null) {
      // We have data!!
      console.log(value);
      global.language = value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#eaeaea",
    justifyContent: "space-between",
    flexDirection: "column",
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
    fontFamily: "Arial_Unicode"
  }
});
