import {
	fetchHtmlFromDocs,
	fetchZipFromSheets,
	getGoogleUrl,
} from "./fetchDocument";
import { ICoordVariable, SheetContentItem, VariableGroups } from "../types";

const getVariables = (docContent: string) => {
	const sheetsRegex = /{([^a-zA-Z0-9]+)((-\d+){2}|(-\d+){4})}/g;
	return docContent.match(sheetsRegex) ?? [];
};

const getUniqueLists = (rawVariables: [] | RegExpMatchArray): Set<string> => {
	const uniqueLists: Set<string> = new Set();
	const uniqueRegex = /{([^-]+)-/;

	rawVariables.forEach((str: string) => {
		const match = str.match(uniqueRegex);
		if (match) {
			const name = match[1];
			uniqueLists.add(name);
		}
	});
	return uniqueLists;
};

const parseStringToHtml = (docContent: string) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(docContent, "text/html");
	return doc;
};

const extractDocumentData = async (
	docId: string
): Promise<{
	parsedDocContent: Document;
	rawVariables: [] | RegExpMatchArray;
	uniqueLists: Set<string>;
}> => {
	try {
		const url = getGoogleUrl("document", docId, "html");
		const docContent = await fetchHtmlFromDocs(url);
		const parsedDocContent = parseStringToHtml(docContent);
		const rawVariables = getVariables(
			parsedDocContent.body.textContent as string
		);
		const uniqueLists = getUniqueLists(rawVariables);
		return { parsedDocContent, rawVariables, uniqueLists };
	} catch (error) {
		throw new Error(`An error occurs while parsing doc ${docId}`);
	}
};

const extractSheetData = async (
	sheetId: string,
	lists: Set<string>
): Promise<Record<string, string>> => {
	try {
		const url = getGoogleUrl("spreadsheets", sheetId, "zip");
		const zip = await fetchZipFromSheets(url);
		const { files } = zip;
		const extHtml = ".html";
		const filteredFiles = Object.keys(files).filter((fileName) =>
			lists.has(
				fileName.endsWith(extHtml)
					? fileName.slice(0, -extHtml.length)
					: fileName
			)
		);
		const sheetContent = await Promise.all(
			filteredFiles.map(async (fileName) => {
				const file = files[fileName];
				const content = await file.async("string");
				return { fileName, content };
			})
		);
		const sheetObject = sheetContent.reduce(
			(obj: Record<string, string>, item: SheetContentItem) => {
				return {
					...obj,
					[item.fileName.slice(0, -extHtml.length)]: item.content,
				};
			},
			{}
		);
		return sheetObject;
	} catch (error) {
		throw new Error(`An error occurs while parsing sheet ${sheetId}`);
	}
};

const parseVariablesByList = (variables: string[]): VariableGroups => {
	return variables.reduce((groups: VariableGroups, variable: string) => {
		const [list, ...value] = variable.replace(/[{}]/g, "").split("-");
		const key = variable;
		return {
			...groups,
			[list]: {
				...groups[list],
				[key]: value.map(Number),
			},
		};
	}, {});
};
const findMinColumn = (
	table: HTMLTableElement,
	column1: number,
	column2: number,
	row1: number,
	row2: number
) => {
	let minColumn = column1;
	for (let j = column1; j <= column2; j++) {
		let emptyColumn = true;
		for (let i = row1; i <= row2; i++) {
			const cellValue = table.rows[i].cells[j].innerHTML.trim();
			if (cellValue) {
				emptyColumn = false;
				break;
			}
		}
		if (emptyColumn) {
			minColumn++;
		} else {
			break;
		}
	}
	return minColumn;
};

const findMaxColumn = (
	table: HTMLTableElement,
	column1: number,
	column2: number,
	row1: number,
	row2: number
) => {
	let maxColumn = column2;
	for (let j = column2; j >= column1; j--) {
		let emptyColumn = true;
		for (let i = row1; i <= row2; i++) {
			const cellValue = table.rows[i].cells[j].innerHTML.trim();
			if (cellValue) {
				emptyColumn = false;
				break;
			}
		}
		if (emptyColumn) {
			maxColumn--;
		} else {
			break;
		}
	}
	return maxColumn;
};

