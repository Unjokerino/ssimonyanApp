import React from 'react';
import { ScrollView, StyleSheet, Text, View, Picker, Button } from 'react-native';
import { ListItem, CheckBox, Divider } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SettingsScreen extends React.Component {
    state = {
        date: new Date('2020-06-12T14:42:42'),
        mode: 'date',
        show: false,
    }
    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }


    timepicker = () => {
        this.show('time');
    }
    render() {
        const { show, date, mode } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Режим качания</Text>
                    <ListItem

                        title="Автоматическое качание"
                        rightElement={<CheckBox center />}
                    />
                    <Divider></Divider>
                    <ListItem title="Включить качание"
                        rightElement={<CheckBox disabled center />}
                    />
                    <Text style={styles.title}>Автоматическое качание по времени</Text>
                    <View>

                        <View>


                            {show && <DateTimePicker value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={this.setDate} />
                            }
                        </View>
                    </View>
                    <ListItem
                        title={
                            <Picker>
                                <Picker.Item label="Выкл" value="off" />
                                <Picker.Item label="Одиночный режим" value="solo" />
                                <Picker.Item label="Многоразовый" value="multy" />
                            </Picker>
                        }
                    />

                    <ListItem title="Время включения"
                        rightElement={<TouchableOpacity
                            onPress={this.timepicker}
                        >
                            <Text>{this.state.date.getHours() + ':' + this.state.date.getMinutes()}</Text>
                        </TouchableOpacity>}></ListItem>
                    <ListItem 
                        title="Время выключения"
                        rightElement={
                            <TouchableOpacity
                                onPress={this.timepicker}
                            >
                                <Text>{this.state.date.getHours() + ':' + this.state.date.getMinutes()}</Text>
                            </TouchableOpacity>}>
                    </ListItem>




                </View>
            </ScrollView>
        );
    }
}


SettingsScreen.navigationOptions = {
    title: 'Настройки',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: 'whitesmoke',
    },
    title: {
        padding: 10,
        opacity: 0.5,
        fontFamily: 'Roboto',
        fontSize: 16

    },
    card: {

    },
});
