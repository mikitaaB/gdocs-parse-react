import { useState, lazy, Suspense } from "react";
import { Form } from "./components/Form/Form";
import { Loader } from "./components/Loader/Loader";
import { DocsType } from "./types";
import { useDocumentData } from "./hooks/useDocumentData";

const PreviewDialog = lazy(
	() => import("./components/PreviewDialog/PreviewDialog")
);

function App() {
	const [docsData, setDocsData] = useState<DocsType>({
		docId: "",
		sheetId: "",
	});
	const { resDocContent, isLoading, saveDoc } = useDocumentData(
		docsData.docId,
		docsData.sheetId
	);
	const [isOpenPreviewDialog, setIsOpenPreviewDialog] =
		useState<boolean>(false);

	const handleOpenDialog = () => setIsOpenPreviewDialog(true);

	const handleCloseDialog = () => setIsOpenPreviewDialog(false);

	return (
		<>
			<Form
				idDoc={docsData.docId}
				idSheet={docsData.sheetId}
				isLoading={isLoading}
				saveDoc={saveDoc}
				handleOpenDialog={handleOpenDialog}
				setDocsData={setDocsData}
			/>
			{isOpenPreviewDialog && (
				<Suspense fallback={<Loader />}>
					<PreviewDialog
						handleCloseDialog={handleCloseDialog}
						content={resDocContent}
					/>
				</Suspense>
			)}
		</>
	);
}

export default App;
