import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  View,
  Picker,
  TextInput,
  ImageBackground
} from "react-native";
import { Snackbar, Button, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { Icon, Image } from "react-native-elements";

export default class AboutUsScreen extends React.Component {
  toMail = () => {
    Linking.openURL("mailto:sales@milar.am");
    title = "sales@milar.am";
  };
  toSite = () => {
    Linking.openURL("http://www.milar.am");
  };
  toViber = () => {
    Linking.openURL("tel:37455110990");
  };
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../assets/stars.png")}
      >
        <ScrollView style={{ paddingHorizontal: 16 }}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Уникальная умная кровать Mi lar для малыша станет незаменимым
              помощником в воспитании!
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../assets/rock.png")}
                style={{ width: 500, height: 300 }}
              />
            </View>
            <Text style={styles.text}>
              Натуральные материалы и специальная конструкция обеспечит
              безопасность малыша, а широкий функционал облегчит задачу
              родителей.
            </Text>
            <Divider
              style={{ backgroundColor: "#FFE6E9", marginVertical: 13 }}
            ></Divider>
          </View>
          <View>
            <TouchableOpacity onPress={this.toMail} style={styles.contact}>
              <Image
                style={styles.image_icon}
                source={require("../assets/123.png")}
              ></Image>
              <Text style={[styles.text, styles.title]}> sales@milar.am </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toSite} style={styles.contact}>
              <Image
                style={styles.image_icon}
                source={require("../assets/web.png")}
              ></Image>
              <Text style={[styles.text, styles.title]}> www.milar.am </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toViber} style={styles.contact}>
              <Image
                style={styles.image_icon}
                source={require("../assets/viber.png")}
              ></Image>
              <Text style={[styles.text, styles.title]}>
                (+374) 55-110-990{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

AboutUsScreen.navigationOptions = {
  title: "О приложении"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

    flex: 1
  },
  image_icon: {
    width: 40,
    height: 40
  },
  contact: {
    marginLeft: 15,
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row"
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  textContainer: {
    paddingVertical: 25
  },
  text: {
    fontSize: 16,
    fontFamily: "Arial_Unicode"
  },
  title: {
    fontSize: 18,
    marginLeft: 16
  },
  button: {
    margin: 3
  }
});
