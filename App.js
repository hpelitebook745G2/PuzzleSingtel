import {AppNavigator} from '@/config/navigation';
import {store} from '@/config/ReduxStore';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
