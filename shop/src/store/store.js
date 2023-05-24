import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./userSlice";
import cart from "./cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import testSlice from "./testSlice";

const reducers = combineReducers({
  user: user.reducer,
  cart: cart.reducer,
  test: testSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  // whitelist : ['user']  // 유지하고 싶은 값을 배열로 전달
  // blacklist : ['user']  // 유지하고 싶지 않은 값을 배열로 전달
}

//persistReducer(config, reducer) -> reducer를 반환, config + reducer -> enhanced reducer 반환
const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer
});

export default store;
