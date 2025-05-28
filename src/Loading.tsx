import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Loading: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResult = async () => {
            const reqStr = localStorage.getItem('surveyRequest');
            if (!reqStr) {
                alert('No survey information found.');
                navigate('/');
                return;
            }
            const reqBody = JSON.parse(reqStr);

            // Check for any null, undefined, or empty string values
            const requiredKeys = [
                'age', 'height', 'position', 'ps_rating', 'game_rating',
                'intercepts', 'dribble_attempts', 'shot_pass_blocked', 'clearing',
                'ball_lost_time', 'incomplete_touches', 'average_passes',
                'cross_attempts', 'through_pass_attempts', 'long_pass_attempts', 'additional_requirements'
            ];
            const hasEmpty = requiredKeys.some(
                key => reqBody[key] === null || reqBody[key] === undefined || reqBody[key] === ''
            );
            if (hasEmpty) {
                alert('No survey information found.');
                navigate('/');
                return;
            }

            try {
                const resPromise = axios.post('http://localhost:8080/survey', reqBody, {
                    headers: { 'Content-Type': 'application/json' }
                });

                // Wait at least 10 seconds
                const delay = new Promise(resolve => setTimeout(resolve, 10000));
                const [res] = await Promise.all([resPromise, delay]);

                localStorage.setItem('surveyResult', JSON.stringify(res.data));
                navigate('/result');
            } catch (e) {
                // Print the request body to the console if the request fails
                console.log('Failed request body:', reqBody);
                setTimeout(() => {
                    alert('Failed to request result.');
                    navigate('/');
                }, 10000);
            }
        };
        fetchResult();
    }, [navigate]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontSize: '1.5rem',
            color: '#555'
        }}>
            <span style={{
                fontWeight: 'bold',
                color: '#5c5ce5',
                fontSize: '2rem',
            }}>Loading Responses...</span>
        </div>
    );
};

export default Loading;