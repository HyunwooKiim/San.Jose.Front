import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Home = () => {
	const navigate = useNavigate();
	const [isHover, setIsHover] = useState(false);

	return (
		<div
			className="page-container"
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center', // 버튼 포함 전체 수직 가운데 정렬
				justifyContent: 'center',
				minHeight: '100vh',
				textAlign: 'center',
			}}
		>
			<h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
				Find Your Perfect Soccer Boots.
			</h1>
			<p style={{ color: '#555', fontSize: '1rem', marginBottom: '2rem' }}>
				Based on how you play, not just where you play.
			</p>

			<button
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				style={{
					marginTop: '2rem',
					padding: '0.75rem 1.5rem',
					fontSize: '1rem',
					backgroundColor: isHover ? '#4b4bd4' : '#5c5ce5',
					color: '#fff',
					border: 'none',
					borderRadius: '6px',
					cursor: 'pointer',
					transition: 'background-color 0.3s ease',
					width: 'fit-content',
					display: 'inline-block',
				}}
				onClick={() => navigate('/survey')}
			>
				Get Started
			</button>
		</div>
	);
};

export default Home;
