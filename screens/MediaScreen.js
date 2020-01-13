import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Picker,
    TextInput
} from "react-native";
import { Snackbar, Button, Avatar } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MediaScreen extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            show: false,
        };
    }

    sendMessage = (message) =>{
        var ws = new WebSocket("ws://192.168.1.1:9999");
        ws.onopen = () => {        
            this.setState({
                visible: true,
                snackbar_message: `Соединение открыто`
            })
            ws.send(message)
      
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


    componentDidMount() {
        var ws = new WebSocket("ws://192.168.1.1:9999");
        ws.onopen = () => {        
            this.setState({
                visible: true,
                snackbar_message: `Соединение открыто`
            })
            let snd = {"media_cs_info":true}
            let playlist = {"media_pl_info":true}
            ws.send(JSON.stringify(snd))
            ws.send(JSON.stringify(playlist))
      
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

        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onPress={()=>this.sendMessage({"Media_Prev":true})} style={styles.button} mode="contained" icon="skip-previous" />
                    <Button onPress={()=>this.sendMessage({"Media_Stop":true})} style={styles.button} mode="contained" icon="stop" />
                    <Button onPress={()=>this.sendMessage({"Media_Play":true})} style={styles.button} mode="contained" icon="pause" />
                    <Button onPress={()=>this.sendMessage({"Media_Pause":true})} style={styles.button} mode="contained" icon="play" />
                    <Button onPress={()=>this.sendMessage({"Media_Next":true})} style={styles.button} mode="contained" icon="skip-next" />
                </View>
                <View style={styles.buttonContainer}>
                   
                    <Button onPress={()=>this.sendMessage({"Media_Vol":40})} mode="contained" icon="volume-plus" />
                
                    <Button onPress={()=>this.sendMessage({"Media_Vol":40})} style={styles.button} mode="contained" icon="volume-minus" />
                    <Button onPress={()=>this.sendMessage({"Media_Mute":true})} style={styles.button} mode="contained" icon="volume-mute" />
                    <Button onPress={()=>this.sendMessage({"M_shuffle":true})} style={styles.button} mode="contained" icon="shuffle" />
                    <Button onPress={()=>this.sendMessage({"M_repeat":true})} style={styles.button} mode="contained" icon="repeat" />
                </View>
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
        )
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    button: {
        margin: 3
    },

})