import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import userReducer from './UserSlice';
import adminReducer from './AdminSlice';

const persistConfig={
  key:'root',
  storage
}


export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig,userReducer),
    admin: persistReducer(persistConfig,adminReducer),
    // Other reducers if necessary
  },
  // Other configurations if needed
});

// export default store;
export const PersistStore = persistStore(store);