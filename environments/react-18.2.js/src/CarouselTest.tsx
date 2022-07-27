import React from 'react';
import { Carousel } from 'brein-api-library-react';

export const CarouselTest = () => {
	return (
		<div style={{ padding: '30px' }}>
			<Carousel
				arrows
				slidesToShow={1}
				slidesToScroll={1}
				dots
				recommendationQuery={{
					user: {
						sessionId: 'some session id',
					},
					recommendation: {
						numRecommendations: 10,
					},
					signature: null,
				}}
			/>
		</div>
	);
};
