import { compose, createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import { persistReducer, persistStore } from 'redux-persist';
import { logger } from 'redux-logger/src';

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }
//
//   console.log('type: ', action.type);
//   console.log('payload: ', action.payload);
//   console.log('currentState: ', store.getState());
//
//   next(action);
//
//   console.log('next state: ', store.getState());
// };

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);