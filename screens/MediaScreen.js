import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground,
  RefreshControl,
  Picker,
  TextInput
} from "react-native";

import { Snackbar, Avatar, Button, Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image, Divider, CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Title } from "react-native-paper";
import { toHsv } from "react-native-color-picker";
import Constants from "../assets/constants";

import Language from "../assets/localisation/localisation";

export default class MediaScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      M_shuffle: false,
      M_repeat: false,
      lang: Language.language["ru"],
      showReconnect: false,
      playlist: [],
      volume: 40,
      M_mute: false,
      media_cs_name: "",
      show: false,
      refreshing: false
    };
  }

  sendMessage = message => {
    let snd = { media_cs_info: true };
    global.ws.send(JSON.stringify(message));
    //global.ws.send(JSON.stringify(snd));
  };

  getParams = () => {
    let snd = { media_cs_info: true };
    let playlist = { media_pl_info: true };
    let getSettings = { get_media_setting: true };

    global.ws.send(JSON.stringify(snd));
    //global.ws.send('{"media_cs_name": "text"}');
    global.ws.send(JSON.stringify(playlist));
    global.ws.send(JSON.stringify(getSettings));
    //global.ws.send(JSON.stringify(settings));
    /*
    global.ws.send(
      '[{"media_pl_nm": 1, "media_pl_name":"text1"}, {"media_pl_nm": 2, "media_pl_name":"text2"}, {"media_pl_nm": 2, "media_pl_name":"text2"}, {"media_pl_nm": 2, "media_pl_name":"text2"}, {"media_pl_nm": 2, "media_pl_name":"text2"}, {"media_pl_nm": 2, "media_pl_name":"text2"}, {"media_pl_nm": 2, "media_pl_name":"text2"}, {"media_pl_nm": 2, "media_pl_name":"text2"}, {"media_pl_nm": 2, "media_pl_name":"text2"}, {"media_pl_nm": 2, "media_pl_name":"text2"}]'
    );
    */
  };

  createCallbacks = () => {
    global.ws.onopen = () => {
      this.setState({
        visible: true,
        showReconnect: false,
        refreshing: false,
        snackbar_message: this.state.lang.connection_opened
      });
      this.getParams();
    };

    global.ws.onmessage = e => {
      let data = JSON.parse(e.data);
      if (data[0] != undefined) {
        if (data[0]["media_pl_nm"] != undefined) {
          this.setState({
            playlist: [...data]
          });
        }
      } else {
        console.log(e.data);
        this.setState({
          //visible: true,
          //snackbar_message: `[message] ${e.data}`,
          ...data
        });
      }
    };

    global.ws.onerror = e => {
      this.setState({
        visible: true,
        refreshing: false,
        showReconnect: true,
        snackbar_message: this.state.lang.connection_error
      });
    };

    global.ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };
  };

  openConnection = () => {
    global.ws = new WebSocket(Constants.socketURL);
    this.createCallbacks();
  };
  _goBack = () => {
    this.props.navigation.goBack();
  };

  componentDidMount() {
    if (global.language != undefined) {
      this.setState({
        lang: Language.language[global.language]
      });
    }

    if (ws.readyState === WebSocket.OPEN) {
      this.createCallbacks();
      this.getParams();
    } else {
      this.openConnection();
      this.setState({
        showReconnect: true,
        snackbar_message: this.state.lang.connection_error
      });
    }
  }

  render() {
    const lang = this.state.lang;
    return (
      <ImageBackground
        style={styles.container}
        source={require("../assets/stars.png")}
      >
        <Appbar.Header style={{ backgroundColor: "white", width: "100%" }}>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title={lang.media_screen} />
        </Appbar.Header>
        <View
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getParams}
            />
          }
        >
          <View
            style={{
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 21
            }}
          >
            <Image
              source={require("../assets/palyicon.png")}
              style={{ width: 240, height: 200 }}
            ></Image>
          </View>
          <Title style={{ textAlign: "center" }}>
            {this.state.media_cs_name}
          </Title>
          <View style={{ display: this.state.showReconnect ? "none" : "flex" }}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.sendMessage({ Media_Prev: true })}
                containerStyle={styles.button}
                type="clear"
                icon={{
                  name: "skip-previous",
                  size: 24,
                  color: "#2389de"
                }}
              >
                <Image
                  source={require("../assets/prev.png")}
                  style={{ width: 30, height: 40, resizeMode: "cover" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.sendMessage({ Media_Stop: true })}
                containerStyle={styles.button}
                icon={{
                  name: "stop",
                  size: 28,

                  color: "white"
                }}
              >
                <Image
                  source={require("../assets/stop.png")}
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.sendMessage({ Media_Pause: true })}
                containerStyle={styles.button}
                icon={{
                  name: "pause",
                  size: 28,
                  color: "white"
                }}
              >
                <Image
                  source={require("../assets/pause.png")}
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                containerStyle={styles.button}
                onPress={() => this.sendMessage({ Media_Play: true })}
              >
                <Image
                  source={require("../assets/play.png")}
                  style={{ width: 30, height: 40, resizeMode: "contain" }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.sendMessage({ Media_Next: true })}
                containerStyle={styles.button}
                type="clear"
                icon={{
                  name: "skip-next",
                  size: 24,
                  color: "#2389de"
                }}
              >
                <Image
                  source={require("../assets/next.png")}
                  style={{ width: 30, height: 40, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <CheckBox
                containerStyle={{ margin: 0, padding: 0 }}
                style={{ margin: 0 }}
                checkedIcon={
                  <TouchableOpacity containerStyle={styles.button}>
                    <Image
                      source={require("../assets/repeat.png")}
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: "contain"
                      }}
                    />
                  </TouchableOpacity>
                }
                uncheckedIcon={
                  <TouchableOpacity containerStyle={styles.button}>
                    <Image
                      source={require("../assets/repeatD.png")}
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: "contain"
                      }}
                    />
                  </TouchableOpacity>
                }
                checked={this.state.M_repeat}
                onPress={() => {
                  this.sendMessage({ M_repeat: !this.state.M_repeat });
                  this.setState({ M_repeat: !this.state.repeat });
                }}
                center
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    volume:
                      this.state.volume > 0
                        ? this.state.volume - 10
                        : this.state.volume
                  });
                  this.sendMessage({
                    Media_Vol: this.state.volume
                  });
                }}
                containerStyle={styles.button}
                icon={{
                  name: "volume-down",
                  size: 24,
                  color: "white"
                }}
              >
                <Image
                  source={require("../assets/VolumeMin.png")}
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                />
              </TouchableOpacity>

              <CheckBox
                containerStyle={{ margin: 0, padding: 0 }}
                style={{ margin: 0 }}
                checkedIcon={
                  <TouchableOpacity containerStyle={styles.button}>
                    <Image
                      source={require("../assets/mute.png")}
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: "contain"
                      }}
                    />
                  </TouchableOpacity>
                }
                uncheckedIcon={
                  <TouchableOpacity containerStyle={styles.button}>
                    <Image
                      source={require("../assets/muteD.png")}
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: "contain"
                      }}
                    />
                  </TouchableOpacity>
                }
                checked={this.state.Media_Mute}
                onPress={() => {
                  this.sendMessage({ Media_Mute: !this.state.Media_Mute });
                  this.setState({ Media_Mute: !this.state.Media_Mute });
                }}
                center
              />
              <TouchableOpacity
                containerStyle={styles.button}
                onPress={() => {
                  this.setState({
                    volume:
                      this.state.volume < 100
                        ? this.state.volume + 10
                        : this.state.volume
                  });
                  this.sendMessage({
                    Media_Vol: this.state.volume
                  });
                }}
                icon={{
                  name: "volume-up",
                  size: 24,
                  color: "white"
                }}
              >
                <Image
                  source={require("../assets/VolumeMax.png")}
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                />
              </TouchableOpacity>
              <CheckBox
                containerStyle={{ margin: 0, padding: 0 }}
                style={{ margin: 0 }}
                checkedIcon={
                  <TouchableOpacity containerStyle={styles.button}>
                    <Image
                      source={require("../assets/shuffle.png")}
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: "contain"
                      }}
                    />
                  </TouchableOpacity>
                }
                uncheckedIcon={
                  <TouchableOpacity containerStyle={styles.button}>
                    <Image
                      source={require("../assets/shuffleD.png")}
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: "contain"
                      }}
                    />
                  </TouchableOpacity>
                }
                checked={this.state.M_shuffle}
                onPress={() => {
                  this.sendMessage({ M_shuffle: !this.state.M_shuffle });
                  this.setState({ M_shuffle: !this.state.M_shuffle });
                }}
                center
              />
            </View>
          </View>
          <Divider
            style={{
              backgroundColor: "#FFE6E9",
              marginTop: 13,
              height: 2
            }}
          />
          <View
            style={{
              display: this.state.showReconnect ? "flex" : "none"
            }}
          >
            <Button
              disabled={this.state.showReconnect ? false : true}
              onPress={this.openConnection}
              color="red"
              title="Переподключиться"
            >
              {lang.reconnect}
            </Button>
          </View>
        </View>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.playlist}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text style={{ fontSize: 22, textAlign: "center" }}>
                {item.media_pl_name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.media_pl_nm}
        />
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
      </ImageBackground>
    );
  }
}

MediaScreen.navigationOptions = {
  headerShown: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    display: "flex",

    justifyContent: "space-between"
  },
  button: {
    color: "red",
    margin: 5
  }
});
