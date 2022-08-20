import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import navigation from 'nintendoapp/js/redux/navigationMiddleware';
import nintendoApp from 'nintendoapp/js/reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, nintendoApp);
export const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunk,
    logger,
    navigation,
  ),
);

export const persistor = persistStore(store);
