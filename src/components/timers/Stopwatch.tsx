import { useState, useEffect } from 'react';
import { CalculateTime } from '../../utils/helpers.ts';
import { ButtonOptions } from '../generic/Buttons.tsx';

const Stopwatch = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);
   
    useEffect(() => {
        
        let intervalID: null | number | undefined = null;

        if (isActive && isPaused === false) {
            intervalID = setInterval(() => {
                setTime(time => time + 10);
            }, 10);
        } else {
            clearInterval(intervalID);
        }
        return () => {
            clearInterval(intervalID);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };
 
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };
 
    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    return (
        <div className="timer-container">
            <TimerDisplay time = {time} />
            <ButtonOptions 
            active={isActive}
            isPaused={isPaused}
            handleStart={handleStart}
            handlePauseResume={handlePauseResume}
            handleReset={handleReset}
            />

        </div>
    );
};

export const TimerDisplay = (props: number) => {
    
    // const timeArray: Array<number | string> = CalculateTime( props );
    const objTime = CalculateTime ( props );

//     return (
//         <div className="timer-display">
//             <p className="timer-text">{timeArray[0]}</p>
//             <span>:</span>
//             <p className="timer-text">{timeArray[1]}</p>
//             <span>:</span>
//             <p className="timer-text">{timeArray[2]}</p>
//             <span>.</span>
//             <p className="timer-text">{timeArray[3]}</p>
//         </div>
//     );
// };

return (
    <div className='countdown'>
        <h1>Click Start button to engage stopwatch</h1>
        <div className='content'>
            {Object.entries(objTime).map((el) => {
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
);}

export default Stopwatch;
