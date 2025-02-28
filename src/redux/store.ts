import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import lockerReducer from "./lockerSlice";

import deliveryReducer from "./deliverySlice";
import deliveryMethodReducer from "./deliveryMethodSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Create a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  locker: lockerReducer,
  delivery: deliveryReducer,
  deliverMethod: deliveryMethodReducer,
});

// Configure persist settings
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // Persist cart data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid redux-persist warnings
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a persistor which is used to persist the store
export const persistor = persistStore(store);

export default store;
