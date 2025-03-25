import { useState, useEffect } from 'react';
import { CalculateTimeRemaining } from '../../utils/helpers.ts';
import { RETIREMENT_DATE, ACDC_CONCERT_DATE, GRADUATION_DATE, SHAKIRA_CONCERT_DATE, METALLICA_CONCERT_DATE, CAMINO_DATE } from '../../utils/helpers.ts';
import { TimerDisplay } from '../generic/TimerDisplay.tsx';
import EnjoyShow from '../../images/enjoytheshow_half.jpg';
import CaminoImage from '../../images/camino_img.jpg'

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

    // Mapping of dates to event names
    const eventTitles: Record<string, string> = {
        [RETIREMENT_DATE.toLocaleDateString()]: "Countdown to Retirement",
        [CAMINO_DATE.toLocaleDateString()]: "Countdown Clock to Camino de Santiago Pilgrimage",
        [ACDC_CONCERT_DATE.toLocaleDateString()]: "Countdown to AC/DC Concert",
        [METALLICA_CONCERT_DATE.toLocaleDateString()]: "Countdown to Metallica Concert",
        [SHAKIRA_CONCERT_DATE.toLocaleDateString()]: "Countdown to Shakira Concert",
        [GRADUATION_DATE.toLocaleDateString()]: "Countdown to Graduation",
    };

     const formattedTargetDate = props.targetDate.toLocaleDateString();
     const formattedRetirementDate = RETIREMENT_DATE.toLocaleDateString();

    const [imageFlag, setImageFlag] = useState(false);
    const [timeLeft, setTimeLeft] = useState(() => CalculateTimeRemaining(props.targetDate));
    const [hitTargetDate, setHitTargetDate] = useState(false);
    const [eventTitle, setEventTitle] = useState("Countdown Event");

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (formattedTargetDate === formattedRetirementDate) {
            setImageFlag(true);
        }

        if(eventTitles[formattedTargetDate]){
            setEventTitle(eventTitles[formattedTargetDate]);
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
    }, [timeLeft, imageFlag]);


    return (
        <div className="timer-container">
            <div className="text-time-left">
                {!hitTargetDate ? (<h1>{eventTitle}</h1>) : (<h1>Enjoy Your Event</h1>)}
            </div>
			{!hitTargetDate ? <TimerDisplay time={timeLeft} flag={false} hours={0} minutes={0} seconds={0} centiseconds={0} /> : <img src = {imageFlag ? CaminoImage : EnjoyShow} alt = 'Celelbration'/>}
        </div>
    );
};

export default TimeLeft;
