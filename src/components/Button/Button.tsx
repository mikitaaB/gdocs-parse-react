import { memo } from "react";
import { ButtonPropsType } from "../../types";
import s from "./button.module.css";

export const Button = memo((props: ButtonPropsType) => {
	const { children, isDisabled, isLoading, variant, clickCallback } = props;

	const disabledBtn = isDisabled || isLoading ? "disabled" : "";

	return (
		<button
			className={`btn d-md-flex btn-${variant} ${disabledBtn} ${s.buttonStyle}`}
			onClick={clickCallback}
			type="button"
		>
			{isLoading ? (
				<div>
					<span
						className="spinner-border spinner-border-sm"
						role="status"
						aria-hidden="true"
					/>
				</div>
			) : (
				children
			)}
		</button>
	);
});
