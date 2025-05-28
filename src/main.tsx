import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './Result';
import Home from './Home';
import Loading from './Loading';
import Survey from './Survey'; // 기존 main.tsx → Survey로 이름 변경했다고 가정
import './index.css';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/survey" element={<Survey />} />
				<Route path="/result" element={<Result />} />
				<Route path="*" element={<div>Page Not Found</div>} />
				<Route path="/loading" element={<Loading />} />
			</Routes>
		</BrowserRouter>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
