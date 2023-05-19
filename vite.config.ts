import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		base: mode === "production" ? "/gdocs-parse-react/" : "/",
		plugins: [react(), eslint()],
	};
});
