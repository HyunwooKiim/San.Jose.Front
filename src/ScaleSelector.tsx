import React from 'react';
import './index.css';

type ScaleSelectorProps = {
	min: number;
	max: number;
	selectedValue?: number | null;
	onChange: (value: number | null) => void;
	name: string;
};

export const ScaleSelector: React.FC<ScaleSelectorProps> = ({
	min,
	max,
	selectedValue,
	onChange,
	name,
}) => {
	const isAnySelected = selectedValue !== null && selectedValue !== undefined;
	const scale = Array.from({ length: max - min + 1 }, (_, i) => min + i);

	return (
		<div className="scale-selector">
			{scale.map(num => {
				const isSelected = selectedValue === num;
				const className = isAnySelected
					? isSelected
						? 'scale-item selected'
						: 'scale-item dimmed'
					: 'scale-item';

				return (
					<label key={num} className={className}>
						<input
							type="radio"
							name={name}
							value={num}
							checked={isSelected}
							onClick={() => onChange(isSelected ? null : num)}
							readOnly
						/>
						<span>{num}</span>
					</label>
				);
			})}
		</div>
	);
};
