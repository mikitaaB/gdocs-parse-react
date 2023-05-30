import { useState } from "react";
import { getResDocumentData, saveHtmlAsDoc } from "../utils/prepareFinalDoc";

export const useDocumentData = () => {
	const [resDocContent, setResDocContent] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchData = async (idDoc: string, idSheet: string) => {
		setIsLoading(true);
		const res = await getResDocumentData(idDoc, idSheet);
		const htmlBody = res.replace(/<\/?(html|head|body)>/g, "");
		setResDocContent(htmlBody);
		setIsLoading(false);
	};

	const saveDoc = () => {
		setIsLoading(true);
		saveHtmlAsDoc(resDocContent);
		setIsLoading(false);
	};

	return { resDocContent, isLoading, fetchData, saveDoc };
};
