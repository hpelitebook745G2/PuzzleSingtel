import {Layout} from '@/config/theme';
import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = props => {
  const {strongUpperText} = Layout();

  const buttonStyle = () => {
    let style = styles.button;

    if (props.disabled) {
      style = {
        ...style,
        backgroundColor: colors.inActiveBtn,
        borderColor: colors.border,
      };
    }
    if (props.completed && !props.disabled) {
      style = {
        ...style,
        backgroundColor: colors.primary,
        borderColor: colors.border,
      };
    }

    return style;
  };

  const textStyle = () => {
    let style = {...strongUpperText, ...styles.buttonText, ...props.textStyle};

    if (props.disabled) {
      style = {...style, ...props.textStyle, color: colors.white};
    }

    return style;
  };

  return (
    <View style={props.style}>
      <TouchableOpacity
        style={buttonStyle()}
        onPress={props.onPress}
        disabled={props.disabled}>
        <Text style={textStyle()}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    padding: 10,
  },
});

export default Button;
