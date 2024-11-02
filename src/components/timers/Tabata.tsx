import '../../styles/tabata.css';
import '../../styles/settings.css';
import { useState, useEffect, useRef } from 'react';
import { ButtonOptions } from '../generic/Buttons';
import { TabataStats } from '../generic/TabataStats';

const Tabata = () => {
    const [rounds, setRounds] = useState<number | string>(0);
    const [workTarget, setWorkTarget] = useState<number | string>(0);
    const [restTarget, setRestTarget] = useState<number | string>(0);
    const [phase, setPhase] = useState<string>('Work');
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);

    const nextSeconds: number | string = workTarget;

    const [secondsLeft, setSecondsLeft] = useState<number | string>(nextSeconds);
    const secondsLeftRef = useRef(secondsLeft);
    const phaseRef = useRef(phase);

    useEffect(() => {
        let intervalID: null | number | undefined = null;

        function switchMode() {
            const nextMode = phaseRef.current === 'work' ? 'rest' : 'work';
            const nextSeconds = nextMode === 'work' ? workTarget : restTarget;

            setPhase(nextMode);
            phaseRef.current = nextMode;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        if (isActive && isPaused === false) {
            intervalID = setInterval(() => {
                if (isPaused) {
                    return;
                }
                if (secondsLeftRef.current !== 0) {
                    secondsLeftRef.current = secondsLeftRef.current - 1;
                    setSecondsLeft(secondsLeftRef.current);
                } else {
                    switchMode();
                    // setIsActive(false);
                }
            }, 1000);
        } else {
            clearInterval(intervalID);
        }

        return () => {
            clearInterval(intervalID);
        };
    }, [isPaused, isActive]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
        secondsLeftRef.current = nextSeconds;
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setSecondsLeft(nextSeconds);
    };

    return (
        <div className="timer-container">
            <div className="tabata-container">
                <div className="tabata-display">
                    <div className="tabata-countdown">
                        <h3 id="tabata-title">{phase} Phase</h3>
                        <div className="tabata-content">
                            <div className="tabata-box">
                                <div className="tabata-value">
                                    <span>{secondsLeftRef.current}</span>
                                </div>
                                <span className="label">seconds</span>
                            </div>
                        </div>
                    </div>
                    <TabataStats />
                </div>
            </div>
            <div className="settings">
                <div className="content">
                    <div>
                        <input className="value" type="number" min={0} max={10} value={rounds} onChange={newValue => setRounds(newValue.target.value)} />
                        <span className="label">rounds</span>
                    </div>
                    <div>
                        <input className="value" type="number" min={0} max={180} value={workTarget} onChange={newValue => setWorkTarget(newValue.target.value)} />
                        <span className="label">work seconds</span>
                    </div>
                    <div>
                        <input className="value" type="number" min={0} max={180} value={restTarget} onChange={newValue => setRestTarget(newValue.target.value)} />
                        <span className="label">rest seconds</span>
                    </div>
                </div>
            </div>
            <ButtonOptions active={isActive} isPaused={isPaused} handleStart={handleStart} handlePauseResume={handlePauseResume} handleReset={handleReset} />
        </div>
    );
};

export default Tabata;