const findMinRow = (
	table: HTMLTableElement,
	column1: number,
	column2: number,
	row1: number,
	row2: number
) => {
	let minRow = row1;
	for (let i = row1; i <= row2; i++) {
		let emptyRow = true;
		for (let j = column1; j <= column2; j++) {
			const cellValue = table.rows[i].cells[j].innerHTML.trim();
			if (cellValue) {
				emptyRow = false;
				break;
			}
		}
		if (emptyRow) {
			minRow++;
		} else {
			break;
		}
	}
	return minRow;
};

const findMaxRow = (
	table: HTMLTableElement,
	column1: number,
	column2: number,
	row1: number,
	row2: number
) => {
	let maxRow = row2;
	for (let i = row2; i >= row1; i--) {
		let emptyRow = true;
		for (let j = column1; j <= column2; j++) {
			const cellValue = table.rows[i].cells[j].innerHTML.trim();
			if (cellValue) {
				emptyRow = false;
				break;
			}
		}
		if (emptyRow) {
			maxRow--;
		} else {
			break;
		}
	}
	return maxRow;
};

const getVariablesValue = (
	uniqueLists: Set<string>,
	rawVariables: [] | RegExpMatchArray,
	sheetContent: Record<string, string>
) => {
	const variables: {
		[name: string]: string;
	} = {};
	const variablesByList = parseVariablesByList(rawVariables);
	const parser = new DOMParser();

	uniqueLists.forEach((sheetName) => {
		const sheetOne = parser.parseFromString(
			sheetContent[sheetName],
			"text/html"
		);
		const table = sheetOne.getElementsByTagName("table")[0];
		const varsForList: ICoordVariable = variablesByList[sheetName];

		const valuesForList: { [key: string]: string } = {};
		Object.entries(varsForList).forEach(([key, coordVariables]) => {
			let value = "";
			if (coordVariables.length === 2) {
				const [column, row] = coordVariables;
				value = table.rows[row].cells[column].innerHTML;
			} else if (coordVariables.length === 4) {
				const [column1, row1, column2, row2] = coordVariables;
				const minColumn = findMinColumn(
					table,
					column1,
					column2,
					row1,
					row2
				);
				const maxColumn = findMaxColumn(
					table,
					column1,
					column2,
					row1,
					row2
				);
				const minRow = findMinRow(table, column1, column2, row1, row2);
				const maxRow = findMaxRow(table, column1, column2, row1, row2);
				value += "<table>";
				for (let i = minRow; i <= maxRow; i++) {
					value += "<tr>";
					for (let j = minColumn; j <= maxColumn; j++) {
						const cellValue = table.rows[i].cells[j].innerHTML;
						value += `<td>${cellValue}</td>`;
					}
					value += "</tr>";
				}
				value += "</table>";
			}
			valuesForList[key] = value;
		});
		Object.assign(variables, valuesForList);
	});

	return variables;
};

const replaceVariables = (
	docContent: string,
	variables: {
		[name: string]: string;
	}
) => {
	return docContent.replace(/{[^}]+}/g, (match) => variables[match] || match);
};

export const getResDocumentData = async (docId: string, sheetId: string) => {
	const {
		parsedDocContent: docContent,
		rawVariables,
		uniqueLists,
	} = await extractDocumentData(docId);
	const sheetContent = await extractSheetData(sheetId, uniqueLists);
	const variables = getVariablesValue(
		uniqueLists,
		rawVariables,
		sheetContent
	);

	const resHtmlDoc = replaceVariables(
		docContent.documentElement.outerHTML,
		variables
	);

	return resHtmlDoc;
};

export const saveHtmlAsDoc = (resHtmlDoc: string) => {
	const source = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(
		resHtmlDoc
	)}`;
	const fileDownload = document.createElement("a");
	document.body.appendChild(fileDownload);
	fileDownload.href = source;
	fileDownload.download = "converted-document.doc";
	fileDownload.click();
	document.body.removeChild(fileDownload);
};
