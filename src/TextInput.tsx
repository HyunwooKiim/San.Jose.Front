import React from 'react';
import './index.css';

type TextInputProps = {
	size: 'small' | 'large';
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const TextInput: React.FC<TextInputProps> = ({
	size,
	placeholder = 'Enter your answer here',
	value,
	onChange,
}) => {
	const [focused, setFocused] = React.useState(false);

	const getStatus = () => {
		if (focused) return 'focused';
		if (value.trim()) return 'filled';
		return 'empty';
	};

	const status = getStatus();

	const sharedProps = {
		className: `text-box ${status}`,
		value,
		placeholder,
		onChange,
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
	};

	return size === 'small' ? (
		<input type="text" {...sharedProps} />
	) : (
		<textarea rows={6} {...sharedProps} />
	);
};
