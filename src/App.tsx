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
	const { resDocContent, isLoading, fetchData, saveDoc } = useDocumentData();
	const [isOpenPreviewDialog, setIsOpenPreviewDialog] =
		useState<boolean>(false);

	const handlePressPreview = async () => {
		await fetchData(docsData.docId, docsData.sheetId);
		setIsOpenPreviewDialog(true);
	};

	const handlePressDownload = async () => {
		await fetchData(docsData.docId, docsData.sheetId);
		saveDoc();
	};

	const isHasRequiredUrls: boolean =
		docsData.docId.length > 0 && docsData.sheetId.length > 0;

	const handleCloseDialog = () => setIsOpenPreviewDialog(false);

	return (
		<>
			<Form
				isHasRequiredUrls={isHasRequiredUrls}
				isLoading={isLoading}
				handlePressPreview={handlePressPreview}
				handlePressDownload={handlePressDownload}
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
