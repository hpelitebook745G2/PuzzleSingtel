import {BottomComponent, Button, Header2Text} from '@/components';
import {Layout} from '@/config/theme';
import {colors, images} from '@/constants';
import {LEADERBOARD, SUCCESS} from '@/constants/routes';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const SuccessScreen = ({navigation}) => {
  const {fill, center} = Layout();

  return (
    <View style={[fill, {backgroundColor: colors.white}]}>
      <View style={[fill, center]}>
        <Image
          style={{
            height: 80,
            width: 80,
          }}
          source={images.CHECK}
          resizeMode={'contain'}
        />
        <Header2Text
          text={
            'Congratulations, that is CORRECT!\n\nYou just earned 10 points!'
          }
          style={styles.txtCongrats}
        />
      </View>
      <BottomComponent>
        <Button
          style={styles.btnStart}
          text={'OPEN LEADERBOARD'}
          onPress={() =>
            navigation.navigate(LEADERBOARD, {fromScreen: SUCCESS})
          }
        />
      </BottomComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStart: {
    marginTop: 50,
    marginBottom: 30,
  },
  txtCongrats: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SuccessScreen;
