import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Picker,
  TextInput
} from "react-native";
import { Snackbar, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { toHsv } from "react-native-color-picker";

export default class MediaScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      shuffle: false,
      repeat: false,
      playlist: [],
      volume: 40,
      mute: false,
      media_cs_name: "",
      show: false,
      refreshing: false
    };
  }

  sendMessage = message => {
    let snd = { media_cs_info: true };
    global.ws.send(JSON.stringify(message));
    global.ws.send(JSON.stringify(snd));
  };

  getParams = () => {
    let snd = { media_cs_info: true };
    let playlist = { media_pl_info: true };
    global.ws.send(JSON.stringify(snd));
    global.ws.send('{"media_cs_name": "text"}');
    global.ws.send(JSON.stringify(playlist));
    global.ws.send(
      '{"media_pl_nm": 1, "media_pl_name":"text1", "media_pl_nm": 2, "media_pl_name":"text2"}'
    );
  };

  componentDidMount() {
    if (global.ws.OPEN) {
      this.getParams();
    }
    global.ws.onopen = () => {
      this.setState({
        visible: true,
        refreshing: false,
        snackbar_message: `Соединение открыто`
      });
      this.getParams();
    };

    global.ws.onmessage = e => {
      let data = JSON.parse(e.data);
      if (data["media_pl_nm"] != undefined) {
        this.setState({
          playlist: e.data
        });
      } else {
        this.setState({
          visible: true,
          snackbar_message: `[message] ${e.data}`,
          ...data
        });
      }
      this.setState({
        visible: true,
        snackbar_message: e.data
      });
    };

    global.ws.onerror = e => {
      this.setState({
        visible: true,
        refreshing: false,
        snackbar_message: `Проблема подключения с устройством`
      });
    };

    global.ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getParams}
            />
          }
        >
          <Title style={{ textAlign: "center" }}>
            {this.state.media_cs_name}
          </Title>

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
              onPress={() => this.sendMessage({ Media_Pause: true })}
              containerStyle={styles.button}
              icon={{
                name: "pause",
                size: 28,
                color: "white"
              }}
            />
            <Button
              onPress={() => this.sendMessage({ Media_Play: true })}
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
              onPress={() => {
                this.setState({
                  volume: this.state.volume + 10
                });
                this.sendMessage({
                  Media_Vol:
                    this.state.volume < 100
                      ? this.state.volume + 10
                      : this.state.volume
                });
              }}
              icon={{
                name: "volume-up",
                size: 24,
                color: "white"
              }}
            />

            <Button
              onPress={() => {
                this.setState({
                  volume: this.state.volume - 10
                });
                this.sendMessage({
                  Media_Vol:
                    this.state.volume > 0
                      ? this.state.volume - 10
                      : this.state.volume
                });
              }}
              containerStyle={styles.button}
              icon={{
                name: "volume-down",
                size: 24,
                color: "white"
              }}
            />
            <Button
              onPress={() => this.sendMessage({ Media_Mute: !this.state.mute })}
              containerStyle={styles.button}
              icon={{
                name: "volume-mute",
                size: 24,
                color: "white"
              }}
            />
            <Button
              onPress={() => {
                this.sendMessage({ M_shuffle: !this.state.shuffle });
                this.setState({ M_shuffle: !this.state.M_shuffle });
              }}
              containerStyle={styles.button}
              icon={{
                name: "shuffle",
                size: 24,
                color: "white"
              }}
            />
            <Button
              onPress={() => {
                this.sendMessage({ M_repeat: !this.state.repeat });
                this.setState({ M_repeat: !this.state.M_repeat });
              }}
              containerStyle={styles.button}
              icon={{
                name: "repeat",
                size: 24,
                color: "white"
              }}
            />
          </View>
          <Text style={{ textAlign: "center" }}>{this.state.playlist}</Text>
        </ScrollView>
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
