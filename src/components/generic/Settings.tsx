import '../../styles/settings.css';
import { useState } from 'react';




export const Settings = () => {
    
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    return (
        <div className="settingsContainer">
            <label>Hours</label>
            <input type = "number" min = {0} max = {23} value = {hours} onChange={(e) => setHours(e.target.value)} />
            <label>Minutes</label>
            <input type = "number" min = {0} max = {59} value = {minutes} onChange={(e) => setMinutes(e.target.value)} />
            <label>Seconds</label>
            <input type = "number" min = {0} max = {59} value = {seconds} onChange={(e) => setSeconds(e.target.value)} />


        </div>
    )
};