import {combineReducers} from 'redux';
import {rootReducer, languageReducer} from './reducer';

export default combineReducers({
  Movie: rootReducer,
});
