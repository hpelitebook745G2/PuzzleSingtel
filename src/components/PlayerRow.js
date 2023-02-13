import {Layout} from '@/config/theme';
import {colors} from '@/constants';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const PlayerRow = props => {
  const {item, index, isRank = true, style, onPlayerSelect} = props;
  const [avatars] = useState([
    'https://api.lorem.space/image/face?w=150&h=150&hash=8B7BCDC2',
    'https://api.lorem.space/image/face?w=150&h=150&hash=500B67FB',
    'https://api.lorem.space/image/face?w=150&h=150&hash=A89D0DE6',
    'https://api.lorem.space/image/face?w=150&h=150&hash=225E6693',
    'https://api.lorem.space/image/face?w=150&h=150&hash=9D9539E7',
    'https://api.lorem.space/image/face?w=150&h=150&hash=BDC01094',
    'https://api.lorem.space/image/face?w=150&h=150&hash=7F5AE56A',
    'https://api.lorem.space/image/face?w=150&h=150&hash=4F32C4CF',
    'https://api.lorem.space/image/face?w=150&h=150&hash=B0E33EF4',
    'https://api.lorem.space/image/face?w=150&h=150&hash=2D297A22',
  ]);
  const {rowHCenter} = Layout();

  /* Picks a random answer word from the API response array  */
  const arrayRandomizer = items =>
    items[Math.floor(Math.random() * items.length)];

  const getOrdinal = n => {
    let ord = 'th';

    if (n % 10 == 1 && n % 100 != 11) {
      ord = 'st';
    } else if (n % 10 == 2 && n % 100 != 12) {
      ord = 'nd';
    } else if (n % 10 == 3 && n % 100 != 13) {
      ord = 'rd';
    }

    return index + ord;
  };

  return isRank ? (
    <View style={[styles.container, {justifyContent: 'space-between'}, style]}>
      <View style={[rowHCenter]}>
        <Text style={{marginRight: 10}}>{getOrdinal(index)}</Text>
        <Image source={{uri: arrayRandomizer(avatars)}} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  ) : (
    <TouchableOpacity
      style={[styles.container, {justifyContent: 'center'}, style]}
      onPress={() => onPlayerSelect(item)}>
      <View style={[rowHCenter]}>
        <Image source={{uri: arrayRandomizer(avatars)}} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    marginVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.lightGray,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20,
  },
  score: {
    marginRight: 10,
  },
});

export default PlayerRow;
