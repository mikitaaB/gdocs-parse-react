import { memo, useEffect } from "react";
import DOMPurify from "dompurify";
import { PreviewDialogPropsType } from "../../types";

const PreviewDialog = memo((props: PreviewDialogPropsType) => {
	const { isOpenPreviewDialog, handleCloseDialog, content } = props;
	const sanitizedContent = DOMPurify.sanitize(content, {
		FORCE_BODY: true,
	});

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
			className={`modal modal-xl fade ${
				isOpenPreviewDialog ? "show" : ""
			}`}
			style={{ display: isOpenPreviewDialog ? "block" : "none" }}
			id="previewDialog"
			aria-labelledby="previewDialogLabel"
			role="dialog"
			aria-hidden={!isOpenPreviewDialog}
		>
			<div className="modal-dialog" role="document">
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
							className="close"
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
						{sanitizedContent.length > 0 && (
							<div
								dangerouslySetInnerHTML={{
									__html: sanitizedContent,
								}}
							/>
						)}
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
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
});

export default PreviewDialog;
