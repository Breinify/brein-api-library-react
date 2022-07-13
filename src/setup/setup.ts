type ConfigProps = {
	apiKey?: string;
	secret?: string;
};

export const BreinifyGlobalConfigs = {} as ConfigProps;

// Required keys needed to initialize BreinifyGlobalConfigs
export const requiredSetup = {
	apiKey: 'apiKey',
};

// Users call this on their app (in the highest level)
export function BreinifySetup({ apiKey, secret }: ConfigProps): void {
	BreinifyGlobalConfigs.apiKey = apiKey;
	BreinifyGlobalConfigs.secret = secret;
}
