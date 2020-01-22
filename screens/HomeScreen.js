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
  const [languageList, setLanguageList] = useState(Language.language["ru"]);
  const { navigate } = useNavigation();

  useEffect(() => {
    _retrieveData().then(checkLanguage());
  }, []);

  function checkLanguage() {
    if (global.language != undefined) {
      setLanguageList(Language.language[global.language]);
    } else {
      setTimeout(() => {
        checkLanguage();
      }, 1000);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/background.png")}
      >
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <View
            style={{
              flexDirection: "column",

              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                position: "relative",
                left: 100,
                height: 50,
                width: 150,
                justifyContent: "flex-end"
              }}
            >
              <RNPickerSelect
                placeholder={{}}
                style={{ color: "black", justifyContent: "right" }}
                value={global.language}
                onValueChange={(itemValue, itemIndex) => {
                  _storeData(itemValue);
                  global.language = itemValue;
                  setLanguage(itemValue);
                  setLanguageList(Language.language[itemValue]);
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
              text={languageList.media_screen || "Медиа"}
            />

            <MenuCard
              color="#abc5d2"
              navigate="Settings"
              icon_name="ios-settings"
              text={languageList.settings_screen}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginTop: 70,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: 70
            }}
          >
            <Image
              source={require("../assets/logo.png")}
              style={{ flex: 1, width: 270, height: 120 }}
            />
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
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
              <Text style={styles.title}>{languageList.aboutUs_screen}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    console.log(2, itemValue);
  } catch (error) {
    console.log(2, error);
  }
};

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("localisation");
    if (value !== null) {
      // We have data!!
      global.language = value;
      setLanguageList(Language.language[global.language]);
      console.log(1, value);
      return 1;
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
    paddingTop: 30
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
