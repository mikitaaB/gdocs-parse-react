/* eslint-disable no-alert */
import { MouseEvent, KeyboardEvent, useRef } from "react";
import { UploadDocPropsType } from "../../types";
import { docsUrl } from "../../constants";

export const UploadDocument = ({
	title,
	dataType,
	handleSetDocId,
}: UploadDocPropsType) => {
	const docsInputRef = useRef<HTMLInputElement>(null);
	const inputName = `${dataType}Url`;

	const onUploadUrl = (
		e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
	) => {
		if (
			e.type === "click" ||
			(e.type === "keydown" && (e as KeyboardEvent).key === "Enter")
		) {
			if (docsInputRef.current) {
				const url = docsInputRef.current.value.trim();
				if (url && url.startsWith(`${docsUrl}${dataType}/`)) {
					const pattern = /d\/([^/]+)/;
					const match = url.match(pattern);
					if (match) {
						handleSetDocId(match[1]);
					}
				} else {
					alert(
						"Check the entered link. There should be a link to Google Docs"
					);
				}
			}
		}
	};

	return (
		<div
			className="d-flex flex-row flex-sm-column flex-xl-row
				align-items-center justify-content-start"
		>
			<span className="text-nowrap">{title}:</span>
			<div className="input-group mb-3 mt-3 px-2">
				<input
					type="url"
					className="form-control"
					id="uploadInputDocFile"
					onKeyDown={onUploadUrl}
					name={inputName}
					lang="en"
					ref={docsInputRef}
				/>
				<button
					className="input-group-text"
					type="button"
					onClick={onUploadUrl}
				>
					Upload
				</button>
			</div>
		</div>
	);
};
