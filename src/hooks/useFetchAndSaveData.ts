import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "../state/store";
import { getResDocumentData } from "../utils/prepareFinalDoc";
import {
	fetchDocsData,
	fetchSheetsData,
	setResultDocData,
} from "../state/slices/docSlice";

export const useFetchAndSaveData = () => {
	const dispatch = useDispatch<AppDispatch>();

	const fetchData = useCallback(
		async (docId: string, sheetId: string) => {
			const docData = await dispatch(fetchDocsData(docId));
			const sheetData = await dispatch(fetchSheetsData(sheetId));
			return docData && sheetData
				? (async () => {
						const res = await getResDocumentData(
							unwrapResult(docData),
							unwrapResult(sheetData)
						);
						const htmlBody = res.replace(
							/<\/?(html|head|body)>/g,
							""
						);
						dispatch(setResultDocData(htmlBody));
						return htmlBody;
				  })()
				: null;
		},
		[dispatch]
	);

	return fetchData;
};
