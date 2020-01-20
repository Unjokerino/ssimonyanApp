import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import { useNavigation, useNavigationParam } from "react-navigation-hooks";

export function MenuCard(props) {
  const { navigate } = useNavigation();
  const color = props.color;
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.navigate != undefined) {
          navigate(props.navigate);
        }
      }}
      style={[styles.card, { borderColor: color }]}
    >
      <View style={styles.cardTextContainer}>
        <Icon
          style={styles.icon}
          name={props.icon_name}
          type="ionicon"
          color="black"
          size={52}
        />
        <Text style={styles.title}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    marginBottom: 24,
    borderWidth: 2,
    width: "90%",
    minHeight: 100,
    padding: 5,
    borderColor: "whitesmoke",

    backgroundColor: "#fff"
  },
  cardIconContainer: {
    width: 30,
    height: 30
  },
  divider: {
    height: 1,
    width: "100%",

    backgroundColor: "whitesmoke"
  },
  cardTextContainer: {
    marginLeft: 15,
    flex: 1,
    flexDirection: "column",
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "Arial_Unicode"
  },
  icon: {}
});
