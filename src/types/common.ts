export const enum STATUS {
	SUCCESS = 'SUCCESS',
	REQUESTING = 'REQUESTING',
	FAILURE = 'FAILURE',
	REFETCH = 'REFETCH',
	INIT = 'INIT',
}

export type LoadingState = {
	status: STATUS;
	reason: object | string;
};
