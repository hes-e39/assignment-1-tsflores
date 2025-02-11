import { useState, useEffect } from 'react';
import { CalculateTimeRemaining } from '../../utils/helpers.ts';
import { RETIREMENT_DATE } from '../../utils/helpers.ts';
import { TimerDisplay } from '../generic/TimerDisplay.tsx';
import GoneFishin from '../../images/gonefishing_half.jpg';
import EnjoyShow from '../../images/enjoytheshow_half.jpg';

/* compoenent description
    - The purpose of this component is to compare the current date/time to the target date/time and calculate number of days, minutes, and seconds remaining
    - The components renders TimerDisplay component to show the time remaining
    - Once the target date is hit, the component replaces the TimerDisplay with the appropriate images
    - Three state varianbles to track the time remaining, to track whether the target date was hit, and to track which target date is used
    - useEffect will make a call to CalculateTimeRemaining function to get the difference between current date and target date
    - If time remains, decrement time by 1000 milliseconds and display the countdown clock
*/

interface TimeLeftProps {
    targetDate: Date
}

const TimeLeft = (props: TimeLeftProps) => {

    const formattedTargetDate = props.targetDate.toLocaleDateString();
    const formattedRetirementDate = RETIREMENT_DATE.toLocaleDateString();

    const [retirementFlag, setRetirementFlag] = useState(false);
    const [timeLeft, setTimeLeft] = useState(() => CalculateTimeRemaining(props.targetDate));
    const [hitTargetDate, setHitTargetDate] = useState(false);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (formattedTargetDate === formattedRetirementDate) {
            setRetirementFlag(true);
        }

        const timer = setInterval(() => {
            if (timeLeft.seconds >= 0) {
                setTimeLeft(CalculateTimeRemaining(props.targetDate));
            }else{
				setHitTargetDate(true);
                clearInterval(timer);
			}
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft, retirementFlag]);


    return (
        <div className="timer-container">
            <div className="text-time-left">
                {!hitTargetDate ? (<h1>Countdown Clock</h1>) : (<h1>{retirementFlag ? 'Congratulations!!!' : 'Enjoy the Show!!!   '}</h1>)}
            </div>
			{!hitTargetDate ? <TimerDisplay time={timeLeft} flag={false} hours={0} minutes={0} seconds={0} centiseconds={0} /> : <img src = {retirementFlag ? GoneFishin : EnjoyShow} alt = 'Celelbration'/>}
        </div>
    );
};

export default TimeLeft;
