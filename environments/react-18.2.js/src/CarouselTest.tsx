import React from 'react';
import { Carousel } from 'brein-api-library-react';

export const CarouselTest = () => {
	return (
		<Carousel
			dots
			arrows
			infinite
			slidesToShow={3}
			slidesToScroll={2}
			responsive={[
				{
					breakpoint: 1440,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 5,
					},
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
					},
				},
				{
					breakpoint: 850,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						dots: true,
					},
				},
				{
					breakpoint: 425,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: false,
					},
				},
			]}
			containerClassName='carousel-container'
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
	);
};
