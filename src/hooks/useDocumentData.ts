import { useState, useEffect } from "react";
import { getResDocumentData, saveHtmlAsDoc } from "../utils/prepareFinalDoc";

export const useDocumentData = (docId: string, sheetId: string) => {
	const [resDocContent, setResDocContent] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchData = async (idDoc: string, idSheet: string) => {
		setIsLoading(true);
		const res = await getResDocumentData(idDoc, idSheet);
		setResDocContent(res);
		setIsLoading(false);
	};

	const saveDoc = () => {
		setIsLoading(true);
		saveHtmlAsDoc(resDocContent);
		setIsLoading(false);
	};

	useEffect(() => {
		if (docId.length > 0 && sheetId.length > 0) {
			fetchData(docId, sheetId);
		}
	}, [docId, sheetId]);

	return { resDocContent, isLoading, saveDoc };
};
