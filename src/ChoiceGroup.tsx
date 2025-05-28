import React from 'react';
import './index.css';

type ChoiceOption = {
	label: string;
	value: string;
};

type ChoiceGroupProps = {
	options: ChoiceOption[];
	selectedValue: string;
	onChange: (value: string) => void;
	name: string;
};

export const ChoiceGroup: React.FC<ChoiceGroupProps> = ({
	options,
	selectedValue,
	onChange,
	name,
}) => {
	const isAnySelected = selectedValue !== '';

	return (
		<div className="choice-group">
			{options.map(opt => {
				const isSelected = selectedValue === opt.value;
				const className = isAnySelected
					? isSelected
						? 'radio-wrapper selected'
						: 'radio-wrapper dimmed'
					: 'radio-wrapper';

				return (
					<label key={opt.value} className={className}>
						<input
							type="radio"
							name={name}
							value={opt.value}
							checked={isSelected}
							onClick={() => onChange(isSelected ? '' : opt.value)}
							readOnly
						/>
						<span>{opt.label}</span>
					</label>
				);
			})}
		</div>
	);
};
