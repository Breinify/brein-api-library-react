import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { HelloWorldComponent } from './HelloWorld';

export default {
	title: 'Hello World - Example Story',
	component: HelloWorldComponent,
} as ComponentMeta<typeof HelloWorldComponent>;

const Template: ComponentStory<typeof HelloWorldComponent> = (args) => <HelloWorldComponent {...args} />;
export const Primary = Template.bind({});
