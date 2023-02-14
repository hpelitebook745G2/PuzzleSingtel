import {
  BottomComponent,
  Button,
  EmptyList,
  Header2Text,
  PlayerRow,
} from '@/components';
import {Layout} from '@/config/theme';
import {SUCCESS} from '@/constants/routes';
import {StackActions} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Share from 'react-native-share';
import {useSelector} from 'react-redux';

const LeaderboardScreen = ({route, navigation}) => {
  const {players, currentPlayer, currentScore} = useSelector(
    state => state.users,
  );
  const {fill, selectedItem, unselectedItem} = Layout();

  const shareScore = async () => {
    const shareOptions = {
      message: `Check out my score: ${currentScore}!`,
      // social: Share.Social.FACEBOOK,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  return (
    <View style={[fill, {backgroundColor: 'white'}]}>
      <View style={[fill]}>
        <Header2Text
          text={'Leaderboard'}
          style={{textAlign: 'center', fontSize: 25, margin: 30}}
        />
        <FlatList
          data={players}
          renderItem={({item, index}) => (
            <PlayerRow
              item={item}
              index={index + 1}
              style={[
                currentPlayer === item.name ? selectedItem : unselectedItem,
              ]}
            />
          )}
          style={{marginHorizontal: 30}}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <EmptyList />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomComponent>
        <Button style={{}} text={'SHARE SCORE'} onPress={shareScore} />
        <Button
          style={styles.btnStart}
          text={'BACK TO DASHBOARD'}
          onPress={() => {
            const {fromScreen} = route.params;
            let popIdx = 1;
            if (fromScreen && fromScreen === SUCCESS) popIdx = 3;
            const popAction = StackActions.pop(popIdx);
            navigation.dispatch(popAction);
          }}
        />
      </BottomComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStart: {
    marginVertical: 30,
  },
});

export default LeaderboardScreen;
