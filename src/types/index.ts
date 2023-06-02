import { ReactNode } from "react";

export type VariableType = {
	id: string;
	name: string;
	value: string;
};

export type ButtonPropsType = {
	children: ReactNode;
	isDisabled: boolean;
	isLoading: boolean;
	variant: string;
	clickCallback: () => void;
};

export type PreviewDialogPropsType = {
	handleCloseDialog: () => void;
};

export type DocsType = {
	docId: string;
	sheetId: string;
};

export type DocumentType = "spreadsheets" | "document" | "presentation";

export type ExportFormatType = "html" | "zip";

export type UploadDocPropsType = {
	id?: number;
	title: string;
	dataType: DocumentType;
	handleSetDocId: (id: string) => void;
};

export type SheetContentItem = {
	fileName: string;
	content: string;
};

export type CoordVariable = {
	[key: string]: number[];
};

export type VariableGroups = Record<string, CoordVariable>;

export type FormPanelPropsType = {
	handleDisplayDialog: () => void;
};

export type DocSliceInitialStateType = {
	documentData: string | null;
	sheetData: string | null;
	resultDocData: string | null;
	isLoading: boolean;
	error: string | null;
};
