const BreinifyGlobalConfigs = {} as { apiKey?: string; secret?: string };

export function BreinifySetup(apiKey: string, secret: string) {
	BreinifyGlobalConfigs.apiKey = apiKey;
	BreinifyGlobalConfigs.secret = secret;
}

export default BreinifyGlobalConfigs;
