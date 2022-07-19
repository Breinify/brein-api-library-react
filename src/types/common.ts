export const enum STATUS {
	SUCCESS = 'SUCCESS',
	REQUESTING = 'REQUESTING',
	FAILURE = 'FAILURE',
	REFETCH = 'REFETCH',
}

export type LoadingState = {
	status: STATUS;
	reason: any;
};
