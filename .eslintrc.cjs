module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		project: "./tsconfig.eslint.json",
	},
	extends: [
		"airbnb",
		"airbnb-typescript",
		"prettier",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["prettier", "@typescript-eslint"],
	rules: {
		"@typescript-eslint/consistent-type-exports": "off",
		"@typescript-eslint/consistent-type-imports": "off",
		"no-console": ["error", { allow: ["error"] }],
		"import/prefer-default-export": "off",
		"react/function-component-definition": "off",
		"prettier/prettier": "error",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"jsx-a11y/label-has-associated-control": "off",
		"no-plusplus": "off",
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: ["**/*.test.{ts,tsx,js,jsx}"],
			},
		],
		indent: "off",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{ argsIgnorePattern: "^action" },
		],
		"no-nested-ternary": "off",
		"no-unneeded-ternary": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
