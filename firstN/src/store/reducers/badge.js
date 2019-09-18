import { 
  SET_COMPONENT_ID, 
  INCREASE_BADGE_NUMBER, 
  DECREASE_BADGE_NUMBER, 
  SET_BADGE_NUMBER
} from '../actions/actionTypes';
import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';

const initialState = {
  badgeNumber: 0,
  componentId: null
};
const isIos = Platform.OS === 'ios';
const setBadgeNumber = (state, number) => {
  Navigation.mergeOptions(state.componentId, {
    bottomTab: {
      badge: number ? number : isIos ? null : '',
      badgeColor: 'red'
    },
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPONENT_ID:
      return {
        ...state,
        componentId: action.componentId
      };
  
    case DECREASE_BADGE_NUMBER:
      const currentBadgeNumber = state.badgeNumber - 1;
      setBadgeNumber(state, currentBadgeNumber);
      return {
        ...state,
        badgeNumber: currentBadgeNumber
      };

      case INCREASE_BADGE_NUMBER:
        const increasedBadgeNumber = state.badgeNumber + 1;
        setBadgeNumber(state, increasedBadgeNumber);
        return {
          ...state,
          badgeNumber: increasedBadgeNumber
        };
      
      case SET_BADGE_NUMBER:
        setBadgeNumber(state, action.number)
        return {
          ...state,
          badgeNumber: action.number
        };

    default:
      return state;
  }
};

export default reducer;
