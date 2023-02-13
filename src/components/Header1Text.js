import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Header1Text = props => {
  return <Text style={[props.style, styles.txt]}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 25,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Header1Text;
