import react from 'react';

// interface for the context's state
interface SettingsContextType {
    hours: number | string;
    minutes: number | string;
    seconds: number | string;
    setHours: React.Dispatch<React.SetStateAction<number>>;
    setMinutes: React.Dispatch<React.SetStateAction<number>>;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

// initial state object that matches the interface
const initialSettings: SettingsContextType = {
    hours: 0,
    minutes: 0,
    seconds: 0,
};

//I created the interface to resolve TS errors with my inital createContext declaration; however, unclear on how to initialze the setter functions in the initialSettings

export const SettingsContext = react.createContext<SettingsContextType>(initialSettings);
