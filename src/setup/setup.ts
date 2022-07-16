import { IConfig, SetupProps } from '../types';

// Required keys needed to initialize BreinifyGlobalConfigs
export const requiredSetup = {
	apiKey: 'apiKey',
};

export const BreinifyGlobalConfigs = {} as IConfig;

// Users call this on their app (in the highest level)
export function BreinifySetup({ apiKey, secret }: SetupProps): void {
	BreinifyGlobalConfigs.apiKey = apiKey;
	BreinifyGlobalConfigs.secret = secret;
}
