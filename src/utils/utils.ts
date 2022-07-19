import { BreinifyGlobalConfigs, requiredSetup } from '../setup';

// Checks if BreinifySetup is complete
export function isSetupComplete() {
	console.log('BreinifyGlobalConfigs: ', BreinifyGlobalConfigs);
	return Object.keys(requiredSetup).every((value) => value in BreinifyGlobalConfigs);
}
