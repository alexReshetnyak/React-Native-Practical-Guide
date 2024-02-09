import {configureStore} from '@reduxjs/toolkit';

import placesReducer from './reducers/places';
import badgeReducer from './reducers/badge';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';

export type RootState = {
  places: ReturnType<typeof placesReducer>;
  badge: ReturnType<typeof badgeReducer>;
  ui: ReturnType<typeof uiReducer>;
  auth: ReturnType<typeof authReducer>;
};

const store = configureStore({
  reducer: {
    places: placesReducer,
    badge: badgeReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});

export default store;
