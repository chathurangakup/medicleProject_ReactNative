import { configureStore,  createSerializableStateInvariantMiddleware,
  isPlain,} from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';




import commonReducer from './slices/CommonSlices';
import loginReducer from './screens/onboarding/Login/LoginSlice';
import chatbotSlice from './screens/home/chatBot/ChatBotSlice';
import exerciseFeedbackSlice from './screens/home/exerciseFeedback/ExerciseFeedbackSlice';




const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({ 
    common: commonReducer,
    login: loginReducer,
    chatbot: chatbotSlice,
    feedback:exerciseFeedbackSlice
})

// const store = configureStore({
//   reducer: rootReducer
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//   reducer: {
//     common: commonReducer,
//     login: loginReducer,
//     chatbot: chatbotSlice,
//   },
// })



export default function configureStoreRedux() {
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
   
  })
  const persistor = persistStore(store);
  return {store, persistor};
 }
