import { memo } from "react";
import { ButtonPropsType } from "../../types";
import s from "./button.module.css";

export const Button = memo((props: ButtonPropsType) => {
	const {
		isSubmit,
		children,
		isDisabled,
		isLoading,
		variant,
		clickCallback,
	} = props;

	const disabledBtn = isDisabled ? "disabled" : "";

	return (
		<button
			className={`btn d-md-flex btn-${variant} ${disabledBtn} ${s.buttonStyle}`}
			onClick={clickCallback}
			type={isSubmit ? "submit" : "button"}
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
