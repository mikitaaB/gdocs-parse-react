import { combineReducers } from "redux";
import docSlice from "./docSlice";
import formSlice from "./formSlice";

export const rootReducer = combineReducers({
	doc: docSlice,
	form: formSlice,
});
