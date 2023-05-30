import { FormEvent, memo } from "react";
import { Button } from "../Button/Button";
import { UploadDocsSheets } from "../UploadDocsSheets/UploadDocsSheets";
import { FormPropsType } from "../../types";

export const Form = memo(
	({
		isHasRequiredUrls,
		isLoading,
		handlePressPreview,
		handlePressDownload,
		setDocsData,
	}: FormPropsType) => {
		const handleDocumentId = (docId: string) => {
			setDocsData((prevState) => ({ ...prevState, docId }));
		};

		const handleSheetId = (sheetId: string) => {
			setDocsData((prevState) => ({ ...prevState, sheetId }));
		};

		const onHandleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!isHasRequiredUrls) {
				return;
			}
			handlePressDownload();
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
							clickCallback={handlePressPreview}
							isSubmit={false}
						>
							Preview
						</Button>
					</div>
					<div className="me-1">
						<Button
							variant="success"
							isDisabled={!isHasRequiredUrls}
							isLoading={isLoading}
							isSubmit
						>
							Download
						</Button>
					</div>
				</div>
			</form>
		);
	}
);
