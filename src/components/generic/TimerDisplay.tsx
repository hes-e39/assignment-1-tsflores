import { CalculateTime } from '../../utils/helpers';
import type { timeProps } from '../../utils/helpers';

/* component details 
    - reusable component that displays the the appropriate time elements for the stopwatch or countdown timers
    - takes an object entries and together with map creates the elements and renders the appropriate time
    - CalculateTime is a function that takes the milliseconds and converts
*/

interface TimerDisplayProps extends timeProps{
    flag: boolean;
    time: object;
}

export const TimerDisplay = (props: TimerDisplayProps ) => {
    let objTime: number | string | object = 0;

    if (props.flag) {
        objTime = CalculateTime(props);
    } else {
        objTime = props.time;
    }

    return (
        <div className="countdown">
            <div className="content">
                {Object.entries(objTime).map(el => {
                    const label = el[0];
                    const value = el[1];
                    return (
                        <div className="box" key={label}>
                            <div className="value">
                                <span>{value}</span>
                            </div>
                            <span className="label"> {label} </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
