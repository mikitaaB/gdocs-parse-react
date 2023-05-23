import { FormEvent, useState, lazy, Suspense } from "react";
import { Button } from "../Button/Button";
import { UploadDocsSheets } from "../UploadDocsSheets/UploadDocsSheets";
import { DocsType } from "../../types";
import { getResDocumentData, saveHtmlAsDoc } from "../../utils/prepareFinalDoc";
import { Loader } from "../Loader/Loader";

const PreviewDialog = lazy(() => import("../PreviewDialog/PreviewDialog"));

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
		saveHtmlAsDoc(resHtmlDoc);
	};

	const onShowPreviewFile = async () => {
		setIsLoading(true);
		const resHtmlDoc = await getResDocumentData(
			docsData.docId,
			docsData.sheetId
		);
		setIsLoading(false);
		setResDocContent(resHtmlDoc);
		setIsOpenPreviewDialog(true);
	};

	const handleCloseDialog = () => setIsOpenPreviewDialog(false);

	const handleDocumentId = (id: string) => {
		setDocsData((prevState) => ({ ...prevState, docId: id }));
	};

	const handleSheetId = (id: string) => {
		setDocsData((prevState) => ({ ...prevState, sheetId: id }));
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
							isDisabled={!isHasRequiredUrls}
							isLoading={isLoading}
							clickCallback={onShowPreviewFile}
							isSubmit={false}
						>
							<div>Preview</div>
						</Button>
					</div>
					<div className="me-1">
						<Button
							variant="success"
							isDisabled={!isHasRequiredUrls}
							isLoading={isLoading}
							isSubmit
						>
							<div>Download</div>
						</Button>
					</div>
				</div>
			</form>
			{isOpenPreviewDialog && (
				<Suspense fallback={<Loader />}>
					<PreviewDialog
						isOpenPreviewDialog={isOpenPreviewDialog}
						handleCloseDialog={handleCloseDialog}
						content={resDocContent}
					/>
				</Suspense>
			)}
		</div>
	);
};
