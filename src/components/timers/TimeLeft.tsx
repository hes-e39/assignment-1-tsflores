import { useState, useEffect } from 'react';
import { CalculateTimeRemaining } from '../../utils/helpers.ts';
import { RETIREMENT_DATE } from '../../utils/helpers.ts';

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
		<div className='countdown'>
			<h1>Days until {retirementFlag ? "Retirement Celebration!!!" : "Birthday Celebration!!!"}</h1>
			<div className='content'>
				{Object.entries(timeLeft).map((el) => {
					const label = el[0];
					const value = el[1];
					return (
						<div className='box' key={label}>
							<div className='value'>
								<span>{value}</span>
							</div>
							<span className='label'> {label} </span>
						</div>
					);
				})}
			</div>
		</div>
	);

};

export default TimeLeft;

