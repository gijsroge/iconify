import { parseIconValue } from '../src/attributes/icon/index';
import { defaultIconProps } from '@iconify/utils/lib/icon/defaults';

describe('Testing parseIconValue without API', () => {
	it('Instantly loading object', () => {
		const value = {
			body: '<g />',
		};
		const result = parseIconValue(value, () => {
			throw new Error('callback should not have been called');
		});
		expect(result).toEqual({
			value,
			data: {
				...defaultIconProps,
				...value,
			},
		});
		expect(result.value).toBe(value);
	});

	it('Instantly loading serialised object', () => {
		const value = JSON.stringify({
			body: '<g />',
		});
		const result = parseIconValue(value, () => {
			throw new Error('callback should not have been called');
		});
		expect(result).toEqual({
			value,
			data: {
				...defaultIconProps,
				body: '<g />',
			},
		});
	});

	it('Bad data', () => {
		const value = '<svg />';
		const result = parseIconValue(value, () => {
			throw new Error('callback should not have been called');
		});
		expect(result).toEqual({
			value,
		});
	});

	it('Icon without prefix', () => {
		const value = 'test';
		const result = parseIconValue(value, () => {
			throw new Error('callback should not have been called');
		});
		expect(result).toEqual({
			value,
			name: {
				provider: '',
				prefix: '',
				name: value,
			},
		});
	});
});
