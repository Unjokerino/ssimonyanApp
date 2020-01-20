import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,

  Picker,
  TextInput
} from "react-native";
import { Snackbar, Button, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { Icon, Image } from "react-native-elements";

export default class AboutUsScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text class={styles.text}>
            Уникальная умная кровать Mi lar для малыша станет незаменимым помощником в воспитании!
          </Text>
          <View style={{justifyContent:'center',backgroundColor:'red'}}>
            <Image source={require('../assets/rock.png')} style={{width:490,height:307}}></Image>
          </View>
          <Text>Натуральные материалы и специальная конструкция обеспечит безопасность малыша, а широкий функционал облегчит задачу родителей.</Text>
          <Divider style={{ backgroundColor: '#FFE6E9' }}></Divider>
        </View>
      </ScrollView>
    );
  }
}

AboutUsScreen.navigationOptions = {
  title: "О приложении"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 16,
    flex: 1
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  textContainer: {},
  text: {
    padding: 10
  },
  button: {
    margin: 3
  }
});
