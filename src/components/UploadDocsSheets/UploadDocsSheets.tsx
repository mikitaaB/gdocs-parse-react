import { useDispatch } from "react-redux";
import { UploadDocPropsType } from "../../types";
import { UploadDocument } from "../UploadDocument/UploadDocument";
import { AppDispatch } from "../../state/store";
import { setDocId, setSheetId } from "../../state/slices/formSlice";

export const UploadDocsSheets = () => {
	const dispatch = useDispatch<AppDispatch>();
	const handleDocumentId = (idDoc: string) => {
		dispatch(setDocId(idDoc));
	};
	const handleSheetId = (idSheet: string) => {
		dispatch(setSheetId(idSheet));
	};

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
};
