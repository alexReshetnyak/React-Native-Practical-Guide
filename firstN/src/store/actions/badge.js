import { 
  INCREASE_BADGE_NUMBER, 
  DECREASE_BADGE_NUMBER, 
  SET_COMPONENT_ID , 
  SET_BADGE_NUMBER
} from './actionTypes';

export const setComponentId = id => ({
  type: SET_COMPONENT_ID,
  componentId: id
});

export const increaseBadgeNumber = () => ({
  type: INCREASE_BADGE_NUMBER
});

export const decreaseBadgeNumber = () => ({
  type: DECREASE_BADGE_NUMBER
});

export const setBadgeNumber = number => ({
  type: SET_BADGE_NUMBER,
  number
});
