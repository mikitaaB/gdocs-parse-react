import JSZip from "jszip";
import { DocumentType, ExportFormatType } from "../types";
import { docsUrl } from "../constants";

export const getGoogleUrl = (
	docType: DocumentType,
	id: string,
	exportFormatType: ExportFormatType
) => {
	if (["document", "spreadsheets"].includes(docType)) {
		return `${docsUrl}${docType}/d/${id}/export?format=${exportFormatType}`;
	}
	throw new Error("Unknown document type");
};

export const fetchHtmlFromDocs = async (url: string) => {
	fetch(url)
		.then((response: Response) => response.text())
		.then((html: string) => html)
		.catch((error: Error) => {
			console.error(error);
			throw error;
		});
	try {
		const response = await fetch(url);
		const html = await response.text();
		return html as string;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const fetchZipFromSheets = async (url: string) => {
	try {
		const response = await fetch(url);
		const zipFile = await response.blob();
		const zip = await JSZip.loadAsync(zipFile);
		return zip;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const saveFileAs = (blob: Blob, fileName: string) => {
	const a = window.document.createElement("a");
	a.href = window.URL.createObjectURL(blob);
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(a.href);
};
