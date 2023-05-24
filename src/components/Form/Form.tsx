import { FormEvent, memo } from "react";
import { Button } from "../Button/Button";
import { UploadDocsSheets } from "../UploadDocsSheets/UploadDocsSheets";
import { DocsType, FormPropsType } from "../../types";

export const Form = memo(
	({
		idDoc,
		idSheet,
		isLoading,
		saveDoc,
		handleOpenDialog,
		setDocsData,
	}: FormPropsType) => {
		const isHasRequiredUrls: boolean =
			idDoc.length > 0 && idSheet.length > 0;

		const handleDocumentId = (docId: string) => {
			setDocsData((prevState: DocsType) => ({ ...prevState, docId }));
		};

		const handleSheetId = (sheetId: string) => {
			setDocsData((prevState: DocsType) => ({ ...prevState, sheetId }));
		};

		const onHandleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!isHasRequiredUrls) {
				return;
			}
			saveDoc();
		};

		return (
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
							clickCallback={handleOpenDialog}
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
		);
	}
);
