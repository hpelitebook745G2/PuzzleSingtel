import {BottomComponent, Button, Header2Text} from '@/components';
import {Layout} from '@/config/theme';
import {colors} from '@/constants';
import {SUCCESS} from '@/constants/routes';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const GameScreen = ({navigation}) => {
  const categories = useSelector(state => state.categories);
  const isFocused = useIsFocused();
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [answer, setAnswer] = useState({});
  const [shuffledAnswer, setShuffledAnswer] = useState([]);
  const [guess, setGuess] = useState([]);
  const [answerDisabledArr, setAnswerDisabledArr] = useState([]);
  const [guessDisabledArr, setGuessDisabledArr] = useState([]);
  const [mapArr, setMapArr] = useState([]);
  const {selectedCategory, countries, pokemons, fruits} = categories;
  const {
    fill,
    row,
    center,
    colVCenter,
    justifyContentCenter,
    buttonText,
    selectedItem,
    unselectedItem,
  } = Layout();

  useEffect(() => {
    if (!isFocused) {
      // Reset answers
      resetData();
      return;
    }

    beginOperation();
  }, [isFocused]);

  useEffect(() => {
    if (JSON.stringify(answer) === '{}') return;
    const joinedGuess = guess.join('');

    // Answer is CORRECT!
    if (joinedGuess !== '' && joinedGuess === answer.name) {
      setIsWrongAnswer(false);
      navigation.navigate(SUCCESS);
    } else if (
      // Finished guessing but answer is WRONG!
      joinedGuess.length === answer.name.length &&
      joinedGuess !== answer.name
    ) {
      setIsWrongAnswer(true);
    } else {
      setIsWrongAnswer(false);
    }
  }, [guess]);

  /* Clears the data */
  const resetData = () => {
    setAnswer({});
    setShuffledAnswer([]);
    setGuess([]);
  };

  /* Picks a random answer word from the API response array  */
  const arrayRandomizer = items => {
    let randomWord = '';

    do {
      randomWord = items[Math.floor(Math.random() * items.length)];
    } while (randomWord.name.includes(' '));

    randomWord = {
      ...randomWord,
      name: randomWord.name.toUpperCase(),
    };

    return randomWord;
  };

  /* Shuffles the letters of the answer word */
  const shuffleLetters = array => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  /* Start of the logic */
  const beginOperation = () => {
    if (!selectedCategory.category) return;

    let randomWord = {};
    switch (selectedCategory.category) {
      case 'Countries':
        randomWord = arrayRandomizer(countries);
        break;
      case 'Pokemons':
        randomWord = arrayRandomizer(pokemons);
        break;
      case 'Fruits':
        randomWord = arrayRandomizer(fruits);
        break;
    }
    setAnswer(randomWord); // Initializes the picked random word from the selected category array

    if (JSON.stringify(randomWord) === '{}') return;
    initializeData(randomWord);
  };

  const initializeData = randomWord => {
    const shuffledAnswer = shuffleLetters(randomWord.name.split(''));
    const createArray = item => Array(shuffledAnswer.length).fill(item); // Creates array with the same length to that of shuffledAnswer
    setShuffledAnswer(shuffledAnswer); // Initializes array of shuffled letters of the shuffledAnswer
    setGuess(createArray('')); // Initializes array of blank strings
    setAnswerDisabledArr(createArray({isDisabled: false})); // Initializes array of disable flags
    setGuessDisabledArr(createArray({isDisabled: true})); // Initializes array of disable flags
    setMapArr(createArray({guessIndex: -1, answerIndex: -1})); // Initializes array of mapped guess and answer
  };

  const pushLetter = (letter, idx) => {
    // Insert letter to the guessing boxes
    let emptyIdx = 0;
    emptyIdx = guess.indexOf('');
    updateGuessBox(letter, emptyIdx);

    // Determines which guessed letter to enable
    let selectedGuessLetter = guessDisabledArr[emptyIdx];
    toggleEnableGuessBox(selectedGuessLetter, emptyIdx);

    // Determines which shuffledAnswer letter to disable
    let selectedShuffledAnswerLetter = answerDisabledArr[idx];
    toggleEnableAnswerBox(selectedShuffledAnswerLetter, idx);

    // Determines the indices of guess and answer arrays
    updateShuffledAnswerBox(idx, emptyIdx, idx);
  };

  const pullLetter = (letter, idx) => {
    // Pull a letter from the guessing box and update
    updateGuessBox('', idx);

    // Determines which guessed letter to disable
    const copyGuess = [...guessDisabledArr];
    toggleEnableGuessBox(copyGuess[idx], idx);

    // Determines the indices of guess and answer arrays
    const mapIndex = mapArr.findIndex(x => x.guessIndex === idx);
    const answerIndex = mapArr[mapIndex].answerIndex;
    updateShuffledAnswerBox(mapIndex, -1, -1);

    // Determines which shuffledAnswer letter to enable
    toggleEnableAnswerBox(answerDisabledArr[answerIndex], answerIndex);
  };

  /* Update guessing box by pushing/pulling a specified character */
  const updateGuessBox = (char, idx) => {
    let copyGuess = [...guess];
    copyGuess.splice(idx, 1, char);
    setGuess(copyGuess);
  };

  /* Update shuffledAnswer box by pushing/pulling a specified character */
  const updateShuffledAnswerBox = (idx, guessIdx, answerIdx) => {
    let copyMapArr = [...mapArr];
    copyMapArr[idx] = {guessIndex: guessIdx, answerIndex: answerIdx};
    setMapArr(copyMapArr); // Sets mapping of guess and answer arrays
  };

  /* Determines which guessed letter to enable/disable */
  const toggleEnableGuessBox = (char, idx) => {
    const copyGuessDisabledArr = [...guessDisabledArr];
    copyGuessDisabledArr[idx] = {isDisabled: !char.isDisabled};
    setGuessDisabledArr(copyGuessDisabledArr); // Sets which index to disable after pressed
  };

  /* Determines which shuffledAnswer letter to enable/disable */
  const toggleEnableAnswerBox = (char, idx) => {
    const copyShuffledAnswer = [...answerDisabledArr];
    copyShuffledAnswer[idx] = {
      isDisabled: !char.isDisabled,
    };
    setAnswerDisabledArr(copyShuffledAnswer); // Sets which index to disable after pressed
  };

  return (
    <View style={[colVCenter, fill, {backgroundColor: colors.white}]}>
      {/* Header */}
      <Header2Text
        style={[buttonText, {marginTop: 30}]}
        text={`Category: ${selectedCategory.category}`}
      />
      {/* Guessed letters section */}
      <View style={[row, justifyContentCenter, styles.guessContainer]}>
        {guess.map((item, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              disabled={guessDisabledArr[idx].isDisabled}
              onPress={() => pullLetter(item, idx)}
              style={[
                center,
                styles.box,
                guessDisabledArr[idx].isDisabled
                  ? selectedItem
                  : unselectedItem,
              ]}>
              <Text style={{fontWeight: 'bold'}}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Error message text */}
      {isWrongAnswer && (
        <TouchableOpacity
          style={{
            color: colors.primary,
            padding: 10,
            borderColor: colors.primary,
            borderWidth: 1,
            borderRadius: 20,
          }}
          onPress={() => {
            resetData();
            beginOperation();
          }}>
          <Text
            style={{
              color: colors.primary,
            }}>
            Try again!
          </Text>
        </TouchableOpacity>
      )}

      <BottomComponent style={[fill]}>
        {/* Shuffled answer letters section */}
        <View style={[row, justifyContentCenter, styles.answerContainer]}>
          {shuffledAnswer.map((item, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                disabled={answerDisabledArr[idx].isDisabled}
                onPress={() => pushLetter(item, idx)}
                style={[
                  center,
                  styles.box,
                  answerDisabledArr[idx].isDisabled
                    ? selectedItem
                    : unselectedItem,
                ]}>
                <Text style={{fontWeight: 'bold'}}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {/* Button SKIP */}
        <Button
          // disabled={isDisabled}
          style={styles.btnNext}
          text={'SKIP'}
          onPress={() => {
            resetData();
            beginOperation();
          }}
        />
      </BottomComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 18,
  },
  guessContainer: {
    margin: 20,
    flexWrap: 'wrap',
  },
  answerContainer: {
    margin: 20,
    flexWrap: 'wrap',
  },
  btnNext: {
    margin: 20,
    width: 200,
  },
  enabledLetter: {
    backgroundColor: colors.white,
  },
  disabledLetter: {
    backgroundColor: colors.disabledGrayTransparent,
    borderColor: colors.disabledGray,
  },
});

export default GameScreen;
