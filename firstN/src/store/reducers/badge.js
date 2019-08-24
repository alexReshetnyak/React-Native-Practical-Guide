import { 
  SET_COMPONENT_ID, 
  INCREASE_BADGE_NUMBER, 
  DECREASE_BADGE_NUMBER 
} from '../actions/actionTypes';
import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';

const initialState = {
  badgeNumber: 0,
  componentId: null
};

const isIos = Platform.OS === 'ios';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPONENT_ID:
      return {
        ...state,
        componentId: action.componentId
      };
  
    case DECREASE_BADGE_NUMBER:
      const currentBadgeNumber = state.badgeNumber - 1;
      Navigation.mergeOptions(state.componentId, {
        bottomTab: {
          badge: currentBadgeNumber ? currentBadgeNumber : isIos ? null : '',
        },
      });

      return {
        ...state,
        badgeNumber: currentBadgeNumber
      };

      case INCREASE_BADGE_NUMBER:
        Navigation.mergeOptions(state.componentId, {
          bottomTab: {
            badge: state.badgeNumber,
            badgeColor: 'red',
          },
        });
  
        return {
          ...state,
          badgeNumber: state.badgeNumber + 1
        };

    default:
      return state;
  }
};

export default reducer;
