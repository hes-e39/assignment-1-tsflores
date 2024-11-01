import { useState } from 'react';
import { SettingsButton } from '../generic/Buttons.tsx';
import Countdown from './Countdown.tsx';
import { Settings } from '../generic/Settings.tsx';
import { SettingsContext } from '../generic/SettingsContext.tsx';

const CountdownWrapper = () => {
    const [showSettings, setShowSettings] = useState(false);

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleSettings = () => {
        if (showSettings) {
            setShowSettings(false);
        } else {
            setShowSettings(true);
        }
    };

    return (
        <div className="timer-container">
            <h2>Use the settings button to set countdown timer.</h2>
            <SettingsButton showSettings={showSettings} handleSettings={handleSettings} />
            <SettingsContext.Provider value={{
                hours,
                minutes,
                seconds,
                setHours,
                setMinutes,
                setSeconds,
            }}>{showSettings ? <Settings /> : <Countdown />}</SettingsContext.Provider>
        </div>
    );
};

export default CountdownWrapper;
