import '../../styles/settings.css';

interface TabataStateProps {
    roundsCompleted: number;
    timeElapsed: number;
}

export const TabataStats = (props: TabataStateProps) => {

    return (
    <div className="stats">
        <h3 id="tabata-title">Stats</h3>
        <div className="tabata-countdown">
            <div className="stats-content">
                <div className="stats-box">
                    <div className="stats-value">
                        <span>{props.roundsCompleted}</span>
                    </div>
                    <span className="tabata-text">circuits completed</span>
                </div>
            </div>
        </div>
        <div className="tabata-countdown">
            <div className="stats-content">
                <div className="stats-box">
                    <div className="stats-value">
                        <span>{props.timeElapsed}</span>
                    </div>
                    <span className="tabata-text">total time</span>
                </div>
            </div>
        </div>
    </div>
    );
};
