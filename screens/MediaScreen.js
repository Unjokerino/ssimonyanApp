import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput
} from "react-native";
import { Snackbar, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

//var ws = new WebSocket("ws://192.168.1.1:9000");
var ws = new WebSocket("ws://192.168.1.1:9000");

export default class MediaScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      media_cs_name: "",
      show: false
    };
  }

  sendMessage = message => {
    let snd = { media_cs_info: true };

    ws.send(JSON.stringify(message));
    ws.send(JSON.stringify(snd));
  };

  componentDidMount() {
    ws.onopen = () => {
      this.setState({
        visible: true,
        snackbar_message: `Соединение открыто`
      });
      let snd = { media_cs_info: true };
      let playlist = { media_pl_info: true };
      ws.send(JSON.stringify(snd));
      ws.send(JSON.stringify(playlist));
    };

    ws.onmessage = e => {
      this.setState({
        visible: true,
        snackbar_message: `[message] ${e.data}`,
        ...e.data
      });
      this.setState({
        visible: true,
        snackbar_message: e.data
      });
    };

    ws.onerror = e => {
      this.setState({
        visible: true,
        snackbar_message: `[error] ${e.message}`
      });
    };

    ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>{this.state.media_cs_name}</Text>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            onPress={() => this.sendMessage({ Media_Prev: true })}
            containerStyle={styles.button}
            type="clear"
            icon={{
              name: "skip-previous",
              size: 24,
              color: "#2389de"
            }}
          />
          <Button
            onPress={() => this.sendMessage({ Media_Stop: true })}
            containerStyle={styles.button}
            icon={{
              name: "stop",
              size: 28,

              color: "white"
            }}
          />
          <Button
            onPress={() => this.sendMessage({ Media_Play: true })}
            containerStyle={styles.button}
            icon={{
              name: "pause",
              size: 28,
              color: "white"
            }}
          />
          <Button
            onPress={() => this.sendMessage({ Media_Pause: true })}
            containerStyle={styles.button}
            icon={{
              name: "play-arrow",
              size: 28,
              color: "white"
            }}
          />
          <Button
            onPress={() => this.sendMessage({ Media_Next: true })}
            containerStyle={styles.button}
            type="clear"
            icon={{
              name: "skip-next",
              size: 24,
              color: "#2389de"
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.button}
            onPress={() => this.sendMessage({ Media_Vol: 40 })}
            icon={{
              name: "volume-up",
              size: 24,
              color: "white"
            }}
          />

          <Button
            onPress={() => this.sendMessage({ Media_Vol: 40 })}
            containerStyle={styles.button}
            icon={{
              name: "volume-down",
              size: 24,
              color: "white"
            }}
          />
          <Button
            onPress={() => this.sendMessage({ Media_Mute: true })}
            containerStyle={styles.button}
            icon={{
              name: "volume-mute",
              size: 24,
              color: "white"
            }}
          />
          <Button
            onPress={() => this.sendMessage({ M_shuffle: true })}
            containerStyle={styles.button}
            icon={{
              name: "shuffle",
              size: 24,
              color: "white"
            }}
          />
          <Button
            onPress={() => this.sendMessage({ M_repeat: true })}
            containerStyle={styles.button}
            icon={{
              name: "repeat",
              size: 24,
              color: "white"
            }}
          />
        </View>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: "Окей",
            onPress: () => {
              // Do something
            }
          }}
        >
          {this.state.snackbar_message}
        </Snackbar>
      </View>
    );
  }
}

MediaScreen.navigationOptions = {
  title: "Медиа"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "whitesmoke"
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  button: {
    color: "red",
    margin: 5
  }
});
