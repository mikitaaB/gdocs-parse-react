import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
	name: "form",
	initialState: {
		docId: "",
		sheetId: "",
	},
	reducers: {
		setDocId: (state, action) => ({
			...state,
			docId: action.payload,
		}),
		setSheetId: (state, action) => ({
			...state,
			sheetId: action.payload,
		}),
	},
});

export const { setDocId, setSheetId } = formSlice.actions;

export default formSlice.reducer;
