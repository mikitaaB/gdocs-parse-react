import { UploadDocsSheetsPropsType } from "../../types";
import { UploadDocument } from "../UploadDocument/UploadDocument";

export const UploadDocsSheets = ({
	handleDocumentId,
	handleSheetId,
}: UploadDocsSheetsPropsType) => {
	return (
		<>
			<UploadDocument
				title="Template"
				dataType="document"
				exportFormatType="html"
				handleSetDocId={handleDocumentId}
			/>
			<UploadDocument
				title="Data table"
				dataType="spreadsheets"
				exportFormatType="zip"
				handleSetDocId={handleSheetId}
			/>
		</>
	);
};
