import {colors, images} from '@/constants';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.cloud}
        source={images.EMPTY_LEADERBOARD}
        resizeMode={'contain'}
      />
      <Text style={styles.txtEmpty}>
        Looks like you are the first player who played this game. Hurry and be
        the leader amongst your friends!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloud: {
    height: 40,
  },
  txtEmpty: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: colors.subHeaderText,
  },
});

export default EmptyList;
