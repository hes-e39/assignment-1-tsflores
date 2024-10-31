import { useState, useEffect } from 'react';
import { CalculateTimeRemaining } from '../../utils/helpers.ts';
import { RETIREMENT_DATE } from '../../utils/helpers.ts';
import { TimerDisplay } from '../generic/TimerDisplay.tsx';

const TimeLeft = ({ targetDate }) => {

    let retirementFlag = false;

    const formattedTargetDate = targetDate.toLocaleDateString();
    const formattedRetirementDate = RETIREMENT_DATE.toLocaleDateString();

    if(formattedTargetDate === formattedRetirementDate){
        retirementFlag = true;
    }

    const [timeLeft, setTimeLeft] = useState(() => CalculateTimeRemaining(targetDate));

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(CalculateTimeRemaining(targetDate));
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className="timer-container">
			<div className = "text-time-left">
            <h1>Time until {retirementFlag ? "Retirement Celebration!!!" : "Birthday Celebration!!!"}</h1>
			</div>
			<TimerDisplay time = { timeLeft } flag = { false } />
        </div>
	);

};

export default TimeLeft;

