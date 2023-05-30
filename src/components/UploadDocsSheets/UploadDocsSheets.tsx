import { memo } from "react";
import { UploadDocPropsType, UploadDocsSheetsPropsType } from "../../types";
import { UploadDocument } from "../UploadDocument/UploadDocument";

export const UploadDocsSheets = memo(
	({ handleDocumentId, handleSheetId }: UploadDocsSheetsPropsType) => {
		const uploadDocumentSets: UploadDocPropsType[] = [
			{
				id: 0,
				title: "Template (Google Docs)",
				dataType: "document",
				handleSetDocId: handleDocumentId,
			},
			{
				id: 1,
				title: "Data table (Google Sheets)",
				dataType: "spreadsheets",
				handleSetDocId: handleSheetId,
			},
		];

		return (
			<>
				{uploadDocumentSets.map((el) => (
					<UploadDocument
						key={el.id}
						title={el.title}
						dataType={el.dataType}
						handleSetDocId={el.handleSetDocId}
					/>
				))}
			</>
		);
	}
);
