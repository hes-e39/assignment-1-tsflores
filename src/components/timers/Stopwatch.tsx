import { useState, useEffect } from 'react';
import { CalculateTime } from '../../utils/helpers.ts';

const Stopwatch = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);
   
    useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime(time => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    return (
        <div className="timer-container">
            <TimerDisplay time = {time} />
        </div>
    );
};

const TimerDisplay = (props: number) => {
    
    const timeArray: Array<number | string> = CalculateTime( props );

    return (
        <div className="timer-display">
            <p className="timer-text">{timeArray[0]}</p>
            <span>:</span>
            <p className="timer-text">{timeArray[1]}</p>
            <span>:</span>
            <p className="timer-text">{timeArray[2]}</p>
            <span>:</span>
            <p className="timer-text">{timeArray[3]}</p>
        </div>
    );
};

export default Stopwatch;
