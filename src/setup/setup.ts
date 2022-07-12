type ConfigProps = {
	apiKey?: string;
	secret?: string;
};

const BreinifyGlobalConfigs = {} as ConfigProps;

export function BreinifySetup({ apiKey, secret }: ConfigProps): void {
	BreinifyGlobalConfigs.apiKey = apiKey;
	BreinifyGlobalConfigs.secret = secret;
}

export default BreinifyGlobalConfigs;
