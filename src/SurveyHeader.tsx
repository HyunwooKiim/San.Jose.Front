import { useNavigate } from 'react-router-dom';

type SurveyHeaderProps = {
	current: number; // 현재 질문 번호 (0부터 시작 가능)
	total: number; // 총 질문 수
};

const SurveyHeader: React.FC<SurveyHeaderProps> = ({ current, total }) => {
	const navigate = useNavigate();
	const percent = Math.round((current / total) * 100);

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				padding: '1rem',
				borderBottom: '1px solid #ddd',
				position: 'sticky',
				top: 0,
				backgroundColor: 'white',
				zIndex: 10,
			}}
		>
			<button
				onClick={() => navigate('/')}
				style={{
					background: 'none',
					border: 'none',
					fontSize: '1.5rem',
					cursor: 'pointer',
					marginRight: '1rem',
				}}
			>
				←
			</button>

			<div style={{ flexGrow: 1, marginRight: '1rem' }}>
				<div
					style={{
						backgroundColor: '#ccc',
						borderRadius: '9999px',
						height: '12px',
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							backgroundColor: '#5c5ce5',
							width: `${percent}%`,
							height: '100%',
							borderRadius: '9999px',
							transition: 'width 0.3s ease',
						}}
					></div>
				</div>
			</div>

			<span style={{ minWidth: '40px', fontSize: '0.9rem' }}>{percent}%</span>
		</div>
	);
};

export default SurveyHeader;
