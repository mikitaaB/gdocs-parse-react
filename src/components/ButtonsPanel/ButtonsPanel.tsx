import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { selectFormData } from "../../state/selectors/formSelector";
import { saveHtmlAsDoc } from "../../utils/prepareFinalDoc";
import { selectDocumentData } from "../../state/selectors/docSelector";
import { useFetchAndSaveData } from "../../hooks/useFetchAndSaveData";
import { FormPanelPropsType } from "../../types";

export const ButtonsPanel = memo(
	({ handleDisplayDialog }: FormPanelPropsType) => {
		const { docId, sheetId } = useSelector(selectFormData);
		const { isLoading } = useSelector(selectDocumentData);
		const [isHasRequiredUrls, setIsHasRequiredUrls] =
			useState<boolean>(false);
		const fetchData = useFetchAndSaveData();

		const handlePressPreview = useCallback(async () => {
			const htmlBody = await fetchData(docId, sheetId);
			if (htmlBody) {
				handleDisplayDialog();
			}
		}, [docId, sheetId, fetchData, handleDisplayDialog]);

		const handlePressDownload = useCallback(async () => {
			const htmlBody = await fetchData(docId, sheetId);
			if (htmlBody) {
				saveHtmlAsDoc(htmlBody);
			}
		}, [docId, sheetId, fetchData]);

		useEffect(() => {
			setIsHasRequiredUrls(docId.length > 0 && sheetId.length > 0);
		}, [docId, sheetId]);

		return (
			<div className="d-flex justify-content-end mt-3">
				<div className="me-1">
					<Button
						variant="primary"
						isDisabled={!isHasRequiredUrls}
						isLoading={isLoading}
						clickCallback={handlePressPreview}
					>
						Preview
					</Button>
				</div>
				<div className="me-1">
					<Button
						variant="success"
						isDisabled={!isHasRequiredUrls}
						isLoading={isLoading}
						clickCallback={handlePressDownload}
					>
						Download
					</Button>
				</div>
			</div>
		);
	}
);
