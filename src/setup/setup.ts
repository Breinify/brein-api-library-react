// TYPES
import { IConfig, SetupProps } from '../types';
import { isString } from '../utils';

// Required keys needed to initialize BreinifyGlobalConfigs
export const requiredSetup = {
	apiKey: 'apiKey',
};

export const BreinifyGlobalConfigs = {} as IConfig;

// Users call this on their app (in the highest level)
export function BreinifySetup({ apiKey, secret }: SetupProps): void {
	if (!apiKey) throw 'Need apiKey in BreinifySetup';
	if (!isString(apiKey)) throw 'Api Key needs to be a string';
	if (secret && !isString(secret)) throw 'Secret needs to be a string';
	BreinifyGlobalConfigs.apiKey = apiKey;
	BreinifyGlobalConfigs.secret = secret;
}
