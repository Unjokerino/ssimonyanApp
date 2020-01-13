import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

export function MenuCard(props) {
  const { navigate } = useNavigation();
  return (

    <TouchableOpacity
      onPress={() => {
        if (props.navigate != undefined) {
          navigate(props.navigate);
        }
      }}
      style={styles.card}>
      <View style={styles.cardIconContainer}>
        <Icon
          name={props.icon_name}
          type='ionicon'
          color='#517fa4'
          size={32}
        />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.title}>{props.text}</Text>
        <View style={styles.divider}></View>
      </View>

    </TouchableOpacity>


  );
}

const styles = StyleSheet.create({
  card: {
    margin:5,
    width:'45%',
    minHeight: 150,
    padding: 5,
    borderColor: 'whitesmoke',
    borderWidth: 1,
    backgroundColor: '#f2f2f2',
    elevation:10,

  },
  cardIconContainer: {
    width: 30,

  },
  divider: {
    height: 1,
    width: '100%',

    backgroundColor: 'whitesmoke'
  },
  cardTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
});
