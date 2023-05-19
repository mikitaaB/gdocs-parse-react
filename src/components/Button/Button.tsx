import { memo } from "react";
import { ButtonPropsType } from "../../types";

export const Button = memo((props: ButtonPropsType) => {
	const { isSubmit, children, isDisabled, variant, clickCallback } = props;

	return (
		<button
			className={`btn d-md-flex btn-${variant}`}
			disabled={isDisabled}
			aria-disabled={isDisabled}
			onClick={clickCallback}
			type={isSubmit ? "submit" : "button"}
		>
			{children}
		</button>
	);
});
