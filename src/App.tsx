import { useState, lazy, Suspense, useCallback } from "react";
import { Form } from "./components/Form/Form";
import { Loader } from "./components/Loader/Loader";

const PreviewDialog = lazy(
	() => import("./components/PreviewDialog/PreviewDialog")
);

function App() {
	const [isOpenPreviewDialog, setIsOpenPreviewDialog] =
		useState<boolean>(false);

	const handleDisplayDialog = useCallback(
		() => setIsOpenPreviewDialog((prevState) => !prevState),
		[]
	);

	return (
		<>
			<h3>Document</h3>
			<Form handleDisplayDialog={handleDisplayDialog} />
			{isOpenPreviewDialog && (
				<Suspense fallback={<Loader />}>
					<PreviewDialog handleCloseDialog={handleDisplayDialog} />
				</Suspense>
			)}
		</>
	);
}

export default App;
