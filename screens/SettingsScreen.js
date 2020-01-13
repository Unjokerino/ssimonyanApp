import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Picker,
    Button,
    RefreshControl,
    TextInput
} from "react-native";
import { ListItem, CheckBox, Divider, Slider } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import ColorPalette from 'react-native-color-palette'
import { Snackbar } from 'react-native-paper';





export default class SettingsScreen extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            date: new Date("2020-06-12T14:42:42"),
            time_off: new Date("2020-06-12T14:42:42"),
            time_on: new Date("2020-06-12T14:42:42"),
            mode: "date",
            show: false,
            refreshing: false,
            "rock_auto": true,
            "rock_state": false,
            "time_mode": 3,
            "time_on_h": 19,
            "time_on_m": 12,
            "time_off_h": 19,
            "time_off_m": 30,
            "time_dur": 2,
            "time_pause": 3,
            "rock_voice_en": false,
            "rock_voice_time": 5,
            "rock_voice_sens ": 6,
            "rock_motion_en": true,
            "rock_motion_time": 2,
            "rock_motion_sens ": 4,
            "media_active": true,
            "led_state": true,
            "R_led": 255,
            "G_led": 0,
            "B_led": 115,
            "dt_dev": "21/01/2020 15:35:22",
            "dt_now": "21/01/2020 15:35:22",
            "fw_ver": "v1.0_beta"



        };
        this.onColorChange = this.onColorChange.bind(this);
    }


    onColorChange(color) {
        this.setState({ color });
    }

    setDate = (event, date) => {
        let type = this.state.time_on_type
        date = date || this.state.date;
        this.setState({
            show: Platform.OS === "ios" ? true : false,
        });
        if (type === 'time_on') {
            this.setState({
                time_on: date,
                "time_on_h": date.getHours(),
                "time_on_m": date.getMinutes(),
            })
        } else if (type === 'time_off') {
            this.setState({
                time_off: date,
                "time_off_h": date.getHours(),
                "time_off_m": date.getMinutes(),
            })
        }
        console.log(this.state)
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

    loadSetting() {
        var ws = new WebSocket("ws://192.168.1.1:9000");
        let getParams = { "get_setting": true }
        ws.onopen = () => {
         
            ws.send(JSON.stringify(getParams))
        };
      

    }

    componentDidMount() {
        var ws = new WebSocket("ws://192.168.1.1:9000");
        ws.onopen = () => {
            this.setState({
                visible: true,
                snackbar_message: `Соединение открыто`
            })

        };

        ws.onmessage = (e) => {
            this.setState({
                visible: true,
                snackbar_message: `[message] ${e.data}`
            })
        };

        ws.onerror = (e) => {

            this.setState({
                visible: true,
                snackbar_message: `[error] ${e.message}`
            })
        };

        ws.onclose = (e) => {
            // connection closed
            console.log(e.code, e.reason);
        };

    }

    render() {
        const { show, date, mode } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.loadSetting}
                    />
                }>

                    <View >

                        <View>
                            <Text style={styles.title}>Режим качания</Text>
                            <ListItem
                                bottomDivider
                                title="Автоматическое качание"
                                rightElement={
                                    <CheckBox
                                        checked={this.state["rock_auto"]}
                                        onPress={() =>
                                            this.setState({ "rock_auto": !this.state.rock_auto })
                                        }
                                        center
                                    />
                                }
                            />

                            <ListItem
                                bottomDivider

                                containerStyle={{ opacity: this.state["rock_auto"] ? 0.4 : 1 }}

                                title="Включить качание"
                                rightElement={
                                    <CheckBox
                                        disabled={this.state["rock_auto"]}
                                        checked={this.state["rock_state"]}
                                        onPress={() =>
                                            this.setState({ "rock_state": !this.state["rock_state"] })
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
                                bottomDivider
                                title={
                                    <Picker
                                        selectedValue={this.state["time_mode"]}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ "time_mode": itemValue })
                                        }
                                    >
                                        <Picker.Item label="Выкл" value="1" />
                                        <Picker.Item label="Одиночный режим" value="2" />
                                        <Picker.Item label="Многоразовый" value="3" />
                                    </Picker>
                                }
                            />
                            <View style={{}}>
                                <ListItem
                                    bottomDivider
                                    style={{ opacity: this.state["time_mode"] == '1' ? 0.5 : 1 }}
                                    title="Время включения"
                                    rightElement={
                                        <TouchableOpacity

                                            disabled={this.state["time_mode"] == '1' ? true : false}
                                            onPress={() => { this.timepicker(); this.setState({ time_on_type: 'time_on' }) }}
                                            style={styles.input}
                                        >
                                            <Text>
                                                {this.state.time_on.getHours() +
                                                    ":" +
                                                    this.state.time_on.getMinutes()}
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                />
                                <ListItem
                                    bottomDivider
                                    title="Время выключения"
                                    style={{ opacity: this.state["time_mode"] == '1' ? 0.5 : 1 }}
                                    rightElement={

                                        <TouchableOpacity

                                            disabled={this.state["time_mode"] == '1' ? true : false}
                                            onPress={() => { this.timepicker(); this.setState({ time_on_type: 'time_off' }) }}
                                            style={styles.input}
                                        >
                                            <Text>
                                                {this.state.time_off.getHours() +
                                                    ":" +
                                                    this.state.time_off.getMinutes()}
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                />
                                <ListItem
                                    bottomDivider
                                    style={{ opacity: this.state["time_mode"] == '1' || this.state["time_mode"] == '2' ? 0.5 : 1 }}
                                    title="Длительность, сек"
                                    rightElement={
                                        <TextInput onChangeText={text => this.setState({time_dur:text})} value={this.state.time_dur.toString()} editable={this.state["time_mode"] == '1' || this.state["time_mode"] == '2' ? false : true} style={styles.input} keyboardType="phone-pad" />
                                    }
                                />
                                <ListItem
                                    bottomDivider
                                    style={{ opacity: this.state["time_mode"] == '1' || this.state["time_mode"] == '2' ? 0.5 : 1 }}
                                    title="Пауза, сек"
                                    rightElement={
                                        <TextInput onChangeText={text => this.setState({time_pause:text})} value={this.state.time_pause.toString()} editable={this.state["time_mode"] == '1' || this.state["time_mode"] == '2' ? false : true} style={styles.input} keyboardType="phone-pad" />
                                    }
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Активация по звуку</Text>
                            <View style={[styles.card,]}>
                                <ListItem
                                    bottomDivider

                                    title="Включить активацию"
                                    rightElement={
                                        <CheckBox
                                            checked={this.state["rock_voice_en"]}
                                            onPress={() =>
                                                this.setState({
                                                    "rock_voice_en": !this.state["rock_voice_en"]
                                                })
                                            }
                                        />
                                    }
                                />
                                <View style={{ opacity: this.state["rock_voice_en"] ? 1 : 0.5 }} >
                                    <ListItem
                                        bottomDivider
                                        title="Длительность, сек"
                                        rightElement={
                                            <TextInput onChangeText={text => this.setState({rock_voice_time:text})} value={this.state.rock_voice_time} style={styles.input} keyboardType="phone-pad" />
                                        }
                                    />

                                    <ListItem
                                        bottomDivider
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
                                                    value={this.state["rock_voice_sens"]}
                                                    onValueChange={rock_voice_sens => {
                                                        rock_voice_sens = Math.round(rock_voice_sens);
                                                        this.setState({ "rock_voice_sens":rock_voice_sens });
                                                    }}
                                                />
                                            </View>
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Активация по движению</Text>

                            <ListItem
                                bottomDivider
                                title="Включить активацию"
                                rightElement={
                                    <CheckBox
                                        checked={this.state["rock_moition_en"]}
                                        onPress={() =>
                                            this.setState({
                                                "rock_moition_en": !this.state["rock_moition_en"]
                                            })
                                        }
                                    />
                                }
                            />
                            <View style={[{ opacity: this.state["rock_moition_en"] ? 1 : 0.5 }, styles.card]} >
                                <ListItem
                                    bottomDivider
                                    title="Длительность, сек"
                                    rightElement={
                                        <TextInput  onChangeText={text => this.setState({rocrock_moition_time:text})} value={this.state.rocrock_moition_time} style={styles.input} keyboardType="phone-pad" />
                                    }
                                />

                                <ListItem
                                    bottomDivider
                                    title={
                                        <View>
                                            <Text>
                                                Чувствительность движений {this.state["rock_motion_sens"]}
                                            </Text>
                                            <Slider
                                                minimumTrackTintColor={"#2089dc"}
                                                thumbTintColor={"#2089dc"}
                                                minimumValue={0}
                                                maximumValue={10}
                                                value={this.state.rock_motion_sens}
                                                onValueChange={rock_motion_sens => {
                                                    rock_motion_sens = Math.round(rock_motion_sens);
                                                    this.setState({ "rock_motion_sens":rock_motion_sens });
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
                                bottomDivider
                                title="Вкл плеера во время качания"
                                rightElement={
                                    <CheckBox
                                        checked={this.state['media_active']}
                                        onPress={() =>
                                            this.setState({
                                                "media_active": !this.state['media_active']
                                            })
                                        }
                                    />
                                }
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>Освещение</Text>
                            <ListItem
                                bottomDivider
                                title="Вкл"
                                rightElement={
                                    <CheckBox
                                        checked={this.state["led_state"]}
                                        onPress={() =>
                                            this.setState({
                                                "led_state": !this.state["led_state"]
                                            })
                                        }
                                    />
                                }
                            />
                            <View style={styles.card}>
                                <ColorPalette
                                    onChange={color => this.setState({
                                        color: color
                                    })}
                                    defaultColor={'#C0392B'}
                                    colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Время на устройстве</Text>
                            <ListItem
                                bottomDivider
                                title={
                                    <Text>
                                        {this.state["dt_dev"]}
                                    </Text>
                                }
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>Версии</Text>
                            <ListItem
                                bottomDivider
                                title={
                                    <Text>
                                        {this.state["fw_ver"]}
                                    </Text>
                                }
                            />
                        </View>
                    </View>

                </ScrollView>
                <Snackbar
                    visible={this.state.visible}
                    onDismiss={() => this.setState({ visible: false })}
                    action={{
                        label: 'Окей',
                        onPress: () => {
                            // Do something
                        },
                    }}
                >
                    {this.state.snackbar_message}
                </Snackbar>
            </View>

        );
    }
}

SettingsScreen.navigationOptions = {
    title: "Настройки"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
    card: {
        backgroundColor: '#fff'
    }
});
