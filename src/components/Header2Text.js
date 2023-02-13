import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Header2Text = props => {
  return <Text style={[styles.txt, props.style]}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header2Text;
