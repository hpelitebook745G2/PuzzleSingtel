import {
  BottomComponent,
  Button,
  EmptyList,
  Header2Text,
  PlayerRow,
} from '@/components';
import {Layout} from '@/config/theme';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {SUCCESS} from '@/constants/routes';
import {StackActions} from '@react-navigation/native';

const LeaderboardScreen = ({route, navigation}) => {
  const {players, currentPlayer} = useSelector(state => state.users);
  const {fill, selectedItem, unselectedItem} = Layout();

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
    marginTop: 50,
    marginBottom: 30,
  },
});

export default LeaderboardScreen;
