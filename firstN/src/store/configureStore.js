
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placesReducer from './reducers/places';
import badgeReducer from './reducers/badge';

const rootReducer = combineReducers({
  places: placesReducer,
  badge:  badgeReducer
});

let composeEnhancers = compose;

// * __DEV__ special react native variable, it true if there is development mode
if (__DEV__) {
  // * to enable redux devtools
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
