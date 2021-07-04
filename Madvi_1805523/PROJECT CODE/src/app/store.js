import appReducer from '../features/appSlice';

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    app: appReducer,
  },
});