import { configureStore} from  "@reduxjs/toolkit"
import {studentReducer} from './Slice/student_slice';
import { tutorReducer } from "./Slice/tutorSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from 'redux-persist/lib/storage';

  const persistConfigStudent = { key:"student", storage, version: 1 }; 
  const persistConfigTutor = { key:"tutor", storage, version: 1 };   

  const studentPersistedReducer=persistReducer(
    persistConfigStudent,
    studentReducer
  )    

  const tutorPersistedReducer=persistReducer(
    persistConfigTutor,
    tutorReducer
  )

export const store = configureStore({
    reducer: {
      student: studentPersistedReducer,
      tutor: tutorPersistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  
  export const  jhfawesgd=persistStore(store)