import {BottomComponent, Button, Header1Text, Header2Text} from '@/components';
import {Layout} from '@/config/theme';
import {colors} from '@/constants';
import {DASHBOARD, GAME, LEADERBOARD} from '@/constants/routes';
import {
  setCountries,
  setFruits,
  setPokemons,
  setSelectedCategory,
} from '@/reducers/CategoriesReducer';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const DashboardScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedCategory, countries, pokemons, fruits} = useSelector(
    state => state.categories,
  );
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const {fill, column, alignItemsCenter, center, unselectedItem, selectedItem} =
    Layout();
  const categoriesArr = [
    {id: 0, category: 'Countries'},
    {id: 1, category: 'Pokemons'},
    {id: 2, category: 'Fruits'},
  ];

  useEffect(() => {
    switch (selectedCategory.category) {
      case 'Countries':
        getCountries();
        break;
      case 'Pokemons':
        getPokemons();
        break;
      case 'Fruits':
        getFruits();
        break;
    }

    if (selectedCategory.category === undefined) {
      setIsDisabled(true);
    } else if (selectedCategory.category !== '') {
      if (
        (selectedCategory.category === 'Countries' && countries.length < 0) ||
        (selectedCategory.category === 'Pokemons' && pokemons.length < 0) ||
        (selectedCategory.category === 'Fruits' && countries.fruits < 0)
      ) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    } else {
      setIsDisabled(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(setSelectedCategory([]));
  }, []);

  const getCountries = async () => {
    setLoading(true);
    try {
      if (countries.length <= 0) {
        const resp = await fetch(
          'https://battuta.medunes.net/api/country/all/?key=572e2f174155894e9f19838fc443683f',
        );
        const data = await resp.json();
        dispatch(setCountries(data));
      }
      setLoading(false);
      setIsDisabled(false);
    } catch (error) {
      setLoading(false);
      setIsDisabled(true);
      console.error('getCountries error: ', error);
    }
  };

  const getPokemons = async () => {
    setLoading(true);
    try {
      if (pokemons.length <= 0) {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await resp.json();
        dispatch(setPokemons(data.results));
      }
      setLoading(false);
      setIsDisabled(false);
    } catch (error) {
      setLoading(false);
      setIsDisabled(true);
      console.error('getPokemons error: ', error);
    }
  };

  const getFruits = async () => {
    setLoading(true);
    try {
      if (fruits.length <= 0) {
        const resp = await fetch('https://fruityvice.com/api/fruit/all');
        const data = await resp.json();
        dispatch(setFruits(data));
      }
      setLoading(false);
      setIsDisabled(false);
    } catch (error) {
      setLoading(false);
      setIsDisabled(true);
      console.error('getFruits error: ', error);
    }
  };

  return (
    <View style={[fill, alignItemsCenter, {backgroundColor: colors.white}]}>
      <Header1Text style={[{marginTop: 20}]} text={'WORDS PUZZLE'} />
      <View style={[fill, column, center]}>
        <Header2Text
          style={[{marginBottom: 30}]}
          text={'Please select a category:'}
        />
        {categoriesArr.map((item, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => dispatch(setSelectedCategory(item))}
              style={[
                styles.btnCategory,
                alignItemsCenter,
                selectedCategory.category === item.category
                  ? selectedItem
                  : unselectedItem,
              ]}>
              <Text>{item.category}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <BottomComponent>
        <Button
          disabled={isDisabled}
          style={[styles.btnStart]}
          text={'START'}
          onPress={() => navigation.navigate(GAME)}
        />
        <Button
          style={styles.btnStart}
          text={'OPEN LEADERBOARD'}
          onPress={() =>
            navigation.navigate(LEADERBOARD, {fromScreen: DASHBOARD})
          }
        />
      </BottomComponent>

      {loading && (
        <View style={[styles.loading, center]}>
          <ActivityIndicator color={colors.secondary} size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  txtTitle: {
    backgroundColor: 'purple',
    marginVertical: 30,
    padding: 20,
  },
  btnCategory: {
    marginBottom: 20,
    padding: 10,
    width: 130,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  btnStart: {
    marginBottom: 10,
    paddingHorizontal: 40,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
  },
});

export default DashboardScreen;
