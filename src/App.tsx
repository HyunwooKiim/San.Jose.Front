import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Survey from './Survey'; // 기존 main.tsx → Survey로 이름 변경했다고 가정
import './index.css';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/survey" element={<Survey />} />
			</Routes>
		</BrowserRouter>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
