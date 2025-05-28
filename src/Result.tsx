import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './index.css';

type ResultData = {
	image: string;
	product_name: string;
	product_link: string;
	playstyles: string[];
};

const Result = () => {
	const navigate = useNavigate();
	const [result, setResult] = useState<ResultData | null>(null);

	useEffect(() => {
		const resultStr = localStorage.getItem('surveyResult');
		if (resultStr) {
			setResult(JSON.parse(resultStr));
		}
	}, []);

	return (
		<div className="page-container">
			<button
				onClick={() => navigate('/')}
				style={{
					background: 'none',
					border: 'none',
					fontSize: '1.5rem',
					cursor: 'pointer',
					marginBottom: '1rem',
				}}
			>
				←
			</button>

			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<h2>Result</h2>
				{result ? (
					<>
						<img
							src={result.image}
							alt="recommended boots"
							style={{
								border: '3px solid #5c5ce5',
								borderRadius: 8,
								marginBottom: '1rem',
								maxWidth: 400,
							}}
						/>
						<div style={{ textAlign: 'left' }}>
							<h3>{result.product_name}</h3>
							<a href={result.product_link} target="_blank" rel="noreferrer">
								Go to Product Page
							</a>
							<h4 style={{ marginTop: '1rem' }}>Playstyles</h4>
							{result.playstyles.map((style, idx) => (
								<p key={idx}>• {style}</p>
							))}
						</div>
					</>
				) : (
					<p>Getting Results...</p>
				)}
			</div>
		</div>
	);
};

export default Result;
