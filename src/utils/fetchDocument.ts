import JSZip from "jszip";
import { DocumentType, ExportFormatType } from "../types";
import { docsUrl } from "../constants";

const getGoogleUrl = (
	docType: DocumentType,
	id: string,
	exportFormatType: ExportFormatType
) => {
	if (["document", "spreadsheets"].includes(docType)) {
		return `${docsUrl}${docType}/d/${id}/export?format=${exportFormatType}`;
	}
	throw new Error("Unknown document type");
};

export const fetchHtmlFromDocs = async (docId: string) => {
	try {
		const url = getGoogleUrl("document", docId, "html");
		const response = await fetch(url);
		const html = await response.text();
		return html as string;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const fetchZipFromSheets = async (sheetId: string) => {
	try {
		const url = getGoogleUrl("spreadsheets", sheetId, "zip");
		const response = await fetch(url);
		const zipFile = await response.blob();
		const zip = await JSZip.loadAsync(zipFile);
		return zip;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
