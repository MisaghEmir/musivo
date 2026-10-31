import { combineReducers } from "redux";
import { musicReducer } from "./music/music";
import { listReducer } from "./music/list";

const rootReducer = combineReducers({
  musicReducer: musicReducer,
  listReducer: listReducer,
});

export default rootReducer;
