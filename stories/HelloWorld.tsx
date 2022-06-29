import React from 'react';

type HelloWorldProps = {
	color: string;
	message: string;
	metadata: Record<string, string>;
	entries: Array<any>;
};

export const HelloWorldComponent = ({ color, message = 'Hello World', metadata, entries = [] }: HelloWorldProps) => {
	return (
		<div style={{ color: color }}>
			<h3>{message}</h3>
			<section>
				<h5>Metadata</h5>
				<pre>{JSON.stringify(metadata, null, 2)}</pre>
			</section>
			<section>
				<h5>Entries</h5>
				{Array.isArray(entries) &&
					entries.map((it) => (
						<div>
							<pre>{JSON.stringify(it, null, 2)}</pre>
						</div>
					))}
			</section>
		</div>
	);
};
