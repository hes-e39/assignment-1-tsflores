import '../../styles/settings.css';
import { useContext } from 'react';
import { SettingsContext } from '../generic/SettingsContext';

export const Settings = () => {

    const setInfo = useContext(SettingsContext);

    return (
        <div className="settings">
            <div className = "content">
                <div>
                    <input className="value" type="number" min={0} max={23} value={setInfo.hours} onChange={e => setInfo.setHours(Number.parseInt(e.target.value))} />
                    <span className = "label">hours</span>
                </div>
                <div>
                    <input className="value" type="number" min={0} max={59} value={setInfo.minutes} onChange={e => setInfo.setMinutes(Number.parseInt(e.target.value))} />
                    <span className = "label">minutes</span>
                </div>
                <div>
                    <input className="value" type="number" min={0} max={59} value={setInfo.seconds} onChange={e => setInfo.setSeconds(Number.parseInt(e.target.value))} />
                    <span className = "label">seconds</span>
                </div>
            </div>
        </div>
    );
};

