import {Layout} from '@/config/theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const BottomComponent = props => {
  const {alignItemsCenter} = Layout();

  return (
    <View style={[alignItemsCenter, styles.container, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default BottomComponent;
