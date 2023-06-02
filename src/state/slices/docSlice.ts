import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	fetchHtmlFromDocs,
	fetchZipFromSheets,
} from "../../utils/fetchDocument";
import { DocSliceInitialStateType } from "../../types";

export const fetchDocsData = createAsyncThunk(
	"doc/fetchDocs",
	async (docId: string, thunkAPI) => {
		try {
			const data = await fetchHtmlFromDocs(docId);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue({
				message: "Error fetching data from Google Docs",
				error,
			});
		}
	}
);

export const fetchSheetsData = createAsyncThunk(
	"doc/fetchSheets",
	async (sheetId: string, thunkAPI) => {
		try {
			const data = await fetchZipFromSheets(sheetId);
			const zipString = await data.generateAsync({ type: "string" });
			return zipString;
		} catch (error) {
			return thunkAPI.rejectWithValue({
				message: "Error fetching data from Google Sheets",
				error,
			});
		}
	}
);

const docInitialState: DocSliceInitialStateType = {
	documentData: null,
	sheetData: null,
	resultDocData: null,
	isLoading: false,
	error: null,
};

const docSlice = createSlice({
	name: "doc",
	initialState: docInitialState,
	reducers: {
		setResultDocData: (state, action) => ({
			...state,
			resultDocData: action.payload,
		}),
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDocsData.pending, (state) => ({
				...state,
				isLoading: true,
			}))
			.addCase(fetchDocsData.fulfilled, (state, action) => ({
				...state,
				isLoading: false,
				documentData: action.payload,
			}))
			.addCase(fetchDocsData.rejected, (state, action) => ({
				...state,
				isLoading: false,
				error: action.payload as string,
			}))
			.addCase(fetchSheetsData.pending, (state) => ({
				...state,
				isLoading: true,
			}))
			.addCase(fetchSheetsData.fulfilled, (state, action) => ({
				...state,
				isLoading: false,
				sheetData: action.payload,
			}))
			.addCase(fetchSheetsData.rejected, (state, action) => ({
				...state,
				isLoading: false,
				error: action.payload as string,
			}));
	},
});

export const { setResultDocData } = docSlice.actions;

export default docSlice.reducer;
