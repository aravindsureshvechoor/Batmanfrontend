import storage from 'redux-persist/lib/storage';
import userReducer from './UserSlice';


const persistConfig={
  key:'root',
  storage
}


export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig,userReducer),
    // Other reducers if necessary
  },
  // Other configurations if needed
});

// export default store;
export const PersistStore = persistStore(store);