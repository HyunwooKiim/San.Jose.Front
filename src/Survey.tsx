import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextInput } from './TextInput';
import { ChoiceGroup } from './ChoiceGroup';
import { ScaleSelector } from './ScaleSelector';
import './index.css';

const playerStyleOptions = [
    'Likes to cut inside',
    'Plays the ball off the ground often',
    'Does not dive into tackles',
    'Prefers short passes',
    'Runs with ball often',
];

const strengthOptions = [
    'Key passes',
    'Finishing',
    'Through balls',
    'Dribbling',
    'Long shots',
];

const weaknessOptions = [
    'Holding on to the ball',
    'Defensive contribution',
    'Crossing',
    'Positioning',
    'Discipline',
];

const defaultAnswers = {
    age: '',
    q1: '',
    q3: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    player_style: [],
    player_style_etc: '',
    strength: [],
    strength_etc: '',
    weaknesses: [],
    weaknesses_etc: '',
};

const Survey = () => {
    const [position, setPosition] = React.useState('');
    const [gameRating, setGameRating] = React.useState<number | null>(null);
    const [answers, setAnswers] = React.useState({ ...defaultAnswers });
    const [showPlayerStyleEtc, setShowPlayerStyleEtc] = React.useState(false);
    const [showStrengthEtc, setShowStrengthEtc] = React.useState(false);
    const [showWeaknessEtc, setShowWeaknessEtc] = React.useState(false);
    const navigate = useNavigate();
    const [isBackHover, setBackHover] = React.useState(false);

    // 페이지 진입 시 로컬스토리지 값 반영
    useEffect(() => {
        const saved = localStorage.getItem('surveyRequest');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setAnswers({
                    age: parsed.age?.toString() ?? '',
                    q1: parsed.height?.toString() ?? '',
                    q3: parsed.ps_rating?.toString() ?? '',
                    q5: parsed.intercepts?.toString() ?? '',
                    q6: parsed.dribble_attempts?.toString() ?? '',
                    q7: parsed.shot_pass_blocked?.toString() ?? '',
                    q8: parsed.clearing?.toString() ?? '',
                    q9: parsed.ball_lost_time?.toString() ?? '',
                    q10: parsed.incomplete_touches?.toString() ?? '',
                    q11: parsed.average_passes?.toString() ?? '',
                    q12: parsed.cross_attempts?.toString() ?? '',
                    q13: parsed.through_pass_attempts?.toString() ?? '',
                    q14: parsed.long_pass_attempts?.toString() ?? '',
                    q15: parsed.additional_requirements ?? '',
                    player_style: parsed.player_style ?? [],
                    player_style_etc: parsed.player_style_etc ?? '',
                    strength: parsed.strength ?? [],
                    strength_etc: parsed.strength_etc ?? '',
                    weaknesses: parsed.weaknesses ?? [],
                    weaknesses_etc: parsed.weaknesses_etc ?? '',
                });
                setPosition(parsed.position ?? '');
                setGameRating(
                    typeof parsed.game_rating === 'number'
                        ? parsed.game_rating
                        : parsed.game_rating
                            ? Number(parsed.game_rating)
                            : null
                );
            } catch (e) {
                // 파싱 실패 시 무시
            }
        }
    }, []);

    // 값이 바뀔 때마다 로컬스토리지에 저장
    useEffect(() => {
        if (
            Object.values(answers).every(v => (Array.isArray(v) ? v.length === 0 : v === '')) &&
            !position &&
            (gameRating === null || gameRating === undefined)
        ) {
            localStorage.removeItem('surveyRequest'); // 모두 비었으면 로컬스토리지도 비움
            return;
        }

        const body = {
            age: answers.age !== '' ? Number(answers.age) : null,
            height: answers.q1 !== '' ? Number(answers.q1) : null,
            position: position || null,
            ps_rating: answers.q3 !== '' ? Number(answers.q3) : null,
            game_rating: gameRating !== null ? gameRating : null,
            intercepts: answers.q5 !== '' ? Number(answers.q5) : null,
            dribble_attempts: answers.q6 !== '' ? Number(answers.q6) : null,
            shot_pass_blocked: answers.q7 !== '' ? Number(answers.q7) : null,
            clearing: answers.q8 !== '' ? Number(answers.q8) : null,
            ball_lost_time: answers.q9 !== '' ? Number(answers.q9) : null,
            incomplete_touches: answers.q10 !== '' ? Number(answers.q10) : null,
            average_passes: answers.q11 !== '' ? Number(answers.q11) : null,
            cross_attempts: answers.q12 !== '' ? Number(answers.q12) : null,
            through_pass_attempts: answers.q13 !== '' ? Number(answers.q13) : null,
            long_pass_attempts: answers.q14 !== '' ? Number(answers.q14) : null,
            player_style: [
                ...(answers.player_style || []),
                ...(answers.player_style_etc ? [answers.player_style_etc] : []),
            ],
            strength: [
                ...(answers.strength || []),
                ...(answers.strength_etc ? [answers.strength_etc] : []),
            ],
            weaknesses: [
                ...(answers.weaknesses || []),
                ...(answers.weaknesses_etc ? [answers.weaknesses_etc] : []),
            ],
            additional_requirements: answers.q15 !== '' ? answers.q15 : null,
        };
        localStorage.setItem('surveyRequest', JSON.stringify(body));
    }, [answers, position, gameRating]);

    const positionOptions = [
        { label: 'Forward (ST, CF, LW, RW)', value: 'attacker' },
        { label: 'Midfielder (CM, CAM, CDM, LM, RM)', value: 'midfielder' },
        { label: 'Defender (CB, LB, RB)', value: 'defender' },
        { label: 'Goalkeeper (GK)', value: 'goalkeeper' },
    ];

    // 진행률 계산 (age 포함)
    const totalQuestions = 19;
    const answeredCount =
        (answers.age ? 1 : 0) +
        (answers.q1 ? 1 : 0) +
        (position ? 1 : 0) +
        (answers.q3 ? 1 : 0) +
        (gameRating !== null ? 1 : 0) +
        (answers.q5 ? 1 : 0) +
        (answers.q6 ? 1 : 0) +
        (answers.q7 ? 1 : 0) +
        (answers.q8 ? 1 : 0) +
        (answers.q9 ? 1 : 0) +
        (answers.q10 ? 1 : 0) +
        (answers.q11 ? 1 : 0) +
        (answers.q12 ? 1 : 0) +
        (answers.q13 ? 1 : 0) +
        (answers.q14 ? 1 : 0) +
        (answers.q15 ? 1 : 0) +
        (Array.isArray(answers.player_style) && answers.player_style.length > 0 ? 1 : 0) +
        (answers.player_style_etc ? 1 : 0) +
        (Array.isArray(answers.strength) && answers.strength.length > 0 ? 1 : 0) +
        (answers.strength_etc ? 1 : 0) +
        (Array.isArray(answers.weaknesses) && answers.weaknesses.length > 0 ? 1 : 0) +
        (answers.weaknesses_etc ? 1 : 0);

    const progress = Math.round((answeredCount / totalQuestions) * 100);

    const handleMultiSelect = (key: 'player_style' | 'strength' | 'weaknesses', value: string) => {
        setAnswers(prev => {
            const arr = Array.isArray(prev[key]) ? prev[key] : [];
            if (arr.includes(value)) {
                return { ...prev, [key]: arr.filter((v: string) => v !== value) };
            } else {
                return { ...prev, [key]: [...arr, value] };
            }
        });
    };

    const handleSubmit = () => {
        const body = {
            age: answers.age !== '' ? Number(answers.age) : null,
            height: answers.q1 !== '' ? Number(answers.q1) : null,
            position: position || null,
            ps_rating: answers.q3 !== '' ? Number(answers.q3) : null,
            game_rating: gameRating !== null ? gameRating : null,
            intercepts: answers.q5 !== '' ? Number(answers.q5) : null,
            dribble_attempts: answers.q6 !== '' ? Number(answers.q6) : null,
            shot_pass_blocked: answers.q7 !== '' ? Number(answers.q7) : null,
            clearing: answers.q8 !== '' ? Number(answers.q8) : null,
            ball_lost_time: answers.q9 !== '' ? Number(answers.q9) : null,
            incomplete_touches: answers.q10 !== '' ? Number(answers.q10) : null,
            average_passes: answers.q11 !== '' ? Number(answers.q11) : null,
            cross_attempts: answers.q12 !== '' ? Number(answers.q12) : null,
            through_pass_attempts: answers.q13 !== '' ? Number(answers.q13) : null,
            long_pass_attempts: answers.q14 !== '' ? Number(answers.q14) : null,
            player_style: [
                ...(answers.player_style || []),
                ...(answers.player_style_etc ? [answers.player_style_etc] : []),
            ],
            strength: [
                ...(answers.strength || []),
                ...(answers.strength_etc ? [answers.strength_etc] : []),
            ],
            weaknesses: [
                ...(answers.weaknesses || []),
                ...(answers.weaknesses_etc ? [answers.weaknesses_etc] : []),
            ],
            additional_requirements: answers.q15 !== '' ? answers.q15 : null,
        };
        localStorage.setItem('surveyRequest', JSON.stringify(body));
        navigate('/loading');
    };

    const handleReset = () => {
        setAnswers({ ...defaultAnswers });
        setPosition('');
        setGameRating(null);
        localStorage.removeItem('surveyRequest');
    };

    return (
        <div className="page-container">
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    background: '#fff',
                    zIndex: 10,
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    marginBottom: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
            >
                <button
                    onClick={() => navigate('/')}
                    onMouseEnter={() => setBackHover(true)}
                    onMouseLeave={() => setBackHover(false)}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: isBackHover ? '#5c5ce5' : '#000',
                        transition: 'color 0.2s ease',
                        marginBottom: '0.5rem',
                    }}
                >
                    ←
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        marginLeft: 8,
                        background: '#eee',
                        border: 'none',
                        borderRadius: 4,
                        padding: '0.3rem 0.8rem',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        color: '#333',
                    }}
                >
                    Reset
                </button>
                <div 
                    style={{ 
                        fontWeight: 600, 
                        marginBottom: 4, 
                        marginTop: 8 
                    }}
                >
                    {progress}%
                </div>
                <div
                    style={{
                        width: '100%',
                        height: 10,
                        background: '#eee',
                        borderRadius: 5,
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: '#5c5ce5',
                            transition: 'width 0.3s',
                        }}
                    />
                </div>
            </div>

            <h2>0. Basic Information</h2>
            <p>Q0. What is your age?</p>
            <TextInput
                size="small"
                value={answers.age}
                onChange={e => setAnswers(a => ({ ...a, age: e.target.value }))}
            />

            <h2>1. Physical Information</h2>
            <p>Q1. What is your height? (cm)</p>
            <TextInput
                size="small"
                value={answers.q1}
                onChange={e => setAnswers(a => ({ ...a, q1: e.target.value }))}
            />

            <h2>2. Position</h2>
            <p>Q2. What is your primary playing position?</p>
            <ChoiceGroup
                name="position"
                selectedValue={position}
                onChange={setPosition}
                options={positionOptions}
            />

            <h2>3. Skill Assessment</h2>
            <p>Q3. What is your average pass success rate? (%)</p>
            <TextInput
                size="small"
                value={answers.q3}
                onChange={e => setAnswers(a => ({ ...a, q3: e.target.value }))}
            />
            <p>Q4. What is your average match rating? (1.0–10.0)</p>
            <ScaleSelector
                name="gameRating"
                min={1}
                max={10}
                selectedValue={gameRating}
                onChange={setGameRating}
            />

            <h2>4. Defensive/Offensive Actions</h2>
            <p>Q5. How many interceptions do you make per game?</p>
            <TextInput
                size="small"
                value={answers.q5}
                onChange={e => setAnswers(a => ({ ...a, q5: e.target.value }))}
            />
            <p>Q6. How many dribble attempts do you make per game?</p>
            <TextInput
                size="small"
                value={answers.q6}
                onChange={e => setAnswers(a => ({ ...a, q6: e.target.value }))}
            />
            <p>Q7. How often do you block shots or passes?</p>
            <TextInput
                size="small"
                value={answers.q7}
                onChange={e => setAnswers(a => ({ ...a, q7: e.target.value }))}
            />
            <p>Q8. How many times do you clear the ball per game?</p>
            <TextInput
                size="small"
                value={answers.q8}
                onChange={e => setAnswers(a => ({ ...a, q8: e.target.value }))}
            />

            <h2>5. Ball Loss & Control</h2>
            <p>Q9. How often do you lose possession during a match?</p>
            <TextInput
                size="small"
                value={answers.q9}
                onChange={e => setAnswers(a => ({ ...a, q9: e.target.value }))}
            />
            <p>Q10. How many incomplete or inaccurate touches do you make?</p>
            <TextInput
                size="small"
                value={answers.q10}
                onChange={e => setAnswers(a => ({ ...a, q10: e.target.value }))}
            />

            <h2>6. Passing Style</h2>
            <p>Q11. What is your average number of passes per game?</p>
            <TextInput
                size="small"
                value={answers.q11}
                onChange={e => setAnswers(a => ({ ...a, q11: e.target.value }))}
            />
            <p>Q12. How many crosses do you attempt per game?</p>
            <TextInput
                size="small"
                value={answers.q12}
                onChange={e => setAnswers(a => ({ ...a, q12: e.target.value }))}
            />
            <p>Q13. How often do you attempt through passes per game?</p>
            <TextInput
                size="small"
                value={answers.q13}
                onChange={e => setAnswers(a => ({ ...a, q13: e.target.value }))}
            />
            <p>Q14. How often do you attempt long passes per game?</p>
            <TextInput
                size="small"
                value={answers.q14}
                onChange={e => setAnswers(a => ({ ...a, q14: e.target.value }))}
            />

            <h2>7. Player Style (multiple selection)</h2>
            {playerStyleOptions.map(option => (
                <label key={option} style={{ display: 'block', marginBottom: 4 }}>
                    <input
                        type="checkbox"
                        checked={answers.player_style.includes(option)}
                        onChange={() => handleMultiSelect('player_style', option)}
                    />
                    {option}
                </label>
            ))}
            <label style={{ display: 'block', marginBottom: 4 }}>
                <input
                    type="checkbox"
                    checked={showPlayerStyleEtc}
                    onChange={() => setShowPlayerStyleEtc(v => !v)}
                />
                Other
                {showPlayerStyleEtc && (
                    <TextInput
                        size="small"
                        placeholder="Type your own"
                        value={answers.player_style_etc}
                        onChange={e => setAnswers(a => ({ ...a, player_style_etc: e.target.value }))}
                        style={{ marginLeft: 8, width: 200 }}
                    />
                )}
            </label>

            <h2>8. Strength (multiple selection)</h2>
            {strengthOptions.map(option => (
                <label key={option} style={{ display: 'block', marginBottom: 4 }}>
                    <input
                        type="checkbox"
                        checked={answers.strength.includes(option)}
                        onChange={() => handleMultiSelect('strength', option)}
                    />
                    {option}
                </label>
            ))}
            <label style={{ display: 'block', marginBottom: 4 }}>
                <input
                    type="checkbox"
                    checked={showStrengthEtc}
                    onChange={() => setShowStrengthEtc(v => !v)}
                />
                Other
                {showStrengthEtc && (
                    <TextInput
                        size="small"
                        placeholder="Type your own"
                        value={answers.strength_etc}
                        onChange={e => setAnswers(a => ({ ...a, strength_etc: e.target.value }))}
                        style={{ marginLeft: 8, width: 200 }}
                    />
                )}
            </label>

            <h2>9. Weaknesses (multiple selection)</h2>
            {weaknessOptions.map(option => (
                <label key={option} style={{ display: 'block', marginBottom: 4 }}>
                    <input
                        type="checkbox"
                        checked={answers.weaknesses.includes(option)}
                        onChange={() => handleMultiSelect('weaknesses', option)}
                    />
                    {option}
                </label>
            ))}
            <label style={{ display: 'block', marginBottom: 4 }}>
                <input
                    type="checkbox"
                    checked={showWeaknessEtc}
                    onChange={() => setShowWeaknessEtc(v => !v)}
                />
                Other
                {showWeaknessEtc && (
                    <TextInput
                        size="small"
                        placeholder="Type your own"
                        value={answers.weaknesses_etc}
                        onChange={e => setAnswers(a => ({ ...a, weaknesses_etc: e.target.value }))}
                        style={{ marginLeft: 8, width: 200 }}
                    />
                )}
            </label>

            <h2>10. Additional Preferences</h2>
            <p>Q15. Do you have any additional requirements for your football boots?</p>
            <TextInput
                size="large"
                value={answers.q15}
                onChange={e => setAnswers(a => ({ ...a, q15: e.target.value }))}
            />

            <button
                onClick={handleSubmit}
                disabled={progress < 100}
                style={{
                    marginTop: '2rem',
                    padding: '0.6rem 1.2rem',
                    fontSize: '1rem',
                    backgroundColor: progress === 100 ? '#5c5ce5' : '#ccc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: progress === 100 ? 'pointer' : 'not-allowed',
                    width: 'fit-content',
                    display: 'inline-block',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={e => {
                    if (progress === 100) e.currentTarget.style.backgroundColor = '#4b4bd4';
                }}
                onMouseLeave={e => {
                    if (progress === 100) e.currentTarget.style.backgroundColor = '#5c5ce5';
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default Survey;