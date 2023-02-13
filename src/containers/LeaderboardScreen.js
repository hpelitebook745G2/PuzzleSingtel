import {
  BottomComponent,
  Button,
  EmptyList,
  Header2Text,
  PlayerRow,
} from '@/components';
import {Layout} from '@/config/theme';
import {DASHBOARD} from '@/constants/routes';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

const LeaderboardScreen = ({navigation}) => {
  const {players} = useSelector(state => state.users);
  const {fill} = Layout();

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
            <PlayerRow item={item} index={index + 1} />
          )}
          style={{marginHorizontal: 30}}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <EmptyList />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomComponent>
        <Button
          style={styles.btnStart}
          text={'BACK TO DASHBOARD'}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: DASHBOARD}],
              }),
            );
          }}
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
});

export default LeaderboardScreen;
