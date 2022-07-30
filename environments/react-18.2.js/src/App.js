import { CarouselTest } from './CarouselTest';

import { BreinifySetup } from 'brein-api-library-react';

const apiKey = process.env.REACT_APP_API_KEY || '';
const secret = process.env.REACT_APP_SECRET;

BreinifySetup({ apiKey, secret });

function App() {
	return (
		<div className='App'>
			<CarouselTest />
		</div>
	);
}

export default App;
