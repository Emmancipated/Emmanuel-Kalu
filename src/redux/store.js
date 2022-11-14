import storage from "redux-persist/lib/storage";
import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
 } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {ProductReducer, CurrencyReducer, CategoryTracker} from "./reducers";

//Configure persist
const persistConfig = {
    key: 'products',
    storage: storage,
};

//Reducer combination
const reducers = combineReducers({
    products: ProductReducer, 
    currency: CurrencyReducer,
    currentCategory: CategoryTracker,
});

//Creating persisting Reducer
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export default store;