export interface User {
	phone?: string;
	email?: string;
	userId?: string;
	identifiers?: {
		browserId: string;
	};
	sessionId?: string;
	additional?: UserAdditionalData;
}

export interface UserAdditionalData {
	identifiers?: {
		browserId?: string;
		assignedGroup?: string;
		originalSessionId?: string;
	};
	location?: {
		storeId?: number;
	};
	userAgent?: string;
	url?: string;
	timezone?: string;
	localDateTime?: string;
}

export interface Recommendation {
	recommendationQueryName?: string;
	recommendationDisableFilters?: boolean;
	recommendationRemoveDuplicates?: boolean;
	numRecommendations?: number;
	recommendationSubRecommenders?: Array<string>;
	recommendationForItems?: Array<string>;
	recommendationAdditionalParameters?: RecommendationAdditionalParameters;
	recommendationCategories?: Array<string>;
	recommendationCategoriesBlacklist?: Array<string>;
	namedRecommendations?: Array<string>;
	recommendationAtTime?: number;
	queryPostProcessors?: Array<string>;
	recommendationMinQuantity?: number;
	recommendationSubBlockers?: Array<string>;
	recommendationSubInhibitors?: Array<string>;
}

export interface DataTags {
	atStore?: string;
	deviceType?: string;
}

export interface CuratedLists {
	specifiedLists: Array<string>;
}

export interface RecommendationAdditionalParameters {
	selectedModels?: Array<string>;
	customSorterTypes?: Array<string>;
	dataTagsToConsider?: Array<string>;
	dataTags?: DataTags;
	ignoreRecommendations?: boolean;
	postProcessors?: Array<string>;
	manual?: CuratedLists;
	numRecommendationsInternal?: number;
	temporalTypes?: Array<string>;
}

interface BaseRecommendationQuery {
	unixTimestamp?: number;
	user?: User;
	signature?: string | null;
}

interface SingleRecommendationQuery extends BaseRecommendationQuery {
	recommendation: Recommendation;
}

interface MultipleRecommendationQuery extends BaseRecommendationQuery {
	recommendations: Array<Recommendation>;
}

export type RecommendationQuery = SingleRecommendationQuery | MultipleRecommendationQuery;
