import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Picker,
  Button,
  TextInput
} from "react-native";
import { ListItem, CheckBox, Divider, Slider } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TriangleColorPicker, toHsv } from "react-native-color-picker";

export default class SettingsScreen extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      date: new Date("2020-06-12T14:42:42"),
      mode: "date",
      show: false,
      rock_auto: false,
      rock_state: false,
      time_mode: 3,
      color: toHsv("green")
    };
    this.onColorChange = this.onColorChange.bind(this);
  }

  onColorChange(color) {
    this.setState({ color });
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === "ios" ? true : false,
      date
    });
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
  render() {
    const { show, date, mode } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>Режим качания</Text>
            <ListItem
              title="Автоматическое качание"
              rightElement={
                <CheckBox
                  checked={this.state.rock_auto}
                  onPress={() =>
                    this.setState({ rock_auto: !this.state.rock_auto })
                  }
                  center
                />
              }
            />
            <Divider></Divider>
            <ListItem
              title="Включить качание"
              rightElement={
                <CheckBox
                  disabled={this.state.rock_auto}
                  checked={this.state.rock_state}
                  onPress={() =>
                    this.setState({ rock_state: !this.state.rock_state })
                  }
                  center
                />
              }
            />
          </View>
          <View>
            <Text style={styles.title}>Автоматическое качание по времени</Text>
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
                <Picker
                  selectedValue={this.state.time_mode}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ time_mode: itemValue })
                  }
                >
                  <Picker.Item label="Выкл" value="1" />
                  <Picker.Item label="Одиночный режим" value="2" />
                  <Picker.Item label="Многоразовый" value="3" />
                </Picker>
              }
            />

            <ListItem
              title="Время включения"
              rightElement={
                <TouchableOpacity
                  onPress={this.timepicker}
                  style={styles.input}
                >
                  <Text>
                    {this.state.date.getHours() +
                      ":" +
                      this.state.date.getMinutes()}
                  </Text>
                </TouchableOpacity>
              }
            />
            <ListItem
              title="Время выключения"
              rightElement={
                <TouchableOpacity
                  onPress={this.timepicker}
                  style={styles.input}
                >
                  <Text>
                    {this.state.date.getHours() +
                      ":" +
                      this.state.date.getMinutes()}
                  </Text>
                </TouchableOpacity>
              }
            />
            <ListItem
              title="Длительность, сек"
              rightElement={
                <TextInput style={styles.input} keyboardType="phone-pad" />
              }
            />
            <ListItem
              title="Пауза, сек"
              rightElement={
                <TextInput style={styles.input} keyboardType="phone-pad" />
              }
            />
          </View>
          <View>
            <Text style={styles.title}>Активация по звуку</Text>
            <View stlyle={styles.card}>
              <ListItem
                title="Включить активацию"
                rightElement={
                  <CheckBox
                    checked={this.state.rock_voice_en}
                    onPress={() =>
                      this.setState({
                        rock_voice_en: !this.state.rock_voice_en
                      })
                    }
                  />
                }
              />
              <ListItem
                title="Длительность, сек"
                rightElement={
                  <TextInput style={styles.input} keyboardType="phone-pad" />
                }
              />

              <ListItem
                title={
                  <View>
                    <Text>
                      Чувствительность микрофона {this.state.rock_voice_sens}
                    </Text>
                    <Slider
                      minimumTrackTintColor={"#2089dc"}
                      thumbTintColor={"#2089dc"}
                      minimumValue={0}
                      maximumValue={10}
                      value={this.state.rock_voice_sens}
                      onValueChange={rock_voice_sens => {
                        rock_voice_sens = Math.round(rock_voice_sens);
                        this.setState({ rock_voice_sens });
                      }}
                    />
                  </View>
                }
              />
            </View>
          </View>
          <View>
            <Text style={styles.title}>Активация по движению</Text>
            <View stlyle={styles.card}>
              <ListItem
                title="Включить активацию"
                rightElement={
                  <CheckBox
                    checked={this.state.rock_moition_en}
                    onPress={() =>
                      this.setState({
                        rock_moition_en: !this.state.rock_moition_en
                      })
                    }
                  />
                }
              />
              <ListItem
                title="Длительность, сек"
                rightElement={
                  <TextInput style={styles.input} keyboardType="phone-pad" />
                }
              />

              <ListItem
                title={
                  <View>
                    <Text>
                      Чувствительность движений {this.state.rock_motion_time}
                    </Text>
                    <Slider
                      minimumTrackTintColor={"#2089dc"}
                      thumbTintColor={"#2089dc"}
                      minimumValue={0}
                      maximumValue={10}
                      value={this.state.rock_motion_sens}
                      onValueChange={rock_motion_sens => {
                        rock_motion_sens = Math.round(rock_motion_sens);
                        this.setState({ rock_motion_sens });
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
              title="Вкл плеера во время качания"
              rightElement={
                <CheckBox
                  checked={this.state.media_active}
                  onPress={() =>
                    this.setState({
                      media_active: !this.state.media_active
                    })
                  }
                />
              }
            />
          </View>
          <View>
            <Text style={styles.title}>Освещение</Text>
            <ListItem
              title="Вкл"
              rightElement={
                <CheckBox
                  checked={this.state.led_state}
                  onPress={() =>
                    this.setState({
                      led_state: !this.state.led_state
                    })
                  }
                />
              }
            />
            <View
              style={{ padding: 45, height: 1000, backgroundColor: "#212021" }}
            >
              <Text style={{ color: "white" }}>
                React Native Color Picker - Controlled
              </Text>
              <TriangleColorPicker
                oldColor="purple"
                style={{ margin: 0, padding: 0, height: 500 }}
                color={this.state.color}
                onColorChange={this.onColorChange}
                onColorSelected={color => alert(`Color selected: ${color}`)}
                onOldColorSelected={color =>
                  alert(`Old color selected: ${color}`)
                }
                style={{ flex: 1 }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.title}>Время на устройстве</Text>
            <ListItem
              title={
                <Text>
                  {new Date().getFullYear()}/{new Date().getMonth() + 1}/
                  {new Date().getDate()} {new Date().getHours()}:
                  {new Date().getMinutes()}:{new Date().getSeconds()}
                </Text>
              }
            />
          </View>
          <View>
            <Text style={styles.title}>Версии</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

SettingsScreen.navigationOptions = {
  title: "Настройки"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "whitesmoke"
  },
  title: {
    padding: 10,
    opacity: 0.5,
    fontFamily: "Roboto",
    fontSize: 16
  },
  input: {
    backgroundColor: "whitesmoke",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 6
  },
  card: {}
});
