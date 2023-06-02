import { memo } from "react";
import { useSelector } from "react-redux";
import { UploadDocsSheets } from "../UploadDocsSheets/UploadDocsSheets";
import { selectDocumentData } from "../../state/selectors/docSelector";
import { FormPanelPropsType } from "../../types";
import { ButtonsPanel } from "../ButtonsPanel/ButtonsPanel";

export const Form = memo(({ handleDisplayDialog }: FormPanelPropsType) => {
	const { error } = useSelector(selectDocumentData);

	return (
		<form>
			<UploadDocsSheets />
			<ButtonsPanel handleDisplayDialog={handleDisplayDialog} />
			{error && <p>Error: {error}</p>}
		</form>
	);
});
