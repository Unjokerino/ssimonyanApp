import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Picker,
  TextInput
} from "react-native";
import { Snackbar, Button, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class AboutUsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text class={styles.text}>
            Уникальная умная кровать Mi lar для малыша станет незаменимым
            помощником в воспитании! Натуральные материалы и спецтальная
            конструкиця обсепечит безопасность малыша, а широкий функционал
            облегчит задачу родителей.
          </Text>
        </View>
      </View>
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
