import { useCallback, useEffect } from 'react';
import { getRecommendations } from '../../api';
import { RecommendationQuery } from '../../types';

// export function useRecommendations() {
// 	const data;
// 	const error;
// 	const loading;
// 	const success;
// 	const getRecs = useCallback(
// 		({ user, unixTimestamp, signature, recommendation, recommendations }: RecommendationQuery) => {
// 			return getRecommendations({ user, unixTimestamp, signature, recommendation, recommendations });
// 		},
// 		[]
// 	);
// 	useEffect(() => {}, []);
// }
