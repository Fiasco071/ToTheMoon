import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import walletReducer from "./wallet";
import stockReducer from "./stock";
import transactionReducer from "./transaction";
import assetReducer from "./asset";
import simReducer from "./simulation_data";


const rootReducer = combineReducers({
  session,
  wallet: walletReducer,
  stocks: stockReducer,
  transactions: transactionReducer,
  assets: assetReducer,
  simData: simReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
