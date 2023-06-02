import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Markup } from "interweave";
import { PreviewDialogPropsType } from "../../types";
import { selectDocumentData } from "../../state/selectors/docSelector";

const PreviewDialog = ({ handleCloseDialog }: PreviewDialogPropsType) => {
	const { resultDocData: content } = useSelector(selectDocumentData);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleCloseDialog();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleCloseDialog]);

	return (
		<div
			className="modal modal-xl fade show"
			style={{ display: "block" }}
			id="previewDialog"
			aria-labelledby="previewDialogLabel"
			role="dialog"
			aria-hidden={false}
		>
			<div
				className="modal-dialog modal-dialog-scrollable"
				role="document"
			>
				<div className="modal-content">
					<div className="modal-header">
						<h1
							className="modal-title fs-5"
							id="previewDialogLabel"
						>
							Preview
						</h1>
						<button
							type="button"
							className="btn btn-danger close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={handleCloseDialog}
						>
							<span aria-hidden="true">&#9747;</span>
						</button>
					</div>
					<div
						className="modal-body"
						style={{ whiteSpace: "pre-line" }}
					>
						{content && content.length > 0 && (
							<Markup content={content} />
						)}
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-outline-secondary"
							data-bs-dismiss="modal"
							onClick={handleCloseDialog}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreviewDialog;
