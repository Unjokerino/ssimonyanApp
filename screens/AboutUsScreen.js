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
import { Snackbar, Button, Avatar,Appbar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { Icon, Image } from "react-native-elements";

import Language from "../assets/localisation/localisation";

export default class AboutUsScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      language: Language.language['ru']
    };
  }
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

  componentDidMount(){
    console.log('global',global.language)
    if(global.language != undefined){
      this.setState({
        language:Language.language[global.language]
      })
    }
  }

  _goBack = () =>{
    this.props.navigation.goBack()
  }
  render() {
    const language = this.state.language;
    
    return (
      
      <ImageBackground
        style={styles.container}
        source={require("../assets/stars.png")}
      >
           <Appbar.Header style={{ backgroundColor: "white", width: "100%" }}>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title={language.media_screen} />
        </Appbar.Header>
        <ScrollView style={{ paddingHorizontal: 16 }}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{language.desciption_first_part}</Text>
            <View
              style={{
                justifyContent: "center",

                alignItems: "center"
              }}
            >
              <Image
                source={require("../assets/rock.png")}
                style={{ width: 500, height: 300 }}
              />
            </View>
            <Text style={styles.text}>{language.desciption_second_part}</Text>
            <Divider
              style={{
                backgroundColor: "#FFE6E9",
                marginVertical: 13,
                height: 2
              }}
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
 headerShown:false
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

    flex: 1
  },
  image_icon: {
    width: 33,
    height: 33
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
    fontSize: 18,
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
