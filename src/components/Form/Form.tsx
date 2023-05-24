import { FormEvent, useState, lazy, Suspense } from "react";
import { Button } from "../Button/Button";
import { UploadDocsSheets } from "../UploadDocsSheets/UploadDocsSheets";
import { DocsType } from "../../types";
import { Loader } from "../Loader/Loader";
import { useDocumentData } from "../../hooks/useDocumentData";

const PreviewDialog = lazy(() => import("../PreviewDialog/PreviewDialog"));

export const Form = () => {
	const [isOpenPreviewDialog, setIsOpenPreviewDialog] =
		useState<boolean>(false);
	const [docsData, setDocsData] = useState<DocsType>({
		docId: "",
		sheetId: "",
	});

	const { resDocContent, isLoading, saveDoc } = useDocumentData(
		docsData.docId,
		docsData.sheetId
	);

	const isHasRequiredUrls: boolean =
		docsData.docId.length > 0 && docsData.sheetId.length > 0;

	const handleCloseDialog = () => setIsOpenPreviewDialog(false);

	const handleDocumentId = (id: string) => {
		setDocsData((prevState) => ({ ...prevState, docId: id }));
	};

	const handleSheetId = (id: string) => {
		setDocsData((prevState) => ({ ...prevState, sheetId: id }));
	};

	const onShowPreviewFile = () => setIsOpenPreviewDialog(true);

	const onHandleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isHasRequiredUrls) {
			return;
		}
		saveDoc();
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
