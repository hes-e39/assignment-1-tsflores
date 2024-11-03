import '../../styles/tabata.css';
import '../../styles/settings.css';
import { useState, useEffect, useRef } from 'react';
import { ButtonOptions } from '../generic/Buttons';
import { TabataStats } from '../generic/TabataStats';

/*
  component description
    - renders a Tabata timer that consists of a work period, a rest period, and set number of rounds
    - user inputs for the work, rest, and rounds are embedded in the component rather than wrapped - opportunity for enhancement in the future as time permits
    - several state variables to keep track of time elapsed, round, and shift in phase between work and rest
    - some sharing across other functions / components but not as much as I would have liked - also another opportunity as time permits
*/



const Tabata = () => {
    const [rounds, setRounds] = useState<number>(0);
    const [workTarget, setWorkTarget] = useState<number>(0);
    const [restTarget, setRestTarget] = useState<number>(0);
    const [phase, setPhase] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [roundsLeft, setRoundsLeft] = useState<number>(0);
    const [secondsLeft, setSecondsLeft] = useState<number>(0);
    const [cumulativeTime, setCumulativeTime] = useState<number>(0);

    const secondsLeftRef = useRef(secondsLeft);
    const phaseRef = useRef(phase);
    const roundsLeftRef = useRef(roundsLeft);

    useEffect(() => {
        setRoundsLeft(rounds);
        roundsLeftRef.current = rounds;
    }, [rounds]);

    useEffect(() => {
        let intervalID = 0;

        function switchMode() {
            const nextMode = phaseRef.current === 'Work' ? 'Rest' : 'Work';
            const nextSeconds = nextMode === 'Work' ? workTarget : restTarget;

            if (nextMode === 'Rest') {
                roundsLeftRef.current -= 1;
                setRoundsLeft(roundsLeftRef.current);
                const roundTime = workTarget;
                setCumulativeTime(prev => prev + roundTime);
            }else if (roundsLeftRef.current !== rounds){
              const roundTime = restTarget;
              setCumulativeTime(prev => prev + roundTime);
            }

            setPhase(nextMode);
            phaseRef.current = nextMode;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        if (isActive && !isPaused && roundsLeftRef.current !== 0) {
            intervalID = window.setInterval(() => {
                if (isPaused) return;
                if (secondsLeftRef.current > 0) {
                    secondsLeftRef.current -= 1;
                    setSecondsLeft(secondsLeftRef.current);
                } else {
                    switchMode();
                }
                if (roundsLeftRef.current <= 0 && phaseRef.current === 'Work') {
                    clearInterval(intervalID);
                    setIsActive(false);
                    setRounds(0);
                    setWorkTarget(0);
                    setRestTarget(0);
                }
            }, 1000);
        } else {
            clearInterval(intervalID);
        }

        return () => clearInterval(intervalID);
    }, [isPaused, isActive, workTarget, restTarget, rounds]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setRoundsLeft(rounds);
        roundsLeftRef.current = rounds;
        setSecondsLeft(0);
        secondsLeftRef.current = 0;
        setPhase('');
        phaseRef.current = '';
        setWorkTarget(0);
        setRestTarget(0);
        setRounds(0);
        setCumulativeTime(0);
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
                                    <span>{secondsLeft}</span>
                                </div>
                                <span className="label">seconds</span>
                            </div>
                        </div>
                    </div>
                    <TabataStats roundsCompleted={rounds - roundsLeft} timeElapsed={cumulativeTime} />
                </div>
            </div>
            <div className="settings">
                <div className="content">
                    <div>
                        <input className="value" type="number" min={0} max={10} value={rounds} onChange={newValue => setRounds(Number.parseInt(newValue.target.value))} />
                        <span className="label">circuits</span>
                    </div>
                    <div>
                        <input className="value" type="number" min={0} max={180} value={workTarget} onChange={newValue => setWorkTarget(Number.parseInt(newValue.target.value))} />
                        <span className="label">work seconds</span>
                    </div>
                    <div>
                        <input className="value" type="number" min={0} max={180} value={restTarget} onChange={newValue => setRestTarget(Number.parseInt(newValue.target.value))} />
                        <span className="label">rest seconds</span>
                    </div>
                </div>
            </div>
            {rounds === 0 ? <div>Enter number of circuits to get started. </div> :<ButtonOptions active={isActive} isPaused={isPaused} handleStart={handleStart} handlePauseResume={handlePauseResume} handleReset={handleReset} />}
        </div>
    );
};

export default Tabata;
