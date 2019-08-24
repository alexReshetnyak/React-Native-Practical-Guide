import { INCREASE_BADGE_NUMBER, DECREASE_BADGE_NUMBER, SET_COMPONENT_ID } from './actionTypes';

export const setComponentId = id => {
  return {
    type: SET_COMPONENT_ID,
    componentId: id
  };
};

export const increaseBadgeNumber = () => {
  return {
    type: INCREASE_BADGE_NUMBER
  };
};

export const decreaseBadgeNumber = () => {
  return {
    type: DECREASE_BADGE_NUMBER
  };
};
