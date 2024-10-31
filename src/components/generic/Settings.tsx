import '../../styles/settings.css';
import { useState } from 'react';

export const Settings = () => {

    let timeInMilliseconds = 0;

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const hoursInMilli = hours * 3600 * 1000;
    const minInMilli = minutes * 60 * 1000;
    const secInMilli = seconds * 1000;

    timeInMilliseconds = secInMilli + minInMilli + hoursInMilli;

    return (
        <div className="settings">
            <div className = "content">
                <div>
                    <input className="value" type="number" min={0} max={23} value={hours} onChange={e => setHours(e.target.value)} />
                    <span className = "label">hours</span>
                </div>
                <div>
                    <input className="value" type="number" min={0} max={59} value={minutes} onChange={e => setMinutes(e.target.value)} />
                    <span className = "label">minutes</span>
                </div>
                <div>
                    <input className="value" type="number" min={0} max={59} value={seconds} onChange={e => setSeconds(e.target.value)} />
                    <span className = "label">seconds</span>
                </div>
            </div>
        </div>
    );
};

