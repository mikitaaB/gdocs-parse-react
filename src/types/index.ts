import { ReactNode } from "react";

export type VariableType = {
	id: string;
	name: string;
	value: string;
};

export type ButtonPropsType = {
	isSubmit: boolean;
	children: ReactNode;
	isDisabled: boolean;
	isLoading: boolean;
	variant: string;
	clickCallback?: () => void;
};

export type PreviewDialogPropsType = {
	isOpenPreviewDialog: boolean;
	handleCloseDialog: () => void;
	content: string;
};

export type DocsType = {
	docId: string;
	sheetId: string;
};

export type DocumentType = "spreadsheets" | "document" | "presentation";

export type ExportFormatType = "html" | "zip";

export type UploadDocPropsType = {
	title: string;
	dataType: DocumentType;
	exportFormatType: ExportFormatType;
	handleSetDocId: (id: string) => void;
};

export type UploadDocsSheetsPropsType = {
	handleDocumentId: (id: string) => void;
	handleSheetId: (id: string) => void;
};

export type SheetContentItem = {
	fileName: string;
	content: string;
};

export interface ICoordVariable {
	[key: string]: number[];
}

export type VariableGroups = Record<string, ICoordVariable>;
