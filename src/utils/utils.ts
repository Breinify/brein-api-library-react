import { BreinifyGlobalConfigs, requiredSetup } from '../setup';

// Checks if BreinifySetup is complete
export function isSetupComplete() {
	return Object.keys(requiredSetup).every((value) => value in BreinifyGlobalConfigs);
}

export function isString(value: any): boolean {
	return typeof value === 'string';
}
