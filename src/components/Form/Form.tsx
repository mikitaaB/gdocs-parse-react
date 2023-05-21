import { FormEvent, useState } from "react";
import { PreviewDialog } from "../PreviewDialog/PreviewDialog";
import { Button } from "../Button/Button";
import { UploadDocsSheets } from "../UploadDocsSheets/UploadDocsSheets";
import { DocsType } from "../../types";
import { getResDocumentData, saveHtmlAsDoc } from "../../utils/prepareFinalDoc";

export const Form = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [resDocContent, setResDocContent] = useState<string>("");
	const [isOpenPreviewDialog, setIsOpenPreviewDialog] =
		useState<boolean>(false);
	const [docsData, setDocsData] = useState<DocsType>({
		docId: "",
		sheetId: "",
	});

	const isHasRequiredUrls: boolean =
		docsData.docId.length > 0 && docsData.sheetId.length > 0;

	const onHandleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isHasRequiredUrls) {
			return;
		}
		setIsLoading(true);
		const resHtmlDoc = await getResDocumentData(
			docsData.docId,
			docsData.sheetId
		);
		setIsLoading(false);
		setResDocContent(resHtmlDoc);
		saveHtmlAsDoc(resHtmlDoc);
	};

	const onShowPreviewFile = async () => {
		setIsLoading(true);
		const resHtmlDoc = await getResDocumentData(
			docsData.docId,
			docsData.sheetId
		);
		setIsLoading(false);
		const htmlBody = resHtmlDoc.replace(/<\/?(html|head|body)>/g, "");
		setResDocContent(htmlBody);
		setIsOpenPreviewDialog(true);
	};

	const handleCloseDialog = () => setIsOpenPreviewDialog(false);

	const handleDocumentId = (id: string) => {
		setDocsData({ ...docsData, docId: id });
	};

	const handleSheetId = (id: string) => {
		setDocsData({ ...docsData, sheetId: id });
	};

	return (
		<div>
			<form onSubmit={onHandleSubmitForm}>
				<h3>Document</h3>

				<UploadDocsSheets
					handleDocumentId={handleDocumentId}
					handleSheetId={handleSheetId}
				/>

				<div className="d-flex justify-content-end mt-3">
					<div className="me-1">
						<Button
							variant="primary"
							isDisabled={!isHasRequiredUrls || isLoading}
							clickCallback={onShowPreviewFile}
							isSubmit={false}
						>
							Preview
						</Button>
					</div>
					<div className="me-1">
						<Button
							variant="success"
							isDisabled={!isHasRequiredUrls || isLoading}
							isSubmit
						>
							Download
						</Button>
					</div>
				</div>
			</form>
			<PreviewDialog
				isOpenPreviewDialog={isOpenPreviewDialog}
				handleCloseDialog={handleCloseDialog}
				content={resDocContent}
			/>
		</div>
	);
};
