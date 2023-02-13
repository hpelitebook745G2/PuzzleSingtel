import {BottomComponent, Button, Header2Text, PlayerRow} from '@/components';
import EmptyList from '@/components/EmptyList';
import {Layout} from '@/config/theme';
import {colors} from '@/constants';
import {DASHBOARD} from '@/constants/routes';
import {setCurrentPlayer, setPlayers} from '@/reducers/UsersReducer';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const InputPlayerScreen = ({navigation}) => {
  const {players, currentPlayer} = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [enableInput, setEnableInput] = useState(false);
  const [doesUserExist, setDoesUserExist] = useState(false);
  const {fill, unselectedItem, selectedItem} = Layout();

  const onPlayerSelect = item => {
    dispatch(setCurrentPlayer(item.name));
  };

  const enterNewPlayer = () => {
    if (enableInput) return;

    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text>
          Not in the list? Create one{' '}
          <Text
            style={{color: 'blue', textDecorationLine: 'underline'}}
            onPress={() => {
              setEnableInput(!enableInput);
              dispatch(setCurrentPlayer('')); // Reset player list selection
            }}>
            here
          </Text>
          .
        </Text>
      </View>
    );
  };

  const updateFlags = flag => {
    setEnableInput(flag);
    setDoesUserExist(flag);
  };

  const txtError = (
    <Text style={{color: colors.primary, textAlign: 'center', marginTop: 20}}>
      Player already exists!{'\n'}Please{' '}
      <Text
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
        }}
        onPress={() => updateFlags(false)}>
        go back
      </Text>{' '}
      to the list and select your player.
    </Text>
  );

  return (
    <View style={[fill, {backgroundColor: 'white'}]}>
      <View style={[fill]}>
        <Header2Text
          text={'Player Initialization'}
          style={{textAlign: 'center', fontSize: 25, margin: 30}}
        />
        {enableInput ? (
          <>
            <TextInput
              style={{marginHorizontal: 30, fontSize: 18}}
              placeholder={'Enter player name'}
              onChangeText={e => dispatch(setCurrentPlayer(e))}
            />
            {doesUserExist && txtError}
          </>
        ) : (
          <>
            <FlatList
              data={players}
              renderItem={({item, index}) => (
                <PlayerRow
                  item={item}
                  index={index + 1}
                  isRank={false}
                  onPlayerSelect={onPlayerSelect}
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
            {enterNewPlayer()}
          </>
        )}
      </View>
      <BottomComponent>
        <Button
          disabled={currentPlayer === '' || doesUserExist}
          style={[styles.btnStart]}
          text={"LET'S BEGIN!"}
          onPress={() => {
            // Navigate to DASHBOARD if mode is select player and name is not blank
            if (!enableInput && currentPlayer.length > 0) {
              navigation.navigate(DASHBOARD);
            } else {
              // Update players array with
              const playersCopy = [...players];
              const playerExistsIndex = playersCopy.findIndex(
                x =>
                  x.name.trim().toLowerCase() ===
                  currentPlayer.trim().toLowerCase(),
              );

              if (playerExistsIndex < 0) {
                playersCopy.push({name: currentPlayer, score: 0});
                dispatch(setPlayers(playersCopy));

                navigation.navigate(DASHBOARD);

                updateFlags(false);
              } else {
                updateFlags(true);
              }
            }
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
    width: 230,
  },
});

export default InputPlayerScreen;
