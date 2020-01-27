import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  AsyncStorage,
  Picker,
  RefreshControl,
  TextInput
} from "react-native";
import {
  ListItem,
  CheckBox,
  Divider,
  Slider,
  Image
} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ColorPicker, toHsv, fromHsv } from "react-native-color-picker";
import {
  Snackbar,
  Modal,
  Portal,
  Text,
  Provider,
  Button,
  Appbar
} from "react-native-paper";

import Constants from "../assets/constants";
import Language from "../assets/localisation/localisation";

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerShown: false
    };
  };
  constructor(...args) {
    super(...args);
    this.state = {
      date: new Date("2020-06-12T14:42:42"),
      lang: Language.language["ru"],
      mode: "date",
      show: false,
      wsopen: false,
      showReconnect: false,
      refreshing: true,
      rock_auto: false,
      rock_state: false,
      time_mode: 1,
      time_on_h: 19,
      time_on_m: 12,
      time_off_h: 19,
      time_off_m: 30,
      time_off: new Date(0, 0, 0, 0, 0, 0, 0),
      time_on: new Date(0, 0, 0, 0, 0, 0, 0),
      time_dur: 0,
      time_pause: 0,
      rock_voice_en: false,
      rock_voice_time: 5,
      rock_voice_sens: 6,
      rock_motion_en: false,
      rock_motion_time: 2,
      rock_motion_sens: 4,
      media_active: false,
      led_state: false,
      R_led: 255,
      G_led: 0,
      B_led: 255,
      dt_dev: "21/01/2020 15:35:22",
      dt_now: "21/01/2020 15:35:22",
      fw_ver: "v1.0_beta",
      visibleModal: false
    };
    this.onColorChange = this.onColorChange.bind(this);
  }
  _showModal = () => this.setState({ visibleModal: true });
  _hideModal = () => this.setState({ visibleModal: false });
  onColorChange(color) {
    this.setState({ color });
  }

  HEXtoRGB = (hex, opacity) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    let result = "" + r + "," + g + "," + b + "," + opacity / 100 + "";
    return result;
  };

  RGBtoHEX = rgb => {
    rgb = rgb.match(
      /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    );
    return rgb && rgb.length === 4
      ? "#" +
          ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
      : "";
  };

  startClock = time => {
    setInterval(() => {}, 1000);
  };

  changeColor = color => {
    this.setState({
      R_led: color[0],
      G_led: color[1],
      B_led: color[2]
    });
    global.ws.send(
      JSON.stringify({
        R_led: color[0],
        G_led: color[1],
        B_led: color[2]
      })
    );
  };
  setDate = (event, date) => {
    let type = this.state.time_on_type;
    date = date || this.state.date;
    this.setState({
      show: Platform.OS === "ios" ? true : false
    });
    if (type === "time_on") {
      this.setState({
        time_on: date,
        time_on_h: date.getHours(),
        time_on_m: date.getMinutes()
      });
      global.ws.send(JSON.stringify({ time_on_h: date.getHours() }));
      global.ws.send(JSON.stringify({ time_on_m: date.getMinutes() }));
    } else if (type === "time_off") {
      this.setState({
        time_off: date,
        time_off_h: date.getHours(),
        time_off_m: date.getMinutes()
      });
      global.ws.send(JSON.stringify({ time_off_h: date.getHours() }));
      global.ws.send(JSON.stringify({ time_off_m: date.getMinutes() }));
    }
  };

  show = mode => {
    this.setState({
      show: true,
      mode
    });
  };

  timepicker = () => {
    this.show("time");
  };

  loadSetting = () => {
    this.setState({
      refreshing: true
    });
    if (ws.readyState !== WebSocket.OPEN) {
      this.openConnection();
    } else {
      this.setState({
        refreshing: false
      });
      let getParams = { get_setting: true };
      global.ws.send(JSON.stringify(getParams));
    }
  };

  createCallbacks = () => {
    global.ws.onopen = () => {
      this.setState({
        wsopen: true,
        visible: true,
        refreshing: false,
        snackbar_message: this.state.lang.connection_opened
      });
      let getParams = { get_setting: true };
      global.ws.send(JSON.stringify(getParams));
    };

    global.ws.onmessage = e => {
      console.log(e.data);
      this.setState({
        //visible: true,
        //snackbar_message: `[message] ${e.data}`,
        ...JSON.parse(e.data)
      });
    };

    global.ws.onerror = e => {
      this.setState({
        visible: true,
        refreshing: false,
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

      const title = Language.language[global.language].settings_screen;

      const { setParams } = this.props.navigation;
      setParams({ title });
    }
    if (ws.readyState === WebSocket.OPEN) {
      this.createCallbacks();
      let getParams = { get_setting: true };
      global.ws.send(JSON.stringify(getParams));
      let params = `{
        "rock_auto": true,
        "rock_state": true,
        "time_mode": 3, 
        "time_on_h": 5, 
        "time_on_m": 5, 
        "time_off_h": 5, 
        "time_off_m": 5, 
        "time_dur": 5, 
        "time_pause": 5, 
        "rock_voice_en": true, 
        "rock_voice_time": 5,
        "rock_voice_sens": 5,
        "rock_motion_en": true, 
        "rock_motion_time": 5,
        "rock_motion_sens": 5,
        "media_active": true, 
        "led_state": true, 
        "R_led": 113, 
        "G_led": 255, 
        "B_led": 255, 
        "dt_dev": "21/01/2020 12:35:22",
        "dt_now": "21/01/2020 12:35:22",
        "fw_ver": "v1.1_beta"
        }`;
      //global.ws.send(params);
      this.setState({
        wsopen: true,

        refreshing: false
      });
    } else {
      this.setState({
        //visible: true,
        showReconnect: true,
        refreshing: false
        //snackbar_message: this.state.lang.connection_error
      });
    }
  }

  render() {
    const { show, date, mode } = this.state;
    const lang = this.state.lang;
    const checked = <View style={styles.checked}></View>;

    return (
      <Provider>
        <Appbar.Header style={{ backgroundColor: "white" }}>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title={lang.settings_screen} />
        </Appbar.Header>
        <View style={[styles.container]}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.loadSetting}
              />
            }
          >
            <View
              style={{
                display: this.state.wsopen ? "none" : "flex",
                zIndex: 999
              }}
            >
              <Button
                disabled={this.state.wsopen ? true : false}
                onPress={this.loadSetting}
                title="Переподключиться"
                color="red"
              >
                {lang.reconnect}
              </Button>
            </View>
            <View style={{ display: this.state.wsopen ? "flex" : "none" }}>
              <View>
                <Text style={styles.title}>{lang.rock_type}</Text>
                <ListItem
                  title={<Text style={styles.text}>{lang.rock_auto}</Text>}
                  rightElement={
                    <CheckBox
                      checkedIcon={<View style={styles.checked}></View>}
                      uncheckedIcon={<View style={styles.unchecked}></View>}
                      checked={this.state["rock_auto"]}
                      onPress={() => {
                        global.ws.send(
                          JSON.stringify({ rock_auto: !this.state.rock_auto })
                        );
                        this.setState({ rock_auto: !this.state.rock_auto });
                      }}
                      center
                    />
                  }
                />

                <ListItem
                  containerStyle={{
                    opacity: this.state["rock_auto"] ? 0.4 : 1
                  }}
                  title={<Text style={styles.text}>{lang.rock_state}</Text>}
                  rightElement={
                    <CheckBox
                      checkedIcon={<View style={styles.checked}></View>}
                      uncheckedIcon={<View style={styles.unchecked}></View>}
                      disabled={this.state["rock_auto"]}
                      checked={this.state["rock_state"]}
                      onPress={() => {
                        global.ws.send(
                          JSON.stringify({
                            rock_state: !this.state["rock_state"]
                          })
                        );
                        this.setState({
                          rock_state: !this.state["rock_state"]
                        });
                      }}
                      center
                    />
                  }
                />
              </View>
              <View>
                <Text style={styles.title}>{lang.rock_state_time}</Text>
                <View>
                  <View>
                    {show && (
                      <DateTimePicker
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setDate}
                      />
                    )}
                  </View>
                </View>

                <ListItem
                  title={
                    <RNPickerSelect
                      placeholder={{}}
                      value={this.state.time_mode}
                      onValueChange={(itemValue, itemIndex) => {
                        if (itemValue != this.state.time_mode) {
                          this.setState({ time_mode: itemValue });
                          console.log(itemValue, this.state.time_mode);
                          if (this.state.wsopen) {
                            global.ws.send(
                              JSON.stringify({ time_mode: itemValue })
                            );
                          }
                        }
                      }}
                      items={[
                        { label: lang.off, value: 1 },
                        { label: lang.solo, value: 2 },
                        { label: lang.multi, value: 3 }
                      ]}
                    />
                  }
                />
                <View style={{}}>
                  <ListItem
                    style={{
                      opacity: this.state["time_mode"] == "1" ? 0.5 : 1
                    }}
                    title={<Text style={styles.text}>{lang.time_on}</Text>}
                    rightElement={
                      <TouchableOpacity
                        disabled={this.state["time_mode"] == "1" ? true : false}
                        onPress={() => {
                          this.timepicker();
                          this.setState({ time_on_type: "time_on" });
                        }}
                      >
                        <Text style={styles.input}>
                          {this.state.time_on_h + ":" + this.state.time_on_m}
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                  <ListItem
                    title={<Text style={styles.text}>{lang.time_off}</Text>}
                    style={{
                      opacity: this.state["time_mode"] == "1" ? 0.5 : 1
                    }}
                    rightElement={
                      <TouchableOpacity
                        disabled={this.state["time_mode"] == "1" ? true : false}
                        onPress={() => {
                          this.timepicker();
                          this.setState({ time_on_type: "time_off" });
                        }}
                      >
                        <Text style={styles.input}>
                          {this.state.time_off_h + ":" + this.state.time_off_m}
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                  <ListItem
                    style={{
                      opacity:
                        this.state["time_mode"] == "1" ||
                        this.state["time_mode"] == "2"
                          ? 0.5
                          : 1
                    }}
                    title={<Text style={styles.text}>{lang.dur}</Text>}
                    rightElement={
                      <TextInput
                        onChangeText={text => {
                          global.ws.send(JSON.stringify({ time_dur: text }));
                          this.setState({ time_dur: text });
                        }}
                        value={this.state.time_dur.toString()}
                        editable={
                          this.state["time_mode"] == "1" ||
                          this.state["time_mode"] == "2"
                            ? false
                            : true
                        }
                        style={styles.input}
                        keyboardType="phone-pad"
                      />
                    }
                  />
                  <ListItem
                    style={{
                      opacity:
                        this.state["time_mode"] == "1" ||
                        this.state["time_mode"] == "2"
                          ? 0.5
                          : 1
                    }}
                    title={<Text style={styles.text}>{lang.pause}</Text>}
                    rightElement={
                      <TextInput
                        onChangeText={text => {
                          global.ws.send(JSON.stringify({ time_pause: text }));
                          this.setState({ time_pause: text });
                        }}
                        value={this.state.time_pause.toString()}
                        editable={
                          this.state["time_mode"] == "1" ||
                          this.state["time_mode"] == "2"
                            ? false
                            : true
                        }
                        style={styles.input}
                        keyboardType="phone-pad"
                      />
                    }
                  />
                </View>
              </View>
              <View>
                <Text style={styles.title}>{lang.act_on_sound}</Text>
                <View style={[styles.card]}>
                  <ListItem
                    title={<Text style={styles.text}>{lang.act_on}</Text>}
                    rightElement={
                      <CheckBox
                        checkedIcon={<View style={styles.checked}></View>}
                        uncheckedIcon={<View style={styles.unchecked}></View>}
                        checked={this.state["rock_voice_en"]}
                        onPress={() => {
                          global.ws.send(
                            JSON.stringify({
                              rock_voice_en: !this.state.rock_voice_en
                            })
                          );
                          this.setState({
                            rock_voice_en: !this.state["rock_voice_en"]
                          });
                        }}
                      />
                    }
                  />
                  <View
                    style={{ opacity: this.state["rock_voice_en"] ? 1 : 0.5 }}
                  >
                    <ListItem
                      title={<Text style={styles.text}>{lang.dur}</Text>}
                      rightElement={
                        <TextInput
                          onChangeText={text => {
                            global.ws.send(
                              JSON.stringify({
                                rock_voice_time: text
                              })
                            );
                            this.setState({ rock_voice_time: text });
                          }}
                          value={String(this.state.rock_voice_time)}
                          style={styles.input}
                          keyboardType="phone-pad"
                        />
                      }
                    />

                    <ListItem
                      title={
                        <View>
                          <Text style={styles.text}>{lang.mic_sens}</Text>
                          <Slider
                            minimumTrackTintColor={"#FFBFC9"}
                            thumbTintColor={"#FFBFC9"}
                            minimumValue={0}
                            maximumValue={10}
                            value={this.state["rock_voice_sens"]}
                            onSlidingComplete={rock_voice_sens => {
                              rock_voice_sens = Math.round(rock_voice_sens);
                              global.ws.send(
                                JSON.stringify({
                                  rock_voice_sens: rock_voice_sens
                                })
                              );
                              this.setState({
                                rock_voice_sens: rock_voice_sens
                              });
                            }}
                          />
                        </View>
                      }
                    />
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.title}> {lang.on_m_activ}</Text>

                <ListItem
                  title={<Text style={styles.text}>{lang.act_on}</Text>}
                  rightElement={
                    <CheckBox
                      checkedIcon={<View style={styles.checked}></View>}
                      uncheckedIcon={<View style={styles.unchecked}></View>}
                      checked={this.state.rock_motion_en}
                      onPress={() => {
                        global.ws.send(
                          JSON.stringify({
                            rock_motion_en: !this.state.rock_motion_en
                          })
                        );
                        this.setState({
                          rock_motion_en: !this.state.rock_motion_en
                        });
                      }}
                    />
                  }
                />
                <View
                  style={[
                    { opacity: this.state["rock_motion_en"] ? 1 : 0.5 },
                    styles.card
                  ]}
                >
                  <ListItem
                    title={<Text style={styles.text}>{lang.dur}</Text>}
                    rightElement={
                      <TextInput
                        onChangeText={text => {
                          global.ws.send(
                            JSON.stringify({
                              rock_motion_time: text
                            })
                          );
                          this.setState({ rock_motion_time: text });
                        }}
                        value={String(this.state.rock_motion_time)}
                        style={styles.input}
                        keyboardType="phone-pad"
                      />
                    }
                  />

                  <ListItem
                    title={
                      <View>
                        <Text style={styles.text}>{lang.mot_sens}</Text>
                        <Slider
                          minimumTrackTintColor={"#FFBFC9"}
                          thumbTintColor={"#FFBFC9"}
                          minimumValue={0}
                          maximumValue={10}
                          value={this.state.rock_motion_sens}
                          onSlidingComplete={rock_motion_sens => {
                            rock_motion_sens = Math.round(rock_motion_sens);
                            global.ws.send(
                              JSON.stringify({
                                rock_motion_sens: rock_motion_sens
                              })
                            );

                            this.setState({
                              rock_motion_sens: rock_motion_sens
                            });
                          }}
                        />
                      </View>
                    }
                  />
                </View>
              </View>
              <View>
                <Text style={styles.title}></Text>
                <ListItem
                  title={<Text style={styles.text}>{lang.on_dur_rock}</Text>}
                  rightElement={
                    <CheckBox
                      checkedIcon={<View style={styles.checked}></View>}
                      uncheckedIcon={<View style={styles.unchecked}></View>}
                      checked={this.state.media_active}
                      onPress={() => {
                        global.ws.send(
                          JSON.stringify({
                            media_active: !this.state.media_active
                          })
                        );
                        this.setState({
                          media_active: !this.state["media_active"]
                        });
                      }}
                    />
                  }
                />
              </View>
              <View>
                <Text style={styles.title}>{lang.light}</Text>
                <ListItem
                  title={<Text style={styles.text}>{lang.on}</Text>}
                  rightElement={
                    <CheckBox
                      checkedIcon={<View style={styles.checked}></View>}
                      uncheckedIcon={<View style={styles.unchecked}></View>}
                      checked={this.state.led_state}
                      onPress={() => {
                        global.ws.send(
                          JSON.stringify({
                            led_state: !this.state.led_state
                          })
                        );
                        this.setState({
                          led_state: !this.state.led_state
                        });
                      }}
                    />
                  }
                />
                <View style={styles.card}>
                  <ListItem
                    title={<Text style={styles.text}>{lang.choose_color}</Text>}
                  />

                  <TouchableOpacity
                    style={{
                      marginHorizontal: 21,
                      marginBottom: 32,
                      height: 70,
                      backgroundColor: this.RGBtoHEX(
                        `rgba(${this.state.R_led},${this.state.G_led},${this.state.B_led})`
                      )
                    }}
                    onPress={this._showModal}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.title}>{lang.time}</Text>
                <ListItem
                  title={
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row"
                      }}
                    >
                      <Text style={styles.text}>
                        {this.state["dt_dev"].split(" ")[0]}
                      </Text>
                      <Text style={[styles.input, styles.text]}>
                        {this.state["dt_dev"].split(" ")[1]}
                      </Text>
                    </View>
                  }
                />
                <Button
                  onPress={() => {
                    let date = new Date();
                    let year = date.getFullYear().toString();
                    let month = date.getMonth() + 1;
                    month = month.toString();
                    let day = date.getDate().toString();
                    let hours = date.getHours().toString();

                    let minutes = date.getMinutes().toString();
                    let seconds = date.getSeconds().toString();
                    month.length == 1 ? (month = "0" + month) : "";
                    day.length == 1 ? (day = "0" + day) : "";
                    hours.length == 1 ? (hours = "0" + hours) : "";
                    minutes.length == 1 ? (minutes = "0" + minutes) : "";
                    seconds.length == 1 ? (seconds = "0" + seconds) : "";

                    date = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
                    global.ws.send(
                      JSON.stringify({
                        dt_now: date
                      })
                    );
                  }}
                  color="#FF6179"
                  title={lang.update}
                >
                  {lang.update}
                </Button>
              </View>
              <View>
                <Text style={styles.title}>{lang.versions}</Text>
                <ListItem
                  title={
                    <Text style={styles.text}>{this.state["fw_ver"]}</Text>
                  }
                />
              </View>
            </View>
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

          <Portal>
            <Modal
              visible={this.state.visibleModal}
              onDismiss={this._hideModal}
            >
              <View style={{ height: 500 }}>
                <ColorPicker
                  defaultColor={this.RGBtoHEX(
                    `rgba(${this.state.R_led},${this.state.G_led},${this.state.B_led})`
                  )}
                  onColorSelected={color => {
                    this._hideModal();
                    let HEXcolor = this.HEXtoRGB(color, 0).split(",");
                    let R_led = Number(HEXcolor[0]);
                    let G_led = Number(HEXcolor[1]);
                    let B_led = Number(HEXcolor[2]);
                    this.changeColor(HEXcolor);
                  }}
                  style={{ flex: 1 }}
                />
              </View>
            </Modal>
          </Portal>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Arial_Unicode",
    fontSize: 18,
    backgroundColor: "#EFFAFF"
  },
  text: {
    fontSize: 18,
    fontFamily: "Arial_Unicode"
  },
  title: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    opacity: 0.5,
    color: "#0C5D82",
    fontFamily: "Arial_Unicode",
    fontSize: 16
  },
  checked: {
    backgroundColor: "#FF6179",
    borderRadius: 30,
    height: 33,
    width: 33
  },
  unchecked: {
    borderWidth: 1,
    borderColor: "#FF6179",
    borderRadius: 30,
    height: 33,
    width: 33
  },
  input: {
    minWidth: 70,
    backgroundColor: "#FFE5E9",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 2,
    paddingHorizontal: 6
  },
  card: {
    backgroundColor: "#fff"
  }
});
