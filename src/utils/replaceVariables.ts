const isContainsHtmlCode = (varValue: string) => {
	const parser = new DOMParser();
	const htmlRegExp = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
	const newVarValue = varValue.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
	const validTest = htmlRegExp.test(newVarValue);
	const validDoc = parser.parseFromString(newVarValue, "text/html");
	const errorElement = validDoc.querySelector("parsererror");
	return validTest && errorElement === null;
};

const insertAfter = (newNode: Node, referenceNode: Node) => {
	referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
};

export const replaceVarsToValues = (
	doc: Document,
	variables: {
		[name: string]: string;
	}
) => {
	const allNodes = doc.querySelectorAll(":not(:empty)");
	const parser = new DOMParser();

	allNodes.forEach((node: Element) => {
		const nodeText = node.textContent || "";
		let updatedText = nodeText;
		const tempNode = node;
		Object.keys(variables).some((varName) => {
			const varRegex = new RegExp(`^${varName}$`);
			const value = variables[varName];
			if (varRegex.test(nodeText)) {
				if (isContainsHtmlCode(value)) {
					const newNode = parser.parseFromString(value, "text/html")
						.body.firstChild;
					if (newNode) {
						insertAfter(newNode, node);
						node.parentNode?.removeChild(node);
					}
				} else {
					updatedText = updatedText.replace(varRegex, value);
					tempNode.textContent = updatedText;
				}
				return true;
			}
			return false;
		});
	});

	return doc;
};
