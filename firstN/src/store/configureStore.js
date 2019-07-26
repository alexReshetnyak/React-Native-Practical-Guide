
import { createStore, combineReducers, compose } from 'redux';
import placesReducer from './reducers/places';

const rootReducer = combineReducers({
  places: placesReducer
});

let composeEnhancers = compose;

// * __DEV__ special react native variable, it true if there is development mode
if (__DEV__) {
  // * to enable redux devtools
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => createStore(rootReducer, composeEnhancers());

export default configureStore;
