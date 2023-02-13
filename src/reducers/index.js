import {combineReducers} from 'redux';
import CategoriesReducer from './CategoriesReducer';
import UsersReducer from './UsersReducer';

export const rootReducer = combineReducers({
  categories: CategoriesReducer,
  users: UsersReducer,
});
