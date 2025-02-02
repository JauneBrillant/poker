import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"^@common/(.*)$": "<rootDir>/../common/$1",
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	transformIgnorePatterns: ["/node_modules/"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	extensionsToTreatAsEsm: [".ts"],
	globals: {
		"ts-jest": {
			useESM: true,
		},
	},
};

export default config;
