import '../../styles/settings.css';

export const TabataStats = (props) => {

    return (
    <div className="stats">
        <h3 id="tabata-title">Stats</h3>
        <div className="tabata-countdown">
            <div className="stats-content">
                <div className="stats-box">
                    <div className="stats-value">
                        <span>0</span>
                    </div>
                    <span className="tabata-text">rounds completed</span>
                </div>
            </div>
        </div>
        <div className="tabata-countdown">
            <div className="stats-content">
                <div className="stats-box">
                    <div className="stats-value">
                        <span>0</span>
                    </div>
                    <span className="tabata-text">total time</span>
                </div>
            </div>
        </div>
    </div>
    );
};
